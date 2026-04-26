const dynamodb=require('../AWS/DynamoDB')
const express=require('express')
const route=express.Router()

const retrieve=async(req,res)=>{
const AllItems=async ()=>{
    const {tableName}=req.query
    let items=[]
    let lastkey=null
   do{
     const param={
        TableName:tableName,
        ExclusiveStartKey:lastkey
    }
    try{
        const data=await dynamodb.scan(param).promise()
        items=items.concat(data.Items)
        lastkey=data.lastkey
    }catch(error){
        console.error(error)
        throw new Error("Error scanning the table")
    }
}while(lastkey)
    return items
}

try{
    const GetAllData= await AllItems()
    res.status(200).json({message:"All Data Retrieved Successfully!!!",Data:GetAllData})
}catch(err){
    console.error(err)
    res.status(500).json({message:"Internal Server Issue!!",Error:err})
}
}

route.get('/',retrieve)
module.exports=route