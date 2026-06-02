const jwt=require("jsonwebtoken");

function generateToken(userid){

    return jwt.sign(
        
        {
        id:userid
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }




);

};

module.exports=generateToken;