const express=require("express")
const dynamodb = require("../AWS/DynamoDB")
const NewUser=require('./NewUser')
const route=express.Router()

const login=async(req,res)=>{
    const {username}=req.body
    const param={
        TableName:"ReFeast_User",
        Key: {
            username : username
        }
    }
    try {
        const data= await dynamodb.get(param).promise();
        if(!data.Item){
            res.status(404).json({message:"Data Not Found!"})
        }
        if(!valid_pass){
            res.status(401).json({message:"Invalid Credentials"})
        }
        else{
            res.status(200).json({message:"Successfully Logged in"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Some Error Occured"})
    }
}
route.post('/',login)

module.exports=route