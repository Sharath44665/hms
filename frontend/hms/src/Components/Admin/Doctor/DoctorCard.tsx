import { Avatar } from "@mantine/core"
import { formatDate } from "../../../Utility/DateUtility"

const DoctorCard = ({ name, email, dob, phone, id, address, aadharNo, totalExp, department, specilaization }: any) => {
    return (
        <div className="border p-3 flex flex-col gap-2 rounded-lg shadow-sm hover:shadow-md cursor-pointer space-y-2 ">
            <div className="flex items-center gap-3 ">

                <Avatar name={name} color="initials" variant="filled" />
                <div>{name}</div>
            </div>

            <div className="flex justify-between text-sm items-center gap-3 ">
                <div className="text-gray-600" >Email: </div>
                <div>{email}</div>
            </div>

            <div className="flex justify-between text-sm items-center gap-3 ">
                <div className="text-gray-600" >Date of Birth: </div>
                <div>{formatDate(dob)}</div>
            </div>

            <div className="flex justify-between text-sm items-center gap-3 ">
                <div className="text-gray-600" >Phone: </div>
                <div>{phone}</div>
            </div>

            <div className="flex justify-between text-sm items-center gap-3 ">
                <div className="text-gray-600" >Address: </div>
                <div>{address}</div>
            </div>

            <div className="flex justify-between text-sm items-center gap-3 ">
                <div className="text-gray-600" >Department: </div>
                <div>{department}</div>
            </div>

            <div className="flex justify-between text-sm items-center gap-3 ">
                <div className="text-gray-600" >Specialization: </div>
                <div>{specilaization}</div>
            </div>

            <div className="flex justify-between text-sm items-center gap-3 ">
                <div className="text-gray-600" >Total Experience: </div>
                <div>{totalExp} Years</div>
            </div>
        </div>
    )
}

export default DoctorCard

/*
aadharNo: null
address: null
allergies: null
bloodGroup: null
chronicDesease: null 
dob: null 
email: "diya@ex.com" 
id: 1 
name: "Diya" 
phone: null
*/