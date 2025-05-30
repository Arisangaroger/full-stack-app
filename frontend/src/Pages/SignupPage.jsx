import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../Store/authStore";
import authPhoto from "../Assets/chat-app-auth-photo.png";
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({

    fullName:"",
    email: "",
    password: "",
  });
  const { isSigningUp, signUp } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    if(!formData.fullName.trim()) return toast.error("Full name is required")
      if(!formData.email.trim()) return toast.error("Email is required")
      if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email format")
      if(!formData.password.trim()) return toast.error("Password is required")
      if(formData.password.length < 6) return toast.error("Password should be atleast 6 characters")
      
        return true
  };
  
  const handleSubmit = (e) => {
   
    
      e.preventDefault()
      const success = validateForm()
       
      if (success == true) {
         console.log("I am signing in with success")
       
        signUp(formData)
     
      }
  };
  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <div className="h-screen flex flex-col sm:flex-row gap-25 sm:gap-0 text-black  items-center">
      

     

      {/*The Photo */}
      <div className=" relative h-[1000px] sm:h-[97%] sm:w-[40%] rounded-[3.5%] sm:ml-10">
     
        <img
          className=" h-[100%] sm:w-[100%] rounded-[3.5%] "
          src={authPhoto}
          alt=""
        />
        <p className="whitespace-pre absolute top-36 right-10  text-white text-4xl font-medium tracking-wide leading-[43px]">
          {`
          Take your
  connectivity to  
          next level.
  `}
        </p>
        <section className="absolute bottom-20 right-[11%]">
          <div className="relative border border-white   rounded-lg flex gap-2 py-4 px-2">
            <button className="bg-yellow-200 p-2 rounded-lg font-medium cursor-pointer">
              {" "}
              Download on Apple
            </button>
            <button className="bg-white p-2 rounded-lg font-medium cursor-pointer ">
              {" "}
              Download on Android
            </button>
            <label className="absolute top-[-15px] left-5 px-3  bg-black text-white ">
              {" "}
              Get the Mobile App
            </label>
          </div>
        </section>
      </div>

       {/*The Sign Up Form */}
      <div className="sm:h-[100%]  w-[70%] sm:w-[58%]  flex flex-col justify-center items-center relative">
       <button
          onClick={handleLoginClick}
          className="bg-white  border-black border-2 w-35 h-[5%] rounded-lg font-medium  absolute top-[-50px] right-0 sm:top-8 sm:right-[11%] cursor-pointer"
        >
          Create Account
        </button>
        <form onSubmit={handleSubmit} className="w-[100%] sm:w-[50%]">
          <h1 className="text-2xl font-bold ">Create an Account!!</h1>
          <p className=" text-gray-500 text-[15px] mb-8 font-medium">
            It's Simple and Easy!!
          </p>
          

          <p>Full Name:</p>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0  flex items-center pl-3 ">
              <User className="size-5 " />
            </div>
            <input
              className="border border-gray-500 w-[100%] md:w-[90%]  h-10  rounded-lg mb-1  pl-10 font-medium "
              value={formData.fullName}
              placeholder="Full Name"
              onChange={(e) => {
                setFormData({ ...formData, fullName: e.target.value });
              }}
              type="text"
            />
          </div>

          <p>Enter Email:</p>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0  flex items-center pl-3 ">
              <Mail className="size-5 " />
            </div>
            <input
              className="border border-gray-500 w-[100%] md:w-[90%]  h-10  rounded-lg mb-1  pl-10 font-medium "
              value={formData.email}
              placeholder="Email"
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              type="email"
            />
          </div>
          

          <p>Enter  Password:</p>
          <div className="relative  inline ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
              <Lock className="size-5" />
            </div>
            <input
              className="border border-gray-500 w-[100%] md:w-[90%]  h-10  rounded-lg mb-1  pl-10 font-medium"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              placeholder="Password"
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center cursor-pointer "
            >
              {showPassword ? (
                <Eye className="size-5" />
              ) : (
                <EyeOff className="size-5" />
              )}
            </button>
          </div>

          
          <button 
          onClick={handleSubmit}
            disabled={isSigningUp}
            className="bg-black w-[100%] md:w-[90%] text-white rounded-lg  h-10 cursor-pointer mt-8"
          >
            {isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin text-center ml-[47%]" />
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
