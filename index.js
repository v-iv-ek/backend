const express=require('express');
const app=express();
const cors=require('cors');
const port= process.env.PORT || 5000;
const mongoDB=require("./db");
const env=require("dotenv").config()
mongoDB();
app.use(cors())
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-with,Content-TypeError,Accept"
    )
    next();
})

app.get('/',(req,res)=>{
       res.send("Hello")
})
app.use(express.json());
let testRoutes=require('./Routes/CreateUsers')
app.use('/api',testRoutes)
app.use('/api',require('./Routes/DisplayData'))
app.use('/api',require('./Routes/OrderData'))
app.listen(port,()=>{
    console.log(`server connected at ${port}`)
})
