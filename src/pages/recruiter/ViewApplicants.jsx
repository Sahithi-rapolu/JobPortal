// src/pages/recruiter/ViewApplicants.jsx
import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { applicationAPI } from '../../services/api';
import { 
  FaArrowLeft, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarker, 
  FaFileAlt, 
  FaCheck, 
  FaTimes, 
  FaClock, 
  FaStar, 
  FaSpinner 
} from 'react-icons/fa';

const ViewApplicants = ({ user }) => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobTitle, setJobTitle] = useState('');
  const [stats, setStats] = useState({});

  const fetchApplications = useCallback(async () => {
    if (!jobId) return;
    
    try {
      const response = await applicationAPI.getJobApplications(jobId);
      setApplications(response.applications || []);
      if (response.applications?.length > 0) {
        setJobTitle(response.applications[0].job.title);
      }
      
      // Calculate stats
      const statusCounts = {};
      response.applications?.forEach(app => {
        statusCounts[app.status] = (statusCounts[app.status] || 0) + 1;
      });
      setStats(statusCounts);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await applicationAPI.updateApplicationStatus(applicationId, newStatus, '');
      setApplications(applications.map(app => 
        app._id === applicationId ? { ...app, status: newStatus } : app
      ));
      // Update stats
      const newStats = { ...stats };
      const oldStatus = applications.find(app => app._id === applicationId)?.status;
      if (oldStatus) {
        newStats[oldStatus] = (newStats[oldStatus] || 0) - 1;
        newStats[newStatus] = (newStats[newStatus] || 0) + 1;
        setStats(newStats);
      }
      alert('✅ Application status updated');
    } catch (error) {
      alert(error.message);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      reviewing: 'info',
      shortlisted: 'success',
      rejected: 'danger',
      accepted: 'success'
    };
    return colors[status] || 'secondary';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <FaClock />,
      reviewing: <FaSpinner />,
      shortlisted: <FaStar />,
      rejected: <FaTimes />,
      accepted: <FaCheck />
    };
    return icons[status] || <FaClock />;
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="view-applicants">
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/recruiter/manage-jobs" className="btn btn-outline-secondary">
          <FaArrowLeft />
        </Link>
        <div>
          <h2 className="mb-1">👥 Applicants for "{jobTitle || 'Job'}"</h2>
          <p className="text-muted">Review and manage candidate applications</p>
        </div>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h5 className="text-muted mb-1">Total</h5>
              <h2 className="mb-0 text-primary">{applications.length}</h2>
            </div>
          </div>
        </div>
        {Object.entries(stats).map(([status, count]) => (
          <div key={status} className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <h5 className="text-muted mb-1 text-capitalize">{status}</h5>
                <h2 className={`mb-0 text-${getStatusColor(status)}`}>{count}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-3" style={{ fontSize: '64px' }}>📭</div>
          <h4>No applications yet</h4>
          <p className="text-muted">Applications will appear here once candidates apply</p>
        </div>
      ) : (
        <div className="row g-3">
          {applications.map(app => (
            <div key={app._id} className="col-12">
              <div className="card border-0 shadow-sm hover-shadow transition">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="d-flex align-items-start gap-3">
                        <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                          <FaUser className="text-primary" size={24} />
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <h5 className="mb-0">{app.applicant?.name || 'Unknown'}</h5>
                            <span className={`badge bg-${getStatusColor(app.status)}`}>
                              {getStatusIcon(app.status)} {app.status?.toUpperCase()}
                            </span>
                          </div>
                          <div className="row g-2">
                            <div className="col-md-4">
                              <small className="text-muted d-block">
                                <FaEnvelope className="me-1" /> {app.applicant?.email || 'N/A'}
                              </small>
                            </div>
                            <div className="col-md-3">
                              <small className="text-muted d-block">
                                <FaPhone className="me-1" /> {app.applicant?.phone || 'N/A'}
                              </small>
                            </div>
                            <div className="col-md-3">
                              <small className="text-muted d-block">
                                <FaMapMarker className="me-1" /> {app.applicant?.location || 'N/A'}
                              </small>
                            </div>
                            <div className="col-md-2">
                              <small className="text-muted d-block">
                                Applied: {new Date(app.appliedDate).toLocaleDateString()}
                              </small>
                            </div>
                          </div>
                          
                          {app.applicant?.skills?.length > 0 && (
                            <div className="mt-2 d-flex flex-wrap gap-1">
                              {app.applicant.skills.map((skill, i) => (
                                <span key={i} className="badge bg-light text-dark">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}

                          {app.coverLetter && (
                            <div className="mt-2">
                              <button 
                                className="btn btn-link btn-sm p-0 text-decoration-none"
                                onClick={() => alert(app.coverLetter)}
                              >
                                📄 View Cover Letter
                              </button>
                            </div>
                          )}
                          
                          <div className="mt-2">
                            <a 
                              href={`/${app.resume}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="btn btn-outline-primary btn-sm"
                            >
                              <FaFileAlt className="me-1" /> View Resume
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mt-3 mt-md-0">
                      <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                        <button
                          onClick={() => handleStatusUpdate(app._id, 'reviewing')}
                          className="btn btn-outline-info btn-sm"
                        >
                          Review
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(app._id, 'shortlisted')}
                          className="btn btn-outline-success btn-sm"
                        >
                          <FaStar className="me-1" /> Shortlist
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(app._id, 'accepted')}
                          className="btn btn-success btn-sm"
                        >
                          <FaCheck className="me-1" /> Accept
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(app._id, 'rejected')}
                          className="btn btn-outline-danger btn-sm"
                        >
                          <FaTimes className="me-1" /> Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewApplicants;