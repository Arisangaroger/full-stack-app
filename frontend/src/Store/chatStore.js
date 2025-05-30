
import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance  from "../lib/axios.js";
import { useAuthStore } from "./authStore.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
   

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
        console.log("There is an error in sendMessage", error)
      toast.error(error.response.data.message);
    
    }
  },

  subscribeToMessages: () => {
   const {selectedUser} = get()
   if(!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    
    socket.on("newMessageAlert", (newMessage)=>{

      if(newMessage.senderId !== selectedUser._id ) return;
     set((state) => ({
  messages: [...state.messages, newMessage],
}));
    })
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessageAlert");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
