import { Routes, Route } from "react-router-dom";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Student
import StudentLayout from "./pages/student/StudentLayout";
import StudentHome from "./pages/student/Home";
import JobListing from "./pages/student/JobListing";
import JobDetails from "./pages/student/JobDetails";
import MyApplications from "./pages/student/MyApplications";
import Profile from "./pages/student/Profile";

// Recruiter
import RecruiterLayout from "./pages/recruiter/RecruiterLayout";
import RecruiterHome from "./pages/recruiter/Home";
import PostJob from "./pages/recruiter/PostJob";
import ManageJobs from "./pages/recruiter/ManageJobs";
import ViewApplicants from "./pages/recruiter/ViewApplicants";

function App() {
  return (
    <Routes>

      {/* AUTH */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* STUDENT */}
      <Route path="/student" element={<StudentLayout />}>
        <Route path="home" element={<StudentHome />} />
        <Route path="jobs" element={<JobListing />} />
        <Route path="jobs/:id" element={<JobDetails />} />
        <Route path="applications" element={<MyApplications />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* RECRUITER */}
      <Route path="/recruiter" element={<RecruiterLayout />}>
        <Route path="home" element={<RecruiterHome />} />
        <Route path="post-job" element={<PostJob />} />
        <Route path="manage-jobs" element={<ManageJobs />} />
        <Route path="applicants" element={<ViewApplicants />} />
      </Route>

    </Routes>
  );
}

export default App;