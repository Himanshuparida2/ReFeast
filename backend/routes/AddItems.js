const dynamodb = require("../AWS/DynamoDB");
const express = require("express");
const route = express.Router();
const {v4:uuidv4}=require('uuid')

const AddItem = async (req, res) => {

  const { username, ItemName, ItemDescription, ItemStatus, ItemImages } = req.body;
  const ItemID=uuidv4()
  const param = {
    TableName: "ReFeast_User",
    Key: {
      username: username,
    },
  };
  try {
    const data = await dynamodb.get(param).promise();
    let items=[]
    if (!data.Item) {
      console.log("User Not Found!!");
      res.status(404).json({ message: "User Not Found!!" });
    } 
    else {
      items=data.Item.Items;
      const param={
        TableName:"ReFeast_Items",
        Item: {
          ItemID:ItemID,
          username:username,
          ItemName:ItemName,
          ItemDescription:ItemDescription,
          ItemStatus:ItemStatus,
          ItemImages:ItemImages
        }
      }
      
      try{
        const Data=await dynamodb.put(param).promise();
        res.status(201).json({message:"Item added Successfully!!",data:Data.Item})
        
      }catch(error){
        res.status(500).json({message:"Some Error Occured!!",Error:error})
      }
      const UpdatedParam={
        TableName:'ReFeast_User',
        Key:{
          username:username
        },
        UpdateExpression : 'SET Items_List = list_append(if_not_exists(Items_List,:newlist),:items)',
        ExpressionAttributeValues:{
          ':items': [ItemID],
          ':newlist':[]
        },
        ReturnValues: 'UPDATED_NEW'
      }
      try{
        const DT=await dynamodb.update(UpdatedParam).promise()
        console.log(DT)
      }catch(update_err){console.log(update_err)}
    }
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Some Error Occures" });
    }
      //res.status(201).json({message:"Account Found",data:data})
};
route.post("/", AddItem);
module.exports = route;