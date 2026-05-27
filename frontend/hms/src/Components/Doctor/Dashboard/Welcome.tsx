import { Avatar } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserProfile } from "../../../Service/UserService";
import useProtectedImage from "../../Utilities/Dropzone/useProtectedImage";
import { getDoctor } from "../../../Service/DoctorProfileService";

const Welcome = () => {
    const user = useSelector((state: any) => state.user)
    const [picId, setPicId] = useState<string | null>(null)
    const [doctorInfo, setDoctorInfo] = useState<any>({})

    useEffect(() => {
        if (!user) return;
        getUserProfile(user.id).then((data) => {
            setPicId(data);
        }).catch((error) => {
            console.log(error);
        })
        getDoctor(user.profileId).then((data) =>{
            setDoctorInfo(data)
            console.log(data)
        }).catch((error)=>{
            console.log(error)
        })
    }, [])

    const url = useProtectedImage(picId);
    return (
        <div className="p-5 border shadow-sm rounded-xl bg-blue-50 flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <div>
                    <div> Welcome Back </div>
                    <div className="text-3xl font-semibold text-blue-600">{user.name} ! </div>
                    <div className="text-sm">{doctorInfo.specialization}, {doctorInfo.department}</div>
                </div>
                <Avatar src={url} variant='filled' alt="it's me" size={100} />
            </div>
            <div className="flex gap-5">
                <div className="p-3 rounded-xl bg-violet-200">
                    <div className="text-sm" >Appointments</div>
                    <div className="text-lg font-semibold text-violet-600" >120+</div>
                </div>
                <div className="p-3 rounded-xl bg-orange-200">
                    <div className="text-sm" >Patients</div>
                    <div className="text-lg font-semibold text-orange-600" >40+</div>
                </div>
            </div>
        </div>
    )
}

export default Welcome;