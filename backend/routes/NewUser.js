const dynamodb = require("../AWS/DynamoDB");
const AWS=require('aws-sdk')
const express=require('express')
const route=express.Router()

const NewUser = async (req, res) => {
  const { username, name, email, phone, display_picture } = req.body;
  const getparam = {
    TableName: "ReFeast_User",
    Key: {
      username: username,
    },
  };
  try {
    const Data = await dynamodb.get(getparam).promise();
    if (!Data.Item) {
      const param = {
        TableName: "ReFeast_User",
        Item: {
          username,
          name,
          email,
          phone,
          display_picture,
          CreatedAt: new Date().toISOString(),
        },
      };
      try {
        const data = await dynamodb.put(param).promise();
        res
          .status(201)
          .json({ message: "User Data Registed."});
      } catch (err) {
        res
          .status(500)
          .json({ error: "Failed to insert the data into DynamoDB",err });
      }
    } else {
      res.status(200).json({ message: "Successfully Logged in"});
    }
  } catch (error) {
    res.status(500).json({ message: "Some Error Occured",error});
  }
};
route.post('/',NewUser)
module.exports = route;
