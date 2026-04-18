import axiosInstance from "../Interceptor/AxiosInterceptor"

const registerUser = async (user: any)=>{
    return axiosInstance.post("/users/register", user)
    .then((response:any) => response.data)
    .catch((error:any) => {throw error;})
}

const loginUser = async (user: any)=>{
    return axiosInstance.post("/users/login", user)
    .then((response:any) => response.data)
    .catch((error:any) => {throw error;})
}

const getUserProfile = async(id:any) =>{
    return axiosInstance.get("/users/getProfile/"+id)
    .then((response:any) => response.data)
    .catch((error:any) => {throw error;})
}


export {registerUser, loginUser, getUserProfile}