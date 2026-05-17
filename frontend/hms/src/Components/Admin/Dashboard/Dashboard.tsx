import Appointments from "./Appointment";
import DiseaseChart from "./DiseaseChart";
import Doctors from "./Doctors";
import Medicines from "./Medicines";
import Patients from "./Patients";
import Topcards from "./Topacards";

const Dashboard = () => {
    return (
        <div className="flex flex-col gap-5">
            <Topcards />
            <div className="grid grid-cols-3 gap-5">
                <DiseaseChart />
                <Appointments />
                <Medicines />
            </div>
            <div className="grid grid-cols-2 gap-5">
                <Patients />
                <Doctors />
            </div>
        </div>
    )
}

export default Dashboard;