const dynamodb = require("../AWS/DynamoDB");
const AWS=require('aws-sdk')
const express=require('express')
const route=express.Router()

const NewUser = async (req, res) => {
  const { username, name, email, phone } = req.body;
  console.log(req.body)
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
          CreatedAt: new Date().toISOString(),
        },
      };
      try {
        const data = await dynamodb.put(param).promise();
        console.log("Data Successfully inserted into DynamoDB.");
        res
          .status(201)
          .json({ message: "User Data Registed.", data: data });
      } catch (err) {
        console.error("Error inserting data into DynamoDB: ", err);
        res
          .status(500)
          .json({ error: "Failed to insert the data into DynamoDB" });
      }
    } else {
      res.status(200).json({ message: "Successfully Logged in",data:Data });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Some Error Occured",error});
  }
};
route.post('/',NewUser)
module.exports = route;
