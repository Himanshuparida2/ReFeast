const dynamodb = require("../AWS/DynamoDB");
const express = require("express");
const route = express.Router();
const upload = require("../AWS/UploadImageToS3");
const multer = require("multer");

const storage = multer.memoryStorage();
const multerUpload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

const UploadImages = (file, itemid) => {
  const folder = "Items_pictures/";
  return upload(itemid, file.buffer, folder, file.mimetype, file.originalname);
};

const UpdateItem = async (req, res) => {
  console.log("req.body:", req.body);
  console.log("req.files:", req.files);

  const { username, ItemID, ItemName, ItemDescription, ItemStatus } = req.body;
  const files = req.files;

  if (!username || !ItemID || !ItemName || !ItemDescription || !ItemStatus) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const getParam = {
      TableName: "ReFeast_Items",
      Key: {
        ItemID: ItemID,       
        username: username,   
      },
    };

    const data = await dynamodb.get(getParam).promise();

    if (!data.Item) {
      return res.status(404).json({ message: "Item Not Found!!" });
    }

    
    let finalImages = data.Item.ItemImages; 

    if (files && files.length > 0) {
      finalImages = await Promise.all(
        files.map((file) => UploadImages(file, ItemID))
      );
    }

    
    const updatedParam = {
      TableName: "ReFeast_Items",
      Key: {
        ItemID: ItemID,       
        username: username,
      },
      UpdateExpression:
        "SET ItemName = :newname, ItemDescription = :newdesc, ItemStatus = :newstatus, ItemImages = :newimages",
      ExpressionAttributeValues: {
        ":newname": ItemName,
        ":newdesc": ItemDescription,
        ":newstatus": ItemStatus,
        ":newimages": finalImages,
      },
      ReturnValues: "ALL_NEW",
    };

    const newData = await dynamodb.update(updatedParam).promise();

    return res.status(200).json({
      message: "Updated Successfully!!",
      updatedItem: newData.Attributes,
    });

  } catch (err) {
    console.error("UpdateItem Error:", err);
    return res.status(500).json({
      message: "Some Error Occurred",
      errorCode: err.code,
      errorMessage: err.message,
    });
  }
};

route.post("/", multerUpload.array("ItemImages", 10), UpdateItem);
module.exports = route;