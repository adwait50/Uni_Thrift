import React from "react";

import { Route, Routes } from "react-router";
import StudentLogin from "./pages/StudentLogin";
import LandingPage from "./pages/LandingPage";
import TenantLogin from "./pages/TenantLogin";
import TenantDashboard from "./pages/TenantDashboard";
import StudentSignup from "./pages/StudentSignup";
import ForgotPassword from "./pages/ForgotPassword";
import TenantSignup from "./pages/TenantSignup";
import TenantForgotpassword from "./pages/TenantForgotpassword";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-signup" element={<StudentSignup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/tenant-login" element={<TenantLogin />} />
        <Route path="/tenant-signup" element={<TenantSignup />} />
        <Route
          path="/tenant-forgot-password"
          element={<TenantForgotpassword />}
        />
      </Routes>
    </div>
  );
}

export default App;
