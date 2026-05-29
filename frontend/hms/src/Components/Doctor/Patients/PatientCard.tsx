import { Avatar, Divider } from "@mantine/core"
import { bloodGroupMap } from "../../../data/DropdownData"
import { IconCalendarHeart, IconMail, IconMapPin, IconPhone } from "@tabler/icons-react"

const PatientCard = ({ name, email, dob, phone, id, address, aadharNo, bloodGroup, allergies, chronicDesease }: any) => {
    const getAge = (dob:string) => {
        if (!dob) return "N/A";
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age.toString();
    }

    return (
        <div className="border p-4 flex flex-col gap-2 hover:bg-primary-50 transition duration-300 ease-in-out rounded-xl  hover:shadow-[0_0_5px_1px_blue] !shadow-primary-500 cursor-pointer space-y-2 ">
            <div className="flex items-center gap-3 ">

                <Avatar size="md" name={name} color="initials" variant="filled" />
                <div>

                    <div>{name}</div>
                    <div className="text-xs text-gray-400">
                        {bloodGroupMap[bloodGroup]} 
                    </div>
                </div>
            </div>
            <Divider />
            <div className="flex text-xs items-center gap-3">
                <IconMail className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{email}</div>
            </div>

            {/* <div className="flex justify-between text-xs items-center gap-3 ">
                <div className="text-gray-600" >Date of Birth: </div>
                <div>{formatDate(dob)}</div>
            </div> */}

            <div className="flex text-xs items-center gap-3">
                <IconPhone className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>+91 {phone}</div>
            </div>

            <div className="flex text-xs items-center gap-3">
                <IconMapPin className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{address}</div>
            </div>
            <div className="flex text-xs items-center gap-3">
                <IconCalendarHeart className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{getAge(dob)} Years</div>
            </div>

            {/* <div className="flex text-xs items-center gap-3">
                <IconBriefcase className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{totalExp} Years of Experience</div>
            </div> */}
        </div>
    )
}

export default PatientCard

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