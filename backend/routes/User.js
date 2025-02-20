const dynamodb = require("../AWS/DynamoDB");
const upload = require('../AWS/UploadImageToS3')
const express=require('express')
const route=express.Router()

require('dotenv').config()

const folder='display_pictures/'

const NewUser = async (req, res) => {
  let { username, name, email, phone, display_picture } = req.body;
  const getparam = {
    TableName: "ReFeast_User",
    Key: {
      username:username,
    },
  };
  try {
    const Data = await dynamodb.get(getparam).promise();
    if (!Data.Item) {
      display_picture= await upload(username,display_picture,folder)
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
route.post('/',NewUser)
module.exports = route;
