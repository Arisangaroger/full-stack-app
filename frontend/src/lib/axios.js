
import axios from "axios"
import { getNavigator } from "./navigation";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? 'http://localhost:5001/api': '/api',
  withCredentials: true,
})


export default axiosInstance;