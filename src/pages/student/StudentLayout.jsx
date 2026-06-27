import { Link, Outlet, useNavigate } from "react-router-dom";

function StudentLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="d-flex">

      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: "220px", minHeight: "100vh" }}>

        <h4>Student</h4>

        <Link className="d-block text-white mt-3" to="/student/home">Home</Link>
        <Link className="d-block text-white mt-2" to="/student/jobs">Jobs</Link>
        <Link className="d-block text-white mt-2" to="/student/applications">Applications</Link>
        <Link className="d-block text-white mt-2" to="/student/profile">Profile</Link>

      </div>

      {/* Main */}
      <div className="w-100">

        {/* Navbar */}
        <div className="bg-primary text-white p-2 d-flex justify-content-between">
          <h5 className="m-0">Student Dashboard</h5>
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

export default StudentLayout;