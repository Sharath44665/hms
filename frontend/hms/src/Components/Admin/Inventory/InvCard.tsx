import { IconMedicineSyrup, IconPill, IconPills, IconStack2, IconVaccine } from "@tabler/icons-react"
import { formatDate } from "../../../Utility/DateUtility"

const InvCard = ({ id, medicineId, quantity, initialQuantity, status, batchNo, expiryDate, medicineMap, onEdit }: any) => {

    return (
        <div onClick={onEdit} className="border p-4 flex flex-col gap-2 hover:bg-primary-50 transition duration-300 ease-in-out rounded-xl  hover:shadow-[0_0_5px_1px_blue] !shadow-primary-500 cursor-pointer space-y-2 ">

            <div className="flex text-xs items-center gap-3">
                <IconPill className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{medicineMap[medicineId]?.name} <span className="text-gray-500">({medicineMap[medicineId]?.manufacturer})</span> </div>
            </div>

            <div className="flex text-xs items-center gap-3">
                <IconPills className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div> {batchNo}</div>
            </div>

             <div className="flex text-xs items-center gap-3">
                <IconVaccine className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div> {formatDate(expiryDate)}</div>
            </div>

            <div className="flex text-xs items-center gap-3">
                <IconStack2 className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>Stock: {quantity}</div>
            </div>

            <div className="flex text-xs items-center gap-3">
                <IconMedicineSyrup className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{status}</div>
            </div>



        </div>
    )
}

export default InvCard

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