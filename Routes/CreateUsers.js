const express=require("express");
const router=express.Router();
const User=require("../Models/User");
const {body,validationResult}=require('express-validator')
const jwt=require("jsonwebtoken")
const bcrypt=require('bcryptjs')
// const keySecret="WehaveGivingaStrongSecretInThisFile"


router.post("/createuser",
body('email',"correct your emailid").isEmail(),
body('password',"Incorrect password").isLength({min:8})
,
async(req,res)=>{
      const error=validationResult(req);
    
      if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
      }
      const salt= await bcrypt.genSalt(10);
      let secPassword=await bcrypt.hash(req.body.password,salt)
    try {
       await User.create({
            name:req.body.name,
            password:secPassword,
            location:req.body.location,
            email:req.body.email   
        })
        res.json({
            success:true
            
        })
        
        
    } catch (error) {
        console.log(error)
        res.json({success:false})
    }
})
router.post("/loginuser",
body('email',"correct your emailid").isEmail(),
body('password',"Incorrect password").isLength({min:8})
,async(req,res)=>{
    const error=validationResult(req);
    console.log(error);
    if(!error.isEmpty()){
      return res.status(400).json({error:error.array()})
    }
    let email=req.body.email;
    try {
        
     let userData=await User.findOne({email});
     if(!userData){
         return res.status(400).json({error:"user not exist"})
     }
     const comparePassword= await bcrypt.compare(req.body.password,userData.password)
          
     if(!comparePassword){
        return res.status(400).json({error:"password invalid"})
     }

     const data={
        user:{
            id:userData._id,
        }
     }
     const authToken=jwt.sign(data,process.env.SECREATEKEY)
     return res.json({success:true,authToken:authToken})
        
    } catch (error) {
        console.log(error)
        res.json({success:false})
    }
})

module.exports=router;