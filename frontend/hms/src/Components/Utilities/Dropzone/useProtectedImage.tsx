import { useEffect, useState } from "react"
import axiosInstance from "../../../Interceptor/AxiosInterceptor";

const useProtectedImage = (imageId?: string | null) =>{
    const [imageUrl, setImageUrl] = useState<string>("/avatar");
    useEffect(()=>{
        if(!imageId) return;
        axiosInstance.get('/media/'+imageId,{responseType:'blob'})
            .then((response)=>{
                console.log(response);
                const url = URL.createObjectURL(response.data);
                setImageUrl(url);
            })
            .catch((error) => {
                console.error("Error fetching protected image"+error);
            })
    }, [imageId]);

    return imageUrl;
}

export default useProtectedImage;