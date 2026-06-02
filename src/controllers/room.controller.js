const roomModel=require("../models/room.model")
const { v4: uuidv4 } = require("uuid");

async function createRoom(req,res){
    try{
        const room = await roomModel.create({
            roomid:uuidv4(),
            host:req.user.id
        });
        res.status(201).json(room);
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}



async function joinRoom(req,res){
try{
    const roomid=req.params.roomid;
    const room=roomModel.findOne({
        roomid:req.params.roomid,
        active:true
    });
    if(!room){
        return res.status(404).json({
            message:"no room found"
        })
    }
    res.json(room)

}catch(err){
    res.status(500).json({
        message:err.message
    });
}
};
module.exports={joinRoom,createRoom}