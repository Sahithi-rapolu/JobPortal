// src/pages/recruiter/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jobAPI, userAPI } from "../../services/api";

function RecruiterHome({ user }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await userAPI.getRecruiterStats();
      setStats(response.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Welcome Recruiter {user?.name || ''}! 🏢</h3>
      <p className="text-muted">
        Manage your jobs and track applicants easily.
      </p>

      {loading ? (
        <div className="text-center py-5">Loading stats...</div>
      ) : (
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card shadow p-3">
              <h5>Total Jobs Posted</h5>
              <h2>{stats?.totalJobs || 0}</h2>
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
              <h5>Active Jobs</h5>
              <h2>{stats?.activeJobs || 0}</h2>
              <Link
                to="/recruiter/manage-jobs"
                className="btn btn-dark btn-sm mt-2"
              >
                View Active
              </Link>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-3">
              <h5>Total Applications</h5>
              <h2>{stats?.totalApplications || 0}</h2>
              <Link
                to="/recruiter/applicants"
                className="btn btn-dark btn-sm mt-2"
              >
                View Applicants
              </Link>
            </div>
          </div>

          <div className="col-md-12 mt-4">
            <div className="card shadow p-3 text-center">
              <h5>Post New Job</h5>
              <p>Create a new job listing</p>
              <Link
                to="/recruiter/post-job"
                className="btn btn-primary"
              >
                📝 Post Job
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecruiterHome;