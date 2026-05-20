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

const createAppointmentReport = async (data: any) => {
    return axiosInstance.post(`/appointment/report/create`, data)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; })
}

const isReportExists = async (appointmentId: any) => {
    return axiosInstance.get(`/appointment/report/isRecordExists/${appointmentId}`)
        .then((response: any) => response.data)
        .catch((error) => { throw error })
}

const getReportsByPatientId = async (patientId: any) => {
    return axiosInstance.get(`/appointment/report/getRecordsByPatientId/${patientId}`)
        .then((response: any) => response.data)
        .catch((error) => { throw error })
}

const getPrescriptionsByPatientId = async (patientId: any) => {
    return axiosInstance.get(`/appointment/report/getPrescriptionsByPatientId/${patientId}`)
        .then((response: any) => response.data)
        .catch((error) => { throw error })
}

const getAllPrescriptions = async () => {
    return axiosInstance.get("/appointment/report/getAllPrescriptions")
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; })
}

const getMedicinesByPrescriptionId = async (prescriptionId: any) => {
    return axiosInstance.get(`/appointment/report/getMedicinesByPrescriptionId/${prescriptionId}`)
        .then((response:any) => response.data)
        .catch((error:any) => {throw error;})
}

const countAppointmentsByPatient = async (patientId: any) =>{
    return axiosInstance.get(`/appointment/countByPatient/${patientId}`)
        .then((response:any) => response.data)
        .catch((error:any) => {throw error;})
}

const countAppointmentsByDoctor = async (doctorId: any) =>{
    return axiosInstance.get(`/appointment/countByDoctor/${doctorId}`)
        .then((response:any) => response.data)
        .catch((error:any) => {throw error;})
}

const countAllAppointments = async () =>{
    return axiosInstance.get(`/appointment/visitCount`)
        .then((response:any) => response.data)
        .catch((error:any) => {throw error;})
}

const countReasonsByPatient = async(patientId: any) => { 
    return axiosInstance.get(`/appointment/countReasonByPatient/${patientId}`)
        .then((response:any) => response.data)
        .catch((error:any) => {throw error;})
}

const countReasonsByDoctor = async (doctorId: any) =>{
    return axiosInstance.get(`/appointment/countReasonByDoctor/${doctorId}`)
        .then((response:any) => response.data)
        .catch((error:any) => {throw error;})
}

const countAllReasons = async () =>{
    return axiosInstance.get(`/appointment/countReasons`)
        .then((response:any) => response.data)
        .catch((error:any) => {throw error;})
}

const getMedicinesConsumedByPatient = async(patientId: any) => { 
    return axiosInstance.get(`/appointment/getMedicinesByPatient/${patientId}`)
        .then((response:any) => response.data)
        .catch((error:any) => {throw error;})
}

const getTodaysAppointments = async () =>{
    return axiosInstance.get(`/appointment/today`)
        .then((response:any) => response.data)
        .catch((error:any) => {throw error;})
}

export { scheduleAppointment, cancelAppointment, getAppointment, getAppointmentDetails, getAppointmentsByPatient, getAppointmentsByDoctor, createAppointmentReport, isReportExists, getReportsByPatientId, getPrescriptionsByPatientId, getAllPrescriptions, getMedicinesByPrescriptionId, countAppointmentsByPatient, countAppointmentsByDoctor, countAllAppointments, countReasonsByPatient, countReasonsByDoctor, countAllReasons, getMedicinesConsumedByPatient, getTodaysAppointments }