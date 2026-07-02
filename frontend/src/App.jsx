import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Process from "./pages/Process";
import Contact from "./pages/Contact";

// Admin Imports
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ProjectsManager from "./admin/pages/ProjectsManager";
import ContactManager from "./admin/pages/ContactManager";
import TestimonialManager from "./admin/pages/TestimonialManager";
import WebsiteSettings from "./admin/pages/WebsiteSettings";
import ProtectedRoute from "./admin/ProtectedRoute";

function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Hide main navigation header/footer on admin routes */}
      {!isAdminPath && <Navbar />}

      <Routes>
        {/* Client Website Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/process" element={<Process />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Authentication Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Dashboard Panel Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <ProjectsManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contacts"
          element={
            <ProtectedRoute>
              <ContactManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/testimonials"
          element={
            <ProtectedRoute>
              <TestimonialManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <WebsiteSettings />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isAdminPath && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;