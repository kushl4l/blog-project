const express=require("express");
const authRouter=express.Router();
const authController=require("../controllers/auth.controller");

authRouter.post("/signup",authController.handleSignUp);
authRouter.post("/login",authController.handleLogIn);

module.exports=authRouter;