import User from "../models/user.model.js"
import cloudinary from "../lib/cloudinary.js"
import Message from "../models/message.model.js"
import { getReceiverSocketId } from "../lib/socket.js"
import { io } from "../lib/socket.js"
 export const getUSersForSidebar = async (req,res) => {
  try{
    const loggedInUser = req.user._id

    const filteredUsers = await User.find({_id: {$ne: loggedInUser}}).select("-password")
    
    if(filteredUsers){
      return res.status(200).json(filteredUsers)
    }
   
  }
  catch(error){
    console.log("There is an error in getUsersForSidebar controller", error.message)
    res.status(500).json({message: "Internal Server Error"})
  }
}
 
export const getMessages = async (req,res ) => {

  try{
    const userInChatId = req.params.id
    const myId = req.user._id

    const messages = await Message.find({ 
      $or:[
        {senderId:myId, receiverId: userInChatId},
        {senderId:userInChatId, receiverId: myId}
      ]
    })
    if(messages)
    res.status(200).json(messages)
  }
  catch(error){
console.log("There is an error in getMessages controller", error)
res.status(500).json({message: "Internal Server Error"})
  }
}
export const sendMessage = async (req, res) => {
  try{
 const {text, image} = req.body
 const receiverId = req.params.id
 const myId = req.user._id

let imageUrl = null;
 if(image) {
 const uploadPicture =  await cloudinary.uploader.upload(image)
 imageUrl = uploadPicture.secure_url
 }

 
 const newMessage = await Message.create({
  senderId: myId,
  receiverId: receiverId,
  text: text,
  image: imageUrl
 })
 const receiverSocketId =getReceiverSocketId(receiverId)
 if(receiverSocketId){
io.to(receiverSocketId).emit("newMessageAlert", newMessage)
 }
 
 
 
 if(newMessage){
  res.status(201).json(newMessage)
 }
  }
  catch(error){
console.log("There is an error in sendMessage controller", error.message)
res.status(500).json({message: "Internal Server Error"})
  }
}