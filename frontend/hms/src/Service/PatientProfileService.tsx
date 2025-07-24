import axiosInstance from "../Interceptor/AxiosInterceptor"

const getPatient = async (id: any) => {
    return axiosInstance.get(`/profile/patient/get/${id}`) 
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; })
}

const updatePatient = async (patient: any) => {
    return axiosInstance.put("/profile/patient/update", patient)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; })
}


export { getPatient, updatePatient }