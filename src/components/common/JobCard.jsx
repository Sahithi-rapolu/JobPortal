function JobCard({ job, onApply, onDelete }) {
  return (
    <div className="card shadow p-3 mb-3">

      <h5>{job.title}</h5>
      <h6 className="text-primary">{job.company}</h6>

      <p>{job.location}</p>
      <p>{job.salary}</p>
      <p className="text-muted">{job.description}</p>

      <div className="d-flex gap-2">

        {onApply && (
          <button
            className="btn btn-success btn-sm"
            onClick={() => onApply(job)}
          >
            Apply
          </button>
        )}

        {onDelete && (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(job.id)}
          >
            Delete
          </button>
        )}

      </div>

    </div>
  );
}

export default JobCard;