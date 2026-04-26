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

const UpdateUserData = async (req, res) => {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
  
    const { username, name, email, phone } = req.body;
    const file = req.file;
  
    if (!username || !name || !email || !phone) {
      return res.status(400).json({ message: "Missing Required Fields!!" });
    }
  
    try {
      
      const getParam = {
        TableName: "ReFeast_User",
        Key: { username: username },
      };
  
      const data = await dynamodb.get(getParam).promise();
  
      if (!data.Item) {
        return res.status(404).json({ message: "User Not Found!!" });
      }
  
      
      let displayPicture = null;
  
      if (file) {
        const folder = "display_pictures/";
        const uploaded = await upload(
          username,
          file.buffer,
          folder,
          file.mimetype,
          file.originalname
        );
  
        if (!uploaded) {
          return res.status(500).json({ message: "Image upload to S3 failed." });
        }
  
        displayPicture = uploaded;
      }
  
      
      
      let updateExpression = "SET #name = :newname, email = :newemail, phone = :newphone";
      let expressionAttributeValues = {
        ":newname": name,
        ":newemail": email,
        ":newphone": phone,
      };
  
      if (displayPicture) {
        updateExpression += ", display_picture = :newDP";
        expressionAttributeValues[":newDP"] = displayPicture;
      }
  
      
      const updateParam = {
        TableName: "ReFeast_User",
        Key: { username: username },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: {
          "#name": "name", 
        },
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "UPDATED_NEW",
      };
  
      const updatedData = await dynamodb.update(updateParam).promise();
  
      return res.status(200).json({
        message: "User Data Updated Successfully!!",
        updatedAttributes: updatedData.Attributes,
      });
  
    } catch (err) {
      console.error("UpdateUserData Error:", err);
      return res.status(500).json({
        message: "Internal Server Error",
        errorCode: err.code,
        errorMessage: err.message,
      });
    }
  };
  
  route.post("/", multerUpload.single("newImg"), UpdateUserData);
  module.exports = route;