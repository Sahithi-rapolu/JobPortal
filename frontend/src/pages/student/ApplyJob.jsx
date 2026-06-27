import { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

function ApplyJob() {
  const [resume, setResume] = useState(null);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
    experience: "",
    coverLetter: ""
  });

  // Load saved profile automatically
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("studentProfile")) || null;

    if (saved) {
      setProfile({
        name: saved.name || "",
        email: saved.email || "",
        mobile: saved.mobile || "",
        location: saved.location || "",
        experience: saved.experience || "",
        coverLetter: ""
      });
    }
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    if (!profile.name || !profile.email) {
      alert("Please complete your profile first.");
      return;
    }

    const existing =
      JSON.parse(localStorage.getItem("applications")) || [];

    const newApplication = {
      id: Date.now(),
      name: profile.name,
      email: profile.email,
      mobile: profile.mobile,
      location: profile.location,
      experience: profile.experience,
      coverLetter: profile.coverLetter,
      resume: resume ? resume.name : null,
      appliedAt: new Date().toLocaleDateString()
    };

    existing.push(newApplication);
    localStorage.setItem("applications", JSON.stringify(existing));

    alert("Application Submitted Successfully!");
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="card shadow p-4">

          <h2 className="mb-3">Apply for Job</h2>
          <p className="text-muted">
            Your profile details are auto-filled from saved profile
          </p>

          <form onSubmit={submit}>

            {/* NAME */}
            <input
              className="form-control mb-2"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />

            {/* EMAIL */}
            <input
              className="form-control mb-2"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />

            {/* PHONE */}
            <input
              className="form-control mb-2"
              name="mobile"
              value={profile.mobile}
              onChange={handleChange}
              placeholder="Phone Number"
            />

            {/* LOCATION */}
            <input
              className="form-control mb-2"
              name="location"
              value={profile.location}
              onChange={handleChange}
              placeholder="Location"
            />

            {/* EXPERIENCE */}
            <input
              className="form-control mb-2"
              name="experience"
              value={profile.experience}
              onChange={handleChange}
              placeholder="Experience"
            />

            {/* RESUME UPLOAD */}
            <div className="mb-3">
              <label className="form-label fw-bold">
                Upload Resume (optional override)
              </label>

              <input
                type="file"
                className="form-control"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
              />

              {resume && (
                <small className="text-success">
                  Selected: {resume.name}
                </small>
              )}
            </div>

            {/* COVER LETTER */}
            <textarea
              rows="4"
              className="form-control mb-3"
              name="coverLetter"
              value={profile.coverLetter}
              onChange={handleChange}
              placeholder="Cover Letter"
            />

            <button className="btn btn-success w-100">
              Submit Application
            </button>

          </form>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default ApplyJob;