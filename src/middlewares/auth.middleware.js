const jwt=require("jsonwebtoken")


module.exports=(req,res,next)=>{
    try{
        const token = req.header.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next()
    }catch(er){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}