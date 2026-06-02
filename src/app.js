const express=require("express")


const app=express()
app.use(express.json());
//const register = require("./controllers/auth.controller");

const authrouter=require("../src/routes/auth.route");
const roomrouter=require("./routes/room.route");

app.use("/",authrouter)
app.use("/rooms",roomrouter)
module.exports=app