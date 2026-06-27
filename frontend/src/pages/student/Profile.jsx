import { useState, useEffect } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
    experience: "",
    skills: "",
    resume: null
  });

  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("studentProfile")) || null;

    if (saved) {
      setProfile(saved);
      setFileName(saved.resumeName || "");
    }
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // FILE UPLOAD HANDLER
  const handleFile = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setProfile({
      ...profile,
      resume: file,
      resumeName: file.name
    });

    setFileName(file.name);
  };

  const saveProfile = (e) => {
    e.preventDefault();

    const dataToSave = {
      ...profile,
      resumeName: fileName
    };

    localStorage.setItem(
      "studentProfile",
      JSON.stringify(dataToSave)
    );

    alert("Profile saved successfully!");
  };

  return (
    <div className="container mt-4">

      <h3>My Profile</h3>
      <p className="text-muted">
        Complete your profile before applying for jobs
      </p>

      <form className="card p-4 shadow" onSubmit={saveProfile}>

        <input
          className="form-control mb-2"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Full Name"
        />

        <input
          className="form-control mb-2"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          className="form-control mb-2"
          name="mobile"
          value={profile.mobile}
          onChange={handleChange}
          placeholder="Mobile Number"
        />

        <input
          className="form-control mb-2"
          name="location"
          value={profile.location}
          onChange={handleChange}
          placeholder="Location"
        />

        <input
          className="form-control mb-2"
          name="experience"
          value={profile.experience}
          onChange={handleChange}
          placeholder="Experience"
        />

        <input
          className="form-control mb-2"
          name="skills"
          value={profile.skills}
          onChange={handleChange}
          placeholder="Skills"
        />

        {/* RESUME UPLOAD */}
        <div className="mb-3">

          <label className="form-label fw-bold">
            Upload Resume (PDF / DOC)
          </label>

          <input
            type="file"
            className="form-control"
            accept=".pdf,.doc,.docx"
            onChange={handleFile}
          />

          {fileName && (
            <small className="text-success">
              Selected file: {fileName}
            </small>
          )}

        </div>

        <button className="btn btn-primary w-100">
          Save Profile
        </button>

      </form>

    </div>
  );
}

export default Profile;