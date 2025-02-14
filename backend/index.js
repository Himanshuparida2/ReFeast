const express=require("express")
const app=express()
const Database=require("./AWS/DynamoDB")
//const s3=require('./AWS/S3')
app.use(express.json())

app.use("/auth/signup",require("./AWS/Cognito_Signup"))
app.use("/auth/login",require("./AWS/Cognito_login"))

app.listen(5050,()=>{console.log("The Database is Connected.")})