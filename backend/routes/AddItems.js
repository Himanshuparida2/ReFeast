const dynamodb = require("../AWS/DynamoDB");
const express = require("express");
const route = express.Router();
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const upload = require("../AWS/UploadImageToS3");
const multer = require("multer");

// Store files in memory so we can stream them directly to S3
const storage = multer.memoryStorage();
const multerUpload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

const AddItem = async (req, res) => {
  console.log("req.body:", req.body);
  console.log("req.files:", req.files);
  const { username, ItemName, ItemDescription, ItemStatus } = req.body;
  const files = req.files; // multer puts files here

  // Validation
  if (!username || !ItemName || !ItemDescription || !ItemStatus) {
    return res.status(400).json({ message: "Missing required text fields." });
  }

  if (!files || files.length === 0) {
    return res.status(400).json({ message: "At least one image is required." });
  }

  const ItemID = uuidv4();

  try {
    const userParam = {
      TableName: "ReFeast_User",
      Key: {
        username: username,
      },
    };

    const userData = await dynamodb.get(userParam).promise();

    if (!userData.Item) {
      return res.status(404).json({ message: "User Not Found!!" });
    }

    const uploadedImages = await Promise.all(
      files.map((file) => {
        const folder = "Items_pictures/";
        return upload(ItemID, file.buffer, folder, file.mimetype, file.originalname);
      })
    );

    const itemParam = {
      TableName: "ReFeast_Items",
      Item: {
        ItemID: ItemID,
        username: username,
        ItemName: ItemName,
        ItemDescription: ItemDescription,
        ItemStatus: ItemStatus,
        ItemImages: uploadedImages,
      },
    };

    await dynamodb.put(itemParam).promise();

    const updateParam = {
      TableName: "ReFeast_User",
      Key: {
        username: username,
      },
      UpdateExpression:
        "SET Items_List = list_append(if_not_exists(Items_List, :newlist), :items)",
      ExpressionAttributeValues: {
        ":items": [ItemID],
        ":newlist": [],
      },
      ReturnValues: "UPDATED_NEW",
    };

    await dynamodb.update(updateParam).promise();

    return res.status(201).json({
      message: "Item added Successfully!!",
      ItemID: ItemID,
      ItemImages: uploadedImages,
    });

  } catch (err) {
    console.error("AddItem Error:", err);
    return res.status(500).json({
      message: "Some Error Occurred",
      errorCode: err.code,
      errorMessage: err.message,
    });
  }
};

route.post("/", multerUpload.array("ItemImages", 10), AddItem);
module.exports = route;