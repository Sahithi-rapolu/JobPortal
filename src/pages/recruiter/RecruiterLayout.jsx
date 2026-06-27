import { Link, Outlet, useNavigate } from "react-router-dom";

function RecruiterLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="d-flex">

      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: "220px", minHeight: "100vh" }}>

        <h4>Recruiter</h4>

        <Link className="d-block text-white mt-3" to="/recruiter/home">Home</Link>
        <Link className="d-block text-white mt-2" to="/recruiter/post-job">Post Job</Link>
        <Link className="d-block text-white mt-2" to="/recruiter/manage-jobs">Manage Jobs</Link>
        <Link className="d-block text-white mt-2" to="/recruiter/applicants">Applicants</Link>

      </div>

      {/* Main */}
      <div className="w-100">

        <div className="bg-dark text-white p-2 d-flex justify-content-between">
          <h5 className="m-0">Recruiter Dashboard</h5>
          <button className="btn btn-light btn-sm" onClick={logout}>
            Logout
          </button>
        </div>

        <div className="p-3">
          <Outlet />
        </div>

      </div>

    </div>
  );
}

export default RecruiterLayout;