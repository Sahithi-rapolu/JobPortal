import { useState, useEffect } from "react";

function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("applications")) || [];
    setApplications(data);
  }, []);

  return (
    <div className="container mt-4">

      <h3>My Applications</h3>

      {applications.length === 0 ? (
        <p className="text-muted">No applications yet</p>
      ) : (
        <div className="row">

          {applications.map((job, index) => (
            <div className="col-md-4 mb-3" key={index}>

              <div className="card shadow p-3">

                <h5>{job.title}</h5>
                <h6>{job.company}</h6>
                <p>{job.location}</p>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Applications;