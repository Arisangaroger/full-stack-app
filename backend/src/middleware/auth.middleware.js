import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute  = async (req,res, next) => {
  try {
    const token = req.cookies.jwt

    if(!token){
      return res.status(401).json({message: "Unauthorized -No token provided"})
    }
  
    const decoded = jwt.verify(token, process.env.SECRET_JWT)
  
    if(!decoded){
      return res.status(401).json({message: "Unauthorized -Invalid token"})
    }
  
  const user =await User.findById(decoded.userId).select("-password")
  
  if(!user){
    return res.status(404).json({message: "User Not Found"})
  }
  
  req.user=user;
  next()


  }

 catch(error) {
  console.log("There is an error in the protectRoute", error.message)
  res.status(500).json({message: "Internal Server Error"})
 }
}