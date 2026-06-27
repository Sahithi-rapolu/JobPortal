import { useNavigate } from "react-router-dom";
function Navbar({ role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("applications");
    localStorage.removeItem("postedJobs");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-primary px-4">

      <span className="navbar-brand">
        Job Portal
      </span>

      <button
        className="btn btn-outline-light btn-sm"
        onClick={handleLogout}
      >
        Logout
      </button>

    </nav>
  );
}

export default Navbar;