const jwt=require("jsonwebtoken");
const USER=require("../models/user.model");



async function authMiddleware(req,res,next){
    try{

        const token=req.cookies.token;
        if(!token) return res.status(401).json({
            message:"Unauthorized access"
        });

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user= await USER.findById(decoded.userId);
        if(!user) return res.status(401).json({
            message:"User not found"
        });

        req.user=user;
        next();


    } catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal server error"
        });
        
    }

}