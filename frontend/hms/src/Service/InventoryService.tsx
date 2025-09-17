import axiosInstance from "../Interceptor/AxiosInterceptor"

const addStock = async (data: any) => {
    return axiosInstance.post("/pharmacy/inventory/add", data)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; })
}


const getStock = async (id: any) => {
    return axiosInstance.get(`/pharmacy/inventory/get/${id}`)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; })
}

const getAllStocks =  async () => {
    return axiosInstance.get("/pharmacy/inventory/getAll")
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; })
}

const updateStock = async (data:any) => {
    return axiosInstance.put("/pharmacy/inventory/update", data)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; })
}

export { addStock, getStock, getAllStocks, updateStock};