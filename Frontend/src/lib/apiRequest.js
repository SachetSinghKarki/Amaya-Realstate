import axios from "axios";

const apiRequest = axios.create({
    baseURL: "http://localhost:8800/api",
    withCredentials: true, // Send cookies with requests
})

export default apiRequest