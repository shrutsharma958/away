require("dotenv").config()
const http = require("http");
const app=require("./src/app")

const server=http.createServer(app)
const initSocket=require("./src/socket/socket")

initSocket(server)

const connectDB=require("./src/db/db")

connectDB();



app.listen(process.env.PORT,()=>{
    console.log("Server Started")
})

