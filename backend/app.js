const express=require("express");
const app=express();

app.use(express.json());

const authRouter=require("./routes/auth.routes");
app.use("/user",authRouter);

module.exports=app;