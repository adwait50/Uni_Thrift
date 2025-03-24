import React from "react";

import { Route, Routes } from "react-router";
import StudentLogin from "./pages/StudentLogin";
import LandingPage from "./pages/LandingPage";
import TenantOtp from "./pages/TenantOtp";
import TenantDashboard from "./pages/TenantDashboard";
import StudentSignup from "./pages/StudentSignup";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-signup" element={<StudentSignup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
