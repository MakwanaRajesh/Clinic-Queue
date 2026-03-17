import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login/login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Admin/Users";
import MyClinic from "./pages/Admin/MyClinic";

import PatientDashboard from "./pages/Patient/PatientDashboard";
import BookAppointment from "./pages/Patient/BookAppointment";
import MyAppointments from "./pages/Patient/MyAppointments";
import MyPrescriptions from "./pages/Patient/MyPrescriptions";
import MyReports from "./pages/Patient/MyReports";

import DoctorQueue from "./pages/Doctor/TodayQueue";
import AddPrescription from "./pages/Doctor/AddPrescription";
import AddReport from "./pages/Doctor/AddReport";

import QueueManage from "./pages/Receptionist/QueueManage";
import TvDisplay from "./pages/Receptionist/TvDisplay";

// check auth
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

// protected route
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<PrivateRoute><MyClinic /></PrivateRoute>} />
        <Route path="/admin/clinic" element={<PrivateRoute><MyClinic /></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute><Users /></PrivateRoute>} />

        {/* PATIENT */}
        <Route path="/patient/dashboard" element={<PrivateRoute><PatientDashboard /></PrivateRoute>} />
        <Route path="/patient/book" element={<PrivateRoute><BookAppointment /></PrivateRoute>} />
        <Route path="/patient/appointments" element={<PrivateRoute><MyAppointments /></PrivateRoute>} />
        <Route path="/patient/prescriptions" element={<PrivateRoute><MyPrescriptions /></PrivateRoute>} />
        <Route path="/patient/reports" element={<PrivateRoute><MyReports /></PrivateRoute>} />

        {/* DOCTOR */}
        <Route path="/doctor/dashboard" element={<PrivateRoute><DoctorQueue /></PrivateRoute>} />
        <Route path="/doctor/queue" element={<PrivateRoute><DoctorQueue /></PrivateRoute>} />
        <Route path="/doctor/prescription" element={<PrivateRoute><AddPrescription /></PrivateRoute>} />
        <Route path="/doctor/report" element={<PrivateRoute><AddReport /></PrivateRoute>} />

        {/* RECEPTIONIST */}
        <Route path="/receptionist/dashboard" element={<PrivateRoute><QueueManage /></PrivateRoute>} />
        <Route path="/receptionist/queue" element={<PrivateRoute><QueueManage /></PrivateRoute>} />
        <Route path="/receptionist/tv" element={<PrivateRoute><TvDisplay /></PrivateRoute>} />

        {/* Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
