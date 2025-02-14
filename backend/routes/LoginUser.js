const bcrypt=require("bcryptjs")
const express=require("express")
const dynamodb = require("../AWS/DynamoDB")
require('dotenv').config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const jwt = require("jsonwebtoken")
const SecretKey=process.env.JWT_SECRET_KEY;

const route=express.Router()
success=false;
const login=async(req,res)=>{
    const {username,password}=req.body
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
        const valid_pass=await bcrypt.compare(password,data.Item.password)
        if(!valid_pass){
            res.status(401).json({message:"Invalid Credentials"})
        }
        else{
            const token=jwt.sign({id:username},SecretKey,{expiresIn:'0.5h'});
            res.status(200).json({message:"Successfully Logged in",token: token,data})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Some Error Occured"})
    }
}
route.post('/',login)

module.exports=route