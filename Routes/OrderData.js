const express=require("express");
const router=express.Router()
const order=require("../Models/Orders")

router.post("/orderData",async(req,res)=>{
    let data=req.body.order_data
    await data.splice(0,0,{order_date:req.body.order_date})

    let eId=await order.findOne({'email':req.body.email})
    console.log(eId)
    if(eId===null){
        try{
            await order.create({
                email:req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({success:true})
            })
        }catch(err) {
                console.log(err.message)
                res.send("Server Error",err.message)
            
            }
        }

   else{
    try{
        await order.findOneAndUpdate({'email':req.body.email},
            {  $push:{order_data:data}}).then(()=>{
                res.json({success:true})
            }) 
        }catch(error){
                res.send("Server Error",error.message)
            }
    }
   
    
})


router.post('/myOrderData',async(req,res)=>{
    try{
        let myData=await order.findOne({'email':req.body.email})
        res.json({orderData:myData})
    }catch(error){
        res.send("Server Error",error.message)
    }
})
module.exports=router