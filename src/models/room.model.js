const mongoose=require("mongoose")

const roomSchema=new mongoose.Schema({
    roomid:{
        type:String,
        unique:true
    },
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    isActive:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true
});
const roomModel=mongoose.model("room",roomSchema)
module.exports=roomModel