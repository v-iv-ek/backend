const express=require("express");
const router=express.Router();
router.post('/foodData',(req,res)=>{
    try {
        // console.log(global.Food_items)
        // console.log(global.Food_category)
        res.send([global.Food_items,global.Food_categoty]);
        
    } catch (error) {
        console.error(error.message);
        res.send("Server error")
    }
})
module.exports=router;