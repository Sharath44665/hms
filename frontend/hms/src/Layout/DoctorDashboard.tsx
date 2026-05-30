import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header"; 
import Sidebar from "../Components/Doctor/Sidebar/Sidebar";
import { useMediaQuery } from "@mantine/hooks";

const DoctorDashboard = () => {
    const matches = useMediaQuery('(max-width: 768px)');
    return (
         <div className="flex">
                {!matches && <Sidebar />}
                <div className="w-full overflow-hidden flex flex-col"> 
                    <Header />
                    <Outlet />
                </div>
            </div>
    )
}

export default DoctorDashboard;