import { Link } from "react-router-dom";

function Sidebar({ role }) {
  return (
    <div className="bg-dark text-white p-3" style={{ minHeight: "100vh", width: "220px" }}>

      <h5>Dashboard</h5>

      {role === "student" ? (
        <>
          <Link className="d-block text-white mt-3" to="/student/jobs">Jobs</Link>
          <Link className="d-block text-white mt-2" to="/student/applications">Applications</Link>
          <Link className="d-block text-white mt-2" to="/student/profile">Profile</Link>
        </>
      ) : (
        <>
          <Link className="d-block text-white mt-3" to="/recruiter/post-job">Post Job</Link>
          <Link className="d-block text-white mt-2" to="/recruiter/manage-jobs">Manage Jobs</Link>
          <Link className="d-block text-white mt-2" to="/recruiter/applicants">Applicants</Link>
        </>
      )}

    </div>
  );
}

export default Sidebar;