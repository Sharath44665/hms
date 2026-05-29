import { IconClock, IconCoinRupee, IconPhone, IconUserHeart } from "@tabler/icons-react"
import { formatDate } from "../../../Utility/DateUtility"

const SaleCard = ({ buyerContact, saleDate, buyerName, totalAmount, onView  }: any) => {
    
    return (
        <div onClick={onView} className="border p-4 flex flex-col gap-2 hover:bg-primary-50 transition duration-300 ease-in-out rounded-xl  hover:shadow-[0_0_5px_1px_blue] !shadow-primary-500 cursor-pointer space-y-2 ">

            <div className="flex text-xs items-center gap-3">
                <IconUserHeart className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{buyerName} </div>
            </div>

            <div className="flex text-xs items-center gap-3">
                <IconPhone className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>+91 {buyerContact}</div>
            </div>

            <div className="flex text-xs items-center gap-3">
                <IconCoinRupee className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{totalAmount}</div>
            </div>

            <div className="flex text-xs items-center gap-3">
                <IconClock className="text-xs text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{formatDate(saleDate)}</div>
            </div> 
        </div>
    )
}

export default SaleCard

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