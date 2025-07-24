import axios, { type InternalAxiosRequestConfig } from 'axios'
const axiosInstance = axios.create({
    baseURL: "http://localhost:9000"
})

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // console.log("interceptor: ", config)
        const token = localStorage.getItem("token");
        if(token && config.headers){
            config.headers.Authorization = `bearer ${token}`
        }
        return config;
    }
)

export default axiosInstance;