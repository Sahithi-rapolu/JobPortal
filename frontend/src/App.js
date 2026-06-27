// frontend/src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Auth Pages - paths remain the same relative to src/
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Student Pages
import StudentLayout from "./pages/student/StudentLayout";
import StudentHome from "./pages/student/Home";
import JobListing from "./pages/student/JobListing";
import JobDetails from "./pages/student/JobDetails";
import MyApplications from "./pages/student/MyApplications";
import Profile from "./pages/student/Profile";

// Recruiter Pages
import RecruiterLayout from "./pages/recruiter/RecruiterLayout";
import RecruiterHome from "./pages/recruiter/Home";
import PostJob from "./pages/recruiter/PostJob";
import ManageJobs from "./pages/recruiter/ManageJobs";
import ViewApplicants from "./pages/recruiter/ViewApplicants";

// Services
import { authAPI } from "./services/api";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          const response = await authAPI.getCurrentUser();
          setUser(response.user);
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* AUTH ROUTES - Public */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* STUDENT ROUTES - Protected */}
      <Route 
        path="/student" 
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentLayout user={user} setUser={setUser} />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<StudentHome user={user} />} />
        <Route path="jobs" element={<JobListing user={user} />} />
        <Route path="jobs/:id" element={<JobDetails user={user} />} />
        <Route path="applications" element={<MyApplications user={user} />} />
        <Route path="profile" element={<Profile user={user} setUser={setUser} />} />
      </Route>

      {/* RECRUITER ROUTES - Protected */}
      <Route 
        path="/recruiter" 
        element={
          <ProtectedRoute allowedRoles={['recruiter']}>
            <RecruiterLayout user={user} setUser={setUser} />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<RecruiterHome user={user} />} />
        <Route path="post-job" element={<PostJob user={user} />} />
        <Route path="manage-jobs" element={<ManageJobs user={user} />} />
        <Route path="applicants" element={<ViewApplicants user={user} />} />
        <Route path="applicants/:jobId" element={<ViewApplicants user={user} />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;