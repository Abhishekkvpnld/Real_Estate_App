import axios from "axios";

const axiosRequest = axios.create({
    // baseURL: "https://real-estate-app-wlfr.onrender.com/api",
    baseURL: "http://localhost:5000/api",
    withCredentials: true
});

export default axiosRequest;