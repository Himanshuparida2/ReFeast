const AWS=require("aws-sdk")
const fs=require("fs")
const path=require("path")
const s3=new AWS.S3();
const filepath=path.join(__dirname,'./ReFeast.png')
const filesteam=fs.createReadStream(filepath)

fileParam={
    Bucket:"refeastwebapp",
    Key:'test.png',
    Body:filesteam,
    ContentType:"image/png",
}
s3.upload(fileParam,(err,data)=>{
    if(err){
        console.error('Error uploading File : ',err)
    }
    else{
        console.log("File Uploaded Successfully : ",data.Location)
    }
});