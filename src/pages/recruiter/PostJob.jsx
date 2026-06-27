import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: ""
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    if (
      !job.title ||
      !job.company ||
      !job.location ||
      !job.salary ||
      !job.description
    ) {
      alert("Please fill all fields");
      return;
    }

    // get existing jobs
    let existingJobs =
      JSON.parse(localStorage.getItem("postedJobs")) || [];

    // add new job with ID
    const newJob = {
      id: Date.now(),
      ...job
    };

    existingJobs.push(newJob);

    localStorage.setItem("postedJobs", JSON.stringify(existingJobs));

    alert("Job Posted Successfully!");

    navigate("/recruiter/manage-jobs");
  };

  return (
    <div className="container mt-4">

      <h3>Post a New Job</h3>

      <form onSubmit={handleSubmit} className="card p-4 shadow mt-3">

        <input
          className="form-control mb-2"
          placeholder="Job Title"
          name="title"
          value={job.title}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          placeholder="Company"
          name="company"
          value={job.company}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          placeholder="Location"
          name="location"
          value={job.location}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          placeholder="Salary"
          name="salary"
          value={job.salary}
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Job Description"
          name="description"
          value={job.description}
          onChange={handleChange}
        />

        <button className="btn btn-dark w-100">
          Post Job
        </button>

      </form>

    </div>
  );
}

export default PostJob;