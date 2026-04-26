const dynamodb = require("../AWS/DynamoDB");
const express = require("express");
const route = express.Router();
require("dotenv").config();

const GoogleUser = async (req, res) => {
  console.log("req.body:", req.body);
  const { username, name, email, phone } = req.body;
  const display_picture = req.display_picture;

  if (!username || !name || !email) {
    return res.status(400).json({ message: "Missing Required Fields!!" });
  }

  try {
    const getParam = {
      TableName: "ReFeast_User",
      Key: { username: username },
    };

    const Data = await dynamodb.get(getParam).promise();

    if (Data.Item) {
      return res.status(200).json({
        message: "Successfully Logged in",
        Data: Data.Item,
      });
    }

    const folder = "display_pictures/";


    const putParam = {
      TableName: "ReFeast_User",
      Item: {
        username,
        name,
        email,
        phone,
        display_picture,
        Items_List: [],
        CreatedAt: new Date().toISOString(),
      },
    };

    await dynamodb.put(putParam).promise();

    return res.status(201).json({
      message: "User Registered Successfully.",
      Data: putParam.Item,
    });

  } catch (error) {
    console.error("GoogleUser Error:", error);
    return res.status(500).json({
      message: "Some Error Occurred",
      errorCode: error.code,
      errorMessage: error.message,
    });
  }
};

route.post("/", GoogleUser);
module.exports = route;