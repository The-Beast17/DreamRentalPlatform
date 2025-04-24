import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const Axios = axios.create({
    baseURL : baseURL,
    withCredentials: true // Enables sending cookies with requests
})
