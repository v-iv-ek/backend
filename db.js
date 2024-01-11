const mongoose=require('mongoose');
// const mong_url="mongodb+srv://FoodApp:Food123@cluster0.c63claq.mongodb.net/FoodAppNew?retryWrites=true&w=majority";


const mongoDB=async()=>{
        await mongoose.connect(process.env.CONSTVARIABLE)
        .then(async()=>{
            console.log("mongo connected");
            const fetchData=await mongoose.connection.db.collection("Food_items");
            const data=await fetchData.find({}).toArray();
            // console.log(data)
            global.Food_items=data;
            // console.log(global.Food_items)
            const foodCategory=await mongoose.connection.db.collection("Food_category");
            let categoryData= await foodCategory.find({}).toArray();
    
            global.Food_categoty=categoryData;
            console.log(global.Food_categoty);


         });
  
   
}

module.exports=mongoDB;






