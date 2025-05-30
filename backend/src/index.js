import express from "express"
import authRoute from "./routes/auth.route.js"
import dotenv from "dotenv"
import  {connectDB}  from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.route.js"
import cors from "cors"
import { app, server } from "./lib/socket.js";
import path from "path"


const _dirname = path.resolve()

dotenv.config()
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())




app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute)

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.resolve(_dirname, "../frontend/dist")))
  app.get("*", (req,res)=>{
    res.sendFile(path.resolve(_dirname, "../frontend", "dist", "index.html"))
  })
}



const PORT = process.env.PORT
server.listen(PORT, ()=>{
  console.log('Server is running on port '+ PORT)
  connectDB()
})