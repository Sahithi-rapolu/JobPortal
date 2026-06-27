import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // Role-based navigation
    if (role === "Student") {
      navigate("/student/home");
    } else {
      navigate("/recruiter/home");
    }
  };

  return (
    <div className="container-fluid p-0">

      <div className="row g-0" style={{ minHeight: "100vh" }}>

        {/* LEFT SIDE */}
        <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center bg-primary text-white">

          <h1 className="fw-bold display-3">Job Portal</h1>

          <p className="text-center px-4 mt-3">
            Find your dream job or hire the perfect candidate with ease.
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-6 d-flex justify-content-center align-items-center p-4">

          <div
            className="card shadow p-4 w-100"
            style={{ maxWidth: "420px", borderRadius: "12px" }}
          >

            <h3 className="text-center mb-1">Welcome Back 👋</h3>
            <p className="text-center text-muted mb-4">
              Login to continue
            </p>

            <form onSubmit={handleLogin}>

              {/* EMAIL */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* PASSWORD */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* ROLE SELECT */}
              <div className="mb-3">
                <label className="form-label">Login As</label>
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Student">Student</option>
                  <option value="Recruiter">Recruiter</option>
                </select>
              </div>

              {/* BUTTON */}
              <button className="btn btn-primary w-100">
                Login
              </button>

            </form>

            {/* LINKS */}
            <div className="text-center mt-3">

              <Link to="/forgot-password">Forgot Password?</Link>

              <div className="mt-2">
                Don’t have an account?{" "}
                <Link to="/register">Register</Link>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;