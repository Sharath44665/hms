import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header"; 
import Sidebar from "../Components/Patient/Sidebar/Sidebar";

const PatientDashboard = () => {
    return (
         <div className="flex">
                <Sidebar />
                <div className="w-full overflow-hidden flex flex-col"> 
                    <Header />
                    <Outlet />
                </div>
            </div>
    )
}

export default PatientDashboard;