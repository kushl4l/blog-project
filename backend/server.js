require("dotenv").config();
const app=require("./app");
const connectToDB=require("./config/database");

const url="mongodb://127.0.0.1:27017/blog-project";

connectToDB(url);

app.listen(8000,()=>{
    console.log("Server is running on port 8000");
    
});

