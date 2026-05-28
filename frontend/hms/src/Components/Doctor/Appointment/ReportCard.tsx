import { IconClock, IconNote, IconQuestionMark, IconUserHeart } from "@tabler/icons-react"
import { formatDate } from "../../../Utility/DateUtility"

const ReportCard = ({ id, appointmentId, doctorName, notes, createdAt, diagnosis }: any) => {
    

    return (
        <div className="border p-4 flex flex-col gap-2 hover:bg-primary-50 transition duration-300 ease-in-out rounded-xl  hover:shadow-[0_0_5px_1px_blue] !shadow-primary-500 cursor-pointer space-y-2 ">

            <div className="flex text-xs items-center gap-3">
                <IconUserHeart className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{doctorName}</div>
            </div>

            <div className="flex text-xs items-center gap-3">
                <IconQuestionMark className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{diagnosis}</div>
            </div>

            <div className="flex text-xs items-center gap-3">
                <IconClock className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{formatDate(createdAt)}</div>
            </div> 

            {/* <div className="flex text-xs items-center gap-3">
                <IconMedicineSyrup className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div className="flex gap-2 items-center">{medicines.length} <Button size="compact-xs" onClick={()=> handleMedicine(medicines)}>View Medicines</Button> </div>
            </div> */}

            {notes && <div className="flex text-xs items-center gap-3">
                <IconNote className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div> {notes}</div>
            </div>} 
        </div>
    )
}

export default ReportCard

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