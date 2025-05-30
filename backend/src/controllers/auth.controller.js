import bcrypt from "bcryptjs";
import User from "../models/user.model.js"
import { generateToken } from "../lib/utils.js";
import jwt from "jsonwebtoken"
import cloudinary from "../lib/cloudinary.js";


export const signup= async (req,res) =>{
try{
  const {email , fullName, password, profilePic} = req.body;
  if(!fullName || !password || !email) {
    return res.status(400).json({message: "All fields are required"})
  }
  if(password.length<6) {
   console.log("user already exist");
   return res.status(400).json({message: "Password should be atleast 6 characters"})
  }
 const user = await User.findOne({email})
 if(user){
  return res.status(400).json({message: "User already exists"})
 }
 const salt = await bcrypt.genSalt(10)
 const hashedpassword= await bcrypt.hash(password, salt)
 
 const newUser = new User({
   fullname: fullName,
   password: hashedpassword,
   email: email,
   profilePic: profilePic
 })
 
 if(newUser){
   generateToken(newUser._id, res)
   await newUser.save()
   res.status(201).json({
     _id: newUser._id,
     fullName: newUser.fullname,
     password: newUser.password,
     email: newUser.email,
     profilePicture: newUser.profilePic
   })
   
 }
 
}
  catch(error) {
    console.log("There is an error in signing up",error.message)
    res.status(500).json({message: "Internal Server Error"})
  }

}

export const login= async (req,res) =>{
  const {email, password} = req.body;
  try{
  const user =  await User.findOne({email})
  if(!user){
    return res.status(400).json({message: "Invalid Credentials"})
  }

  const isPasswordCorrect =  await bcrypt.compare(password, user.password)

  if (!isPasswordCorrect){
    return res.status(400).json({message: "Invalid Credentials"})
  }
 
  generateToken(user._id, res)

  res.status(200).json({
    _id: user._id,
    fullName: user.fullname,
    email: user.email,
    profilePic: user.profilePic
  })


  }
catch(error){
  console.log("There is an error in Login Controller ", error.message)
  res.status(500).json({message: "Internal Server Error"})

}


}
export const logout=  (req,res) =>{
  try{
    res.cookie("jwt", "", {maxAge: 0})
    res.status(200).json({
      message: "Successfully logged Out"
    })
  }
  catch(error) {
    console.log("There is an error in the logout controller", error.message)
    res.status(500).json({message: "Internal Server Error"})
  }

}

export const updatePicture = async (req, res) =>{
  try{
const {profilePic} = req.body
const userId = req.user._id

if(!profilePic){
  return res.status(400).json({message: "Profile Photo is required for updating "})
}

const uploadResponse =await cloudinary.uploader.upload(profilePic)
const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true})

res.status(200).json(updatedUser)
  }
  catch(error) {
console.log("There is an error in the update controller", error.message)
res.status(500).json({message: "Internal Server Error"})
  }
}

export const checkAuth = async (req, res) => {
  try{
 res.status(200).json(req.user)

  }
  catch(error){
    console.log("There is an error checkAuth controller")
    res.status(500).json({message: "Internal Server Error"})

  }
}