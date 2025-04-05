import axios from "axios";
export const Axios = axios.create({
    baseURL : "https://dreamrental.onrender.com",
    withCredentials: true // Enables sending cookies with requests
})
