const express=require("express")


const app=express()
app.use(express.json())
//const register = require("./controllers/auth.controller");

const router=require("../src/routes/auth.route")

app.use("/register",router)

module.exports=app