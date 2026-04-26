const dynamodb = require("../AWS/DynamoDB");
const express=require('express')
const route=express.Router()
require('dotenv').config()
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

const GoogleUser = async (req, res) => {
  console.log("req.body:", req.body);
  let { username, name, email, phone} = req.body;
  const file = req.file;

    if (!username || !name || !email || !phone) {
      return res.status(400).json({ message: "Missing Required Fields!!" });
    }

  let display_picture = null;
  const getparam = {
    TableName: "ReFeast_User",
    Key: {
      username:username,
    },
  };
  try {
    const Data = await dynamodb.get(getparam).promise();
    if (!Data.Item && file) {
      const folder = "display_pictures/";
      const uploaded = await upload(
        username,
        file.buffer,
        folder,
        file.mimetype,
        file.originalname
      );

    if(!display_picture){
      return res.status(500).json({ message: "Image upload to S3 failed." });
    }

    display_picture=uploaded

      const Items_List=[]
      const param = {
        TableName: "ReFeast_User",
        Item: {
          username,
          name,
          email,
          phone,
          display_picture,
          Items_List,
          CreatedAt: new Date().toISOString(),
        },
      };
      try {
        const data = await dynamodb.put(param).promise();
        res
          .status(201)
          .json({ message: "User Data Registed.",data:data.Item});
      } catch (err) {
        res
          .status(500)
          .json({ error: "Failed to insert the data into DynamoDB",err });
      }
    } else {
      res.status(200).json({ message: "Successfully Logged in",Data:Data.Item});
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Some Error Occured"});
  }
};
route.post('/',multerUpload.single("display_picture"),GoogleUser)
module.exports = route;
