const dynamodb=require('../AWS/DynamoDB');
const express=require('express')
const route=express.Router()
const upload=require('../AWS/UploadImageToS3')

const UploadImages=(imgpath,itemid,ind)=>{
    return new Promise(async(resolve,reject)=>{
        const folder='Items_pictures/'
        const location =await upload(itemid,imgpath,folder)
        resolve(location)
    })
}

const UpdateItem=async(req,res)=>{
    const {username,ItemID,ItemName,ItemDescription,ItemStatus,ItemImages}=req.body;
    const param={
        TableName:'ReFeast_Items',
        Key:{
            ItemID:ItemID,
            username:username
        }
    }
   try{
    const data=await dynamodb.get(param).promise()
    if(data.Item){
        try{
            if(ItemImages!=data.Item.ItemImages){
                const newImages=await Promise.all(ItemImages.map((imgpath,index)=>UploadImages(imgpath,ItemID,index)))
            }
        const UpdatedParam={
            TableName:'ReFeast_Items',
            Key:{
                ItemID:'fbc4e991-5a29-4342-a63d-2c208d373bcb',
                username:username
            },
            UpdateExpression: 'SET ItemName = :newname, ItemDescription = :newdesc, ItemStatus = :newstatus, ItemImages = :newimages',
            ExpressionAttributeValues:{
                ':newname':ItemName,
                ':newdesc':ItemDescription,
                ':newstatus':ItemStatus,
                ':newimages':ItemImages
            },
            ReturnValues:'ALL_NEW'
        }
        const newData=await dynamodb.update(UpdatedParam).promise()
        if(newData){
            res.status(201).json({message:"Updated Successfully",newData})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Some Error Occured!!"})
    }
    }
    else{
        res.status(404).json({meesage:"Not Found!!"})
    }
   }
   catch(err){
    console.log(err)
    res.status(500).json({message:"Error Occured"})
   }
}
route.post('/',UpdateItem)
module.exports=route