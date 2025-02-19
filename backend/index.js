const express=require("express")
const app=express()
require('./AWS/DynamoDB')
const cors=require('cors')
//const s3=require('./AWS/S3')

app.use(cors())
app.use(express.json())

app.use("/auth/login",require("./routes/User"))
app.use('/additem',require('./routes/AddItems'))
app.use('/updateitem',require('./routes/UpdateItem'))
app.use("/updateuserdata",require('./routes/UpdateUserData'))

app.listen(5050,()=>{console.log("The Database is Connected.")})