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
import DoctorAppointmentDetailsPage from "../Pages/Doctor/DoctorAppointmentDetailsPage";
import AdminMedicinePage from "../Pages/Admin/AdminMedicinePage";
import NotFoundPage from "../Pages/Patient/NotFoundPage";
import AdminInventoryPage from "../Pages/Admin/AdminInventoryPage";
import AdminSalesPage from "../Pages/Admin/AdminSalesPage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} >
                    <Route path="dashboard" element={<Random />} />
                    <Route path="medicine" element={<AdminMedicinePage />} />
                    <Route path="inventory" element={<AdminInventoryPage />} />
                    <Route path="sales" element={<AdminSalesPage />} />
                    <Route path="patients" element={<Random />} />
                    <Route path="doctors" element={<Random />} />

                </Route>
                <Route path="/doctor" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} >
                    <Route path="dashboard" element={<Random />} />
                    <Route path="profile" element={<DoctorProfilePage />} />
                    <Route path="pharmacy" element={<Random />} />
                    <Route path="appointments" element={<DoctorAppointmentPage />} /> 
                    <Route path="appointments/:id" element={<DoctorAppointmentDetailsPage />} /> 
                    <Route path="patients" element={<Random />} />
                    <Route path="doctors" element={<Random />} />

                </Route>

                <Route path="/patient" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>} >
                    <Route path="dashboard" element={<Random />} />
                    <Route path="profile" element={<PatientProfilePage />} />
                    <Route path="appointments" element={<PatientAppointmentPage />} /> 

                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;