const express=require("express")
const app=express()
require('./AWS/DynamoDB')
const cors=require('cors')

app.use(cors())
app.use(express.json())

app.use("/auth/login",require("./routes/User"))
app.use("/auth/googlelogin",require("./routes/GoogleUser"))
app.use('/add-item',require('./routes/AddItems'))
app.use('/update-item',require('./routes/UpdateItem'))
app.use("/update-user-data",require('./routes/UpdateUserData'))
app.use("/get-all-items",require("./routes/GetAllItems"))

app.listen(5050,()=>{console.log("The Database is Connected.")})