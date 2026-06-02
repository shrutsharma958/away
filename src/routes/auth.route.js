const register=require("../controllers/auth.controller")
const app=require("../app")
const router = require("express").Router();

router.post("/",register);

module.exports=router