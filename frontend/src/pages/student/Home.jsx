// src/pages/student/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jobAPI } from "../../services/api";
import JobCard from "../../components/common/JobCard";

function StudentHome({ user }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await jobAPI.getJobs({ limit: 6 });
      setJobs(response.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-primary text-white text-center py-5 rounded">
        <div className="container">
          <h1 className="display-4 fw-bold">Find Your Dream Job</h1>
          <p className="lead">5000+ Companies Hiring</p>
          <input
            className="form-control w-50 mx-auto mt-4"
            placeholder="Search Jobs..."
          />
        </div>
      </div>

      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Featured Jobs</h2>
          <Link to="/student/jobs" className="btn btn-outline-primary">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-5">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-5">
            <p>No jobs available at the moment.</p>
          </div>
        ) : (
          <div className="row">
            {jobs.map((job) => (
              <div className="col-lg-4 mb-4" key={job._id}>
                <JobCard job={job} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default StudentHome;