const USER=require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
async function handleSignUp(req,res){

    try{

    
    const{fullName,email,password,role,}=req.body;
    if(!fullName||!email||!password||!role) {
        return res.status(400).json("Provide complete details");
    }

    const emailAlreadyExists= await USER.findOne({email});
    if(emailAlreadyExists) return res.status(400).json("Email is already used");

    const hashedPassword= await bcrypt.hash(password, 10);
    const newUser= await USER.create({
        fullName:fullName,
        email:email,
        password:hashedPassword,
        role:role
    });

    return res.status(200).json({
        message:"User created successfully",
        user:{
            fullName:newUser.fullName,
            email:newUser.email,
            role:newUser.role
        }
    });

} catch(err){
    console.log(err);
    return res.status(500).json({
        message:"Internal server error"
    });
    
}


}

async function handleLogIn(req,res) {
    try{

    
    const {email,password}=req.body;
    if(!email||!password) return res.status(400).json("Provide complete details");
    const oldUser= await USER.findOne({email});
    if(!oldUser) return res.status(400).json("Email is not registered");
    
    const isMatch= await bcrypt.compare(password,oldUser.password);
    if(!isMatch) return res.status(400).json({
        message:"Invalid password"
    })

    const token=jwt.sign({
        userId:oldUser._id
    },process.env.JWT_SECRET,{expiresIn:"7d"});

    res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
    });

          return res.status(200).json({
            message:"User logged in successfully",
          user: {
        fullName: oldUser.fullName,
        email: oldUser.email,
        role:oldUser.role
                }
        });
    
    } catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal server error"
        });
        
    }
    
}

module.exports={
    handleSignUp,
    handleLogIn
}