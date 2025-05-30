import React, { useRef, useState } from 'react'
import { Image } from 'lucide-react'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'
import { Send } from 'lucide-react'
import { useChatStore } from '../Store/chatStore'

const MessageInput = () => {
  const {sendMessage} = useChatStore()
  const [text, setText] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  const fileRef= useRef(null)
  const handleImageInput= (e)=>{
   const file= e.target.files[0]
   if(!file.type.startsWith("image/")){
    toast.error("Please select an image file")
    return;
   }
   const reader = new FileReader()
   reader.readAsDataURL(file)
   reader.onload =()=>{
    setImagePreview(reader.result)
   }

  }
  const removeImage = (e) =>{
  setImagePreview(null)
  if(fileRef.current) fileRef.current.value = ""
  
  }
  const handleSendMessage= async (e) =>{
    e.preventDefault()
    if(!text.trim() && !imagePreview ){
      return
    }
    try{
      await sendMessage({text: text, image: imagePreview});
      fileRef.current.value= ""
      setText("")
      setImagePreview(null)
    }
    catch(error){
      console.log("Failed to send message", error)
    }

  }
  return (
    <div className='w-full p-4'>
      {imagePreview && (
        <div className='flex items-center mb-3'>
          <div className='relative'>
            <img
             src={imagePreview}
              alt="Preview"
              className='w-20 h-20 object-cover rounded-lg border border-zinc-700'
              />
              <button
              onClick={removeImage}
              type='button'
              className='absolute -top-1.5 flex items-center justify-center -right-1.5 w-5 h-5 rounded-full bg-base-300'
              > 
              <X className='size-3'/> 
              </button>
        </div>
        </div>
        
      )}

      <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
        <div className='flex-1 flex gap-2'>
          <input
           type="text" 
           className='w-full input input-bordered rounded-lg input-sm sm:input-md'
           placeholder='Type a message...'
           value={text}
           onChange={(e)=>{setText(e.target.value)}}
           />
           <input
            type="file"
            accept= "image/*"
            className='hidden'
            ref={fileRef}
            onChange={handleImageInput}
            />
            <button
            type='button'
            onClick={()=>{fileRef.current?.click()}}
            className={`flex btn btn-circle ${imagePreview? "text-emerald-500": "text-zinc-400"
            }`}
            >
            <Image size={20} />
            </button>
            
        </div>
        <button
        className='btn btn-circle'
        type='submit'
        onClick={handleSendMessage}
        >
             <Send size={20}/>
        </button>
      </form>
{/* <div className='flex items-center gap-4 w-full p-4 bg-base-100 border-t border-base-200'>
      <div className='flex gap-2 '>
        <input
         type="text" 
         placeholder='Type your message here...'
         value={text}
         onChange={(e)=>{setText(e.target.value)}}
         className='flex-1 text-sm sm:text-md'
         />
         <input 
         type="file" 
         ref={fileRef}
         className='hidden'
        onChange={handleImageInput}
      
         />
         <button 
         onClick= {() => fileRef.current.click()}
         className= {`${imagePreview? "text-green-500": "text-zinc-500"} btn btn-rounded btn-ghost btn-sm sm:btn-md`}
         >
          <Image className='size-8'/>
         </button>
      </div>
      <div>
        <button
        onClick={handleSendMessage}
        className=''
        disabled= {!text.trim()  && !imagePreview}
        >

        </button>
      </div>
    </div> */}
    </div>
    
  )
}

export default MessageInput