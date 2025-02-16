const express=require("express")
const app=express()
const Database=require("./AWS/DynamoDB")
const cors=require('cors')
//const s3=require('./AWS/S3')
app.use(cors)
app.use(express.json())

app.use("/auth/login",require("./routes/NewUser"))

app.listen(5050,()=>{console.log("The Database is Connected.")})