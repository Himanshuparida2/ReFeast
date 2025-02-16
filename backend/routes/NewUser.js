const dynamodb = require("../AWS/DynamoDB");
const express=require('express')
const route=express.Router()

const NewUser = async (req, res) => {
    const { username, name, email, phone } = req.body;
  
    console.log("Received request to register/login user:", username);
  
    const getparam = {
      TableName: "ReFeast_User",
      Key: {
        username: username
      },
    };
  
    try {
      console.log("Attempting to fetch user data from DynamoDB...");
      const Data = await dynamodb.get(getparam).promise();
      console.log("Fetched data from DynamoDB:", Data);
  
      if (!Data.Item) {
        console.log("User does not exist, creating new user...");
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
          console.log("Inserting new user data into DynamoDB...");
          const data = await dynamodb.put(param).promise();
          console.log("Data successfully inserted into DynamoDB.");
          res.status(201).json({ message: "User registered successfully.", data: param.Item });
        } catch (err) {
          console.error("Error inserting data into DynamoDB:", err);
          res.status(500).json({ error: "Failed to insert data into DynamoDB" });
        }
      } else {
        console.log("User already exists, returning login success.");
        res.status(200).json({ message: "Successfully logged in", user: Data.Item });
      }
    } catch (error) {
      console.error("Error during user check:", error);
      res.status(500).json({ message: "An error occurred while checking the user", error });
    }
  };
  
route.post('/',NewUser)
module.exports = route;
