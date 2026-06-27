import { useState, useEffect } from "react";

function ManageJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("postedJobs")) || [];
    setJobs(data);
  }, []);

  const deleteJob = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);

    setJobs(updatedJobs);
    localStorage.setItem("postedJobs", JSON.stringify(updatedJobs));

    alert("Job deleted");
  };

  return (
    <div className="container mt-4">

      <h3>Manage Jobs</h3>

      {jobs.length === 0 ? (
        <p className="text-muted">No jobs posted yet</p>
      ) : (
        <div className="row">

          {jobs.map((job) => (
            <div className="col-md-4 mb-3" key={job.id}>

              <div className="card shadow p-3">

                <h5>{job.title}</h5>
                <h6 className="text-primary">{job.company}</h6>

                <p>{job.location}</p>
                <p>{job.salary}</p>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteJob(job.id)}
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default ManageJobs;