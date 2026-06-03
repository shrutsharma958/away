const express=require("express")
const cors = require("cors"); 

const app=express()
app.use(cors({             
  origin: "https://away-frontend-tau.vercel.app/",
  credentials: true
}));
app.use(express.json());
//const register = require("./controllers/auth.controller");

const authrouter=require("../src/routes/auth.route");
const roomrouter=require("./routes/room.route");

app.use("/auth",authrouter)
app.use("/rooms",roomrouter)
module.exports=app