import Random from "../Components/Random";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminDashboard from "../Layout/AdminDashboard";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import PatientDashboard from "../Layout/PatientDashboard";
import PatientProfilePage from "../Pages/Patient/PatientProfilePage";
import DoctorDashboard from "../Layout/DoctorDashboard";
import DoctorProfilePage from "../Pages/Doctor/DoctorProfilePage";
import PatientAppointmentPage from "../Pages/Patient/PatientAppointmentPage";
import DoctorAppointmentPage from "../Pages/Doctor/DoctorAppointmentPage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
                <Route path="/" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} >
                    <Route path="/dashboard" element={<Random />} />
                    <Route path="/pharmacy" element={<Random />} />
                    <Route path="/patients" element={<Random />} />
                    <Route path="/doctors" element={<Random />} />

                </Route>
                <Route path="/doctor" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} >
                    <Route path="dashboard" element={<Random />} />
                    <Route path="profile" element={<DoctorProfilePage />} />
                    <Route path="pharmacy" element={<Random />} />
                    <Route path="appointments" element={<DoctorAppointmentPage />} /> 
                    <Route path="patients" element={<Random />} />
                    <Route path="doctors" element={<Random />} />

                </Route>

                <Route path="/patient" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>} >
                    <Route path="dashboard" element={<Random />} />
                    <Route path="profile" element={<PatientProfilePage />} />
                    <Route path="appointments" element={<PatientAppointmentPage />} /> 

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;