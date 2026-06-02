const userModel=require("../models/user.model")
const bcrypt=require("bcrypt")
async function register(req,res){
    try{
        const {name,email,password}=req.body;
        const exist=await userModel.findOne({
            email
        });
        if(exist){
            return res.status(400).json({
                message:"User Exist"
            })
        }
        const hashed=await bcrypt.hash(password,10)
        const user=await userModel.create({
            name,
            email,
            password:hashed
        })
        return res.status(201).json({
            message: "User created successfully",
            user
        });
    }
    catch(err){
        res.status(500).json(err)
         console.log("ERROR:", err);
    return res.status(500).json({
        message: err.message
    });
    }

}

async function login(req,res){
    try{
    const {email,password}=req.body
    const user=await userModel.findOne({
        email
    });
    if(!exist){
        return res.status(404).json({
            message:"User Not Found"
        })
    }
    const match=await bcrypt.compare(
        password,user.password
    );
    if(!match){
        return res.status(400).json({
            message:"Invalid Password"
        });
    }
    const token=genreateToken(user._id);
    res.json({
        token,
        user
    });
}catch(err){
res.status(500).json(err);
}}

module.exports=register