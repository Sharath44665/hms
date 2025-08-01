import axiosInstance from "../Interceptor/AxiosInterceptor"

const scheduleAppointment = async (data: any) => {
    data["appointmentTime"] = new Date(data.appointmentTime) // for some reason we need to convert this appointmentTime from string to date otherwise throw error
    return axiosInstance.post("/appointment/schedule", data)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; })
}

const cancelAppointment = async (id: any) => {
    return axiosInstance.put(`/appointment/cancel/${id}`)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; })
}

const getAppointment = async (id: any) => {
    return axiosInstance.get(`/appointment/get/${id}`)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; })
}

const getAppointmentDetails = async (id: any) => {
    return axiosInstance.get(`/appointment/get/details/${id}`)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; })
}

const getAppointmentsByPatient = async (patientId: any) => {
    return axiosInstance.get(`/appointment/getAllByPatient/${patientId}`)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; })
}

// /getAllByDoctor/{doctorId}

const getAppointmentsByDoctor = async (doctorId: any) => {
    return axiosInstance.get(`/appointment/getAllByDoctor/${doctorId}`)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; })
}
export { scheduleAppointment, cancelAppointment, getAppointment, getAppointmentDetails, getAppointmentsByPatient, getAppointmentsByDoctor }