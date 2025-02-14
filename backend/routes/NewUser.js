const dynamodb = require("../AWS/DynamoDB")
const express=require("express")
const route=express.Router()
const bcrypt=require("bcryptjs")
const NewUser=async(req,res)=>{
    const{username,name,email,password,phone}=req.body;
    const param={
        TableName:'ReFeast_User',
        Item:{
            username,
            name,
            email,
            password,
            phone,
            CreatedAt:new Date().toISOString()
        }
    }
    try{
        const salt=await bcrypt.genSalt(10)
        const hashedpass=await bcrypt.hash(param.Item.password,salt)
        param.Item.password=hashedpass
        const data=await dynamodb.put(param).promise();
        console.log('Data Successfully inserted into DynamoDB.');
        res.status(201).json({message:'User Data Registed.',data:param.Item});
    }
    catch(err){
        console.error('Error inserting data into DynamoDB: ',err);
        res.status(500).json({error:'Failed to insert the data into DynamoDB'});
    }
}
route.post('/',NewUser)
module.exports=route;