const dynamodb = require("../AWS/DynamoDB");
const express = require("express");
const route = express.Router();

const AddItem = async (req, res) => {
  const { username, ItemName, ItemDescription, ItemImages } = req.body;
  const param = {
    TableName: "ReFeast_User",
    Key: {
      username: username,
    },
  };
  try {
    const data = await dynamodb.get(param).promise();
    if (!data.Item) {
      console, log("User Not Found!!");
      res.status(404).json({ message: "User Not Found!!" });
    } else {
      const { username, name, email, phone } = data.Item;
      console.log(username, name, email, phone);
      res.status(201).json({message:"Account Found",data:data})
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Some Error Occures" });
  }
};
route.post("/", AddItem);
module.exports = route;