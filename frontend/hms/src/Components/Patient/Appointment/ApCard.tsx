import { IconClock, IconEmergencyBed, IconNote, IconProgress, IconUserHeart } from "@tabler/icons-react"
import { formatDateWithtime } from "../../../Utility/DateUtility"
import { Tag } from "primereact/tag"

const ApCard = ({ id, doctorName, doctorId, notes, reason, status, appointmentTime }: any) => {

    const getSeverity = (status: string) => {
        switch (status) {
            case 'CANCELLED':
                return 'danger';

            case 'COMPLETED':
                return 'success';

            case 'SCHEDULED':
                return 'info';

            case 'negotiation':
                return 'warning';

            default:
                return null;
        }
    };

    return (
        <div className="border p-4 flex flex-col gap-2 hover:bg-primary-50 transition duration-300 ease-in-out rounded-xl  hover:shadow-[0_0_5px_1px_blue] !shadow-primary-500 cursor-pointer space-y-2 ">

            <div className="flex text-xs items-center gap-3">
                <IconUserHeart className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{doctorName}</div>
            </div>

            {/* <div className="flex justify-between text-xs items-center gap-3 ">
                <div className="text-gray-600" >Date of Birth: </div>
                <div>{formatDate(dob)}</div>
            </div> */}

            <div className="flex text-xs items-center gap-3">
                <IconNote className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div> {notes}</div>
            </div>

            <div className="flex text-xs items-center gap-3">
                <IconEmergencyBed className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{reason}</div>
            </div>
            <div className="flex text-xs items-center gap-3">
                <IconClock className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{formatDateWithtime(appointmentTime)}</div>
            </div>

            <div className="flex text-xs items-center gap-3">
                <IconProgress className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <Tag value={status} severity={getSeverity(status)} />
            </div>
        </div>
    )
}

export default ApCard

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