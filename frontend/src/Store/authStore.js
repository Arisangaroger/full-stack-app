import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001":"/";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null ,
 

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket()
    } catch (error) {
      set({ authUser: null });
      console.log("There is an error in checkAuth", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Created An Account successfully");
      get().connectSocket()
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  logIn: async (formdata) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", formdata);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket()
    } catch(error) {
      set({ authUser: null }), toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logOut: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      toast.success("Logged out successfully");
      set({authUser: null})
      get().disconnectSocket()
    } catch (error) {}
  },
  uploadProfile: async (data) => {
    set({ isUpdatingProfile: true });

    try {
      const res = await axiosInstance.post("/auth/uploadPhoto", data);
      set({ authUser: res.data });
      toast.success("Profile uploaded successfully");
    } catch (error) {
      console.log("there is an Error in profile upload:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: ()=>{
    const {authUser } = get()
    if(!authUser || get().socket?.connected) return;
 const socket = io(BASE_URL, {
          query: {
                   userId: authUser._id
                 }
 })
 socket.connect()
 set({socket: socket})
 socket.on("getOnlineUsers", (userIds) =>{
  set({onlineUsers: userIds})
 })
  },
  disconnectSocket: () =>{
    if(get().socket?.connected) get().socket?.disconnect()

  }
  }));
