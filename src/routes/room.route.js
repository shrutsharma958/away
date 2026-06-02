const router=require("express").Router()

const {createRoom,joinRoom}=require("../controllers/room.controller");

const auth=require("../middlewares/auth.middleware")


router.post("/",auth,createRoom)
router.post("/:roomid",joinRoom)

module.exports=router;