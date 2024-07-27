import axios from "axios";

const axiosRequest = axios.create({
    baseURL: "https://real-estate-app-wlfr.onrender.com/api",
    withCredentials: true
});

export default axiosRequest;