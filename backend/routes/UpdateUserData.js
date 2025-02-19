const dynamodb=require('../AWS/DynamoDB')
const express= require('express')
const route=express.Router()

const UpdateUserData=async(req,res)=>{
    const {username,name,email,newImg,phone}=req.body
    const param={
        TableName:"ReFeast_User",
        Key:{
            username:username
        }
    }
    try{
        const data=await dynamodb.get(param).promise()
        if(data.Item){
            const UDparam={
                TableName:"ReFeast_User",
                Key:{
                    username:username
                },
                UpdateExpression:"SET #name = :newname , email = :newemail, phone = :newphone, display_picture = :newDP",
                ExpressionAttributeNames:{
                    "#name":"name"
                },
                ExpressionAttributeValues:{
                    ":newname":name,
                    ":newemail":email,
                    ":newphone":phone,
                    ":newDP":newImg,
                },
                ReturnValues: 'UPDATED_NEW'
            }
            try{
                const Data=await dynamodb.update(UDparam).promise()
                if(Data && Data.Attributes){
                    res.status(200).json({message:"User Data Updated Successfully!!",Data})
                }
            }catch(error){
                console.error(error)
                res.status(500).json({message:"Internal Server Error (Update)!!"})
            }
        }
        else{
            res.status(404).json({message:"User Not Found!!"})
        }
    }catch(err){
        console.error(err)
        res.status(500).json({message:"Internal Server Error (User)!!!"})
    }
};
route.post('/',UpdateUserData);
module.exports=route