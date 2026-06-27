// src/components/common/JobCard.jsx
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaBriefcase, FaUsers } from 'react-icons/fa';

const JobCard = ({ job }) => {
  return (
    <div className="card h-100 border-0 shadow-sm hover-shadow transition">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title fw-bold mb-0">{job.title}</h5>
          <span className={`badge bg-${job.jobType === 'Remote' ? 'success' : 'primary'}`}>
            {job.jobType}
          </span>
        </div>
        
        <h6 className="card-subtitle text-muted mb-3">{job.company}</h6>
        
        <div className="d-flex flex-wrap gap-2 mb-3">
          <span className="badge bg-light text-dark">
            <FaMapMarkerAlt className="me-1" /> {job.location}
          </span>
          <span className="badge bg-light text-dark">
            <FaBriefcase className="me-1" /> {job.experience}
          </span>
          {job.salary && (
            <span className="badge bg-light text-dark">
              💰 {job.salary}
            </span>
          )}
        </div>
        
        <div className="mb-3">
          {job.skills?.slice(0, 4).map((skill, index) => (
            <span key={index} className="badge bg-primary bg-opacity-10 text-primary me-1 mb-1">
              {skill}
            </span>
          ))}
          {job.skills?.length > 4 && (
            <span className="badge bg-secondary bg-opacity-10 text-secondary">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
        
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            <FaClock className="me-1" /> {new Date(job.createdAt).toLocaleDateString()}
          </small>
          <Link 
            to={`/student/jobs/${job._id}`} 
            className="btn btn-primary btn-sm"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;