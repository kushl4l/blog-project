const mongoose=require("mongoose");
async function connectToDB(url){

    try{
        await mongoose.connect(url);
        console.log("Connected to DB");
    }

    catch(err){
        console.log(err);
        
    }
    
    
}

module.exports=connectToDB;