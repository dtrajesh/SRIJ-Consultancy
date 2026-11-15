import NotFoundPage from "./pages/NotFoundPage";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminHrContactsPage from "./pages/AdminHrContactsPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import CareerApplyPage from "./pages/CareerApplyPage";
import CareerInternalPage from "./pages/CareerInternalPage";
import CareerTalentProfilePage from "./pages/CareerTalentProfilePage";
import CareersPage from "./pages/CareersPage";
import HomePage from "./pages/HomePage";
import SolutionsPage from "./pages/SolutionsPage";
import { siteConfig } from "./config/siteConfig";
import ServicesPage from "./pages/ServicesPage";
import TechnologiesPage from "./pages/TechnologiesPage";
import IndustriesPage from "./pages/IndustriesPage";
import AboutPage from "./pages/AboutPage";
import GetStartedPage from "./pages/GetStartedPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/hr-contacts"
        element={
          <ProtectedRoute>
            <AdminHrContactsPage />
          </ProtectedRoute>
        }
      />
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/our-innovations" element={siteConfig.showSolutions ? <SolutionsPage /> : <Navigate to="/services" replace />} />
        <Route path="/solutions" element={<Navigate to="/our-innovations" replace />} />
        <Route path="/accelerators" element={<Navigate to="/our-innovations" replace />} />
        <Route path="/products" element={<Navigate to="/our-innovations" replace />} />
        <Route path="/our-expertise" element={<TechnologiesPage />} />
        <Route path="/technologies" element={<Navigate to="/our-expertise" replace />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/internal" element={<CareerInternalPage />} />
        <Route path="/careers/:jobId/apply" element={<CareerApplyPage />} />
        <Route path="/careers/talent-profile" element={<CareerTalentProfilePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Navigate to="/get-started" replace />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
