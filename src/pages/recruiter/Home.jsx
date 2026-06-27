import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RecruiterHome() {
  const [jobsCount, setJobsCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);

  useEffect(() => {
    const postedJobs =
      JSON.parse(localStorage.getItem("postedJobs")) || [];

    const applications =
      JSON.parse(localStorage.getItem("applications")) || [];

    setJobsCount(postedJobs.length);
    setApplicationsCount(applications.length);
  }, []);

  return (
    <div>

      <h3>Welcome Recruiter 🏢</h3>
      <p className="text-muted">
        Manage your jobs and track applicants easily.
      </p>

      {/* Stats Cards */}
      <div className="row mt-4">

        <div className="col-md-4">
          <div className="card shadow p-3">
            <h5>Total Jobs Posted</h5>
            <h2>{jobsCount}</h2>
            <Link
              to="/recruiter/manage-jobs"
              className="btn btn-dark btn-sm mt-2"
            >
              Manage Jobs
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-3">
            <h5>Total Applications</h5>
            <h2>{applicationsCount}</h2>
            <Link
              to="/recruiter/applicants"
              className="btn btn-dark btn-sm mt-2"
            >
              View Applicants
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-3">
            <h5>Post New Job</h5>
            <p>Create a new job listing</p>
            <Link
              to="/recruiter/post-job"
              className="btn btn-primary btn-sm"
            >
              Post Job
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}

export default RecruiterHome;