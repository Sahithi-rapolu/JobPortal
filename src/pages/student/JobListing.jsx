import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jobsData from "../../data/jobs";

function Jobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const recruiterJobs =
      JSON.parse(localStorage.getItem("postedJobs")) || [];

    // Merge default + recruiter jobs
    const allJobs = [...jobsData, ...recruiterJobs];

    setJobs(allJobs);
  }, []);

  const applyJob = (job) => {
    let existing =
      JSON.parse(localStorage.getItem("applications")) || [];

    const alreadyApplied = existing.find(
      (j) => j.id === job.id
    );

    if (alreadyApplied) {
      alert("You have already applied for this job!");
      return;
    }

    existing.push(job);
    localStorage.setItem("applications", JSON.stringify(existing));

    alert("Applied successfully!");
  };

  return (
    <div className="container mt-4">

      <h3>Available Jobs</h3>
      <p className="text-muted">
        Explore all latest job opportunities
      </p>

      <div className="row">

        {jobs.map((job) => (
          <div className="col-md-4 mb-3" key={job.id}>

            <div
              className="card shadow p-3 h-100"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/jobs/${job.id}`)}
            >

              <h5>{job.title}</h5>
              <h6 className="text-primary">{job.company}</h6>

              <p className="mb-1">
                <b>Location:</b> {job.location}
              </p>

              <p className="mb-1">
                <b>Salary:</b> {job.salary}
              </p>

              <p className="text-muted small">
                {job.description}
              </p>

              <button
                className="btn btn-success btn-sm mt-auto"
                onClick={(e) => {
                  e.stopPropagation(); // prevents opening details page
                  applyJob(job);
                }}
              >
                Apply
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Jobs;