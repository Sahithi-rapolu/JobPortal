import { useState, useEffect } from 'react';
import { applicationAPI } from '../../services/api';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await applicationAPI.getMyApplications();
      setApplications(response.applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (applicationId) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      try {
        await applicationAPI.withdrawApplication(applicationId);
        setApplications(applications.filter(app => app._id !== applicationId));
        alert('Application withdrawn successfully');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ffc107',
      reviewing: '#17a2b8',
      shortlisted: '#28a745',
      rejected: '#dc3545',
      accepted: '#28a745'
    };
    return colors[status] || '#6c757d';
  };

  if (loading) return <div>Loading applications...</div>;

  return (
    <div className="my-applications">
      <h2>My Applications</h2>
      
      {applications.length === 0 ? (
        <p>You haven't applied to any jobs yet.</p>
      ) : (
        <div className="applications-grid">
          {applications.map(app => (
            <div key={app._id} className="application-card">
              <h3>{app.job.title}</h3>
              <p className="company">{app.job.company}</p>
              <p className="location">{app.job.location}</p>
              <p>Applied: {new Date(app.appliedDate).toLocaleDateString()}</p>
              
              <div className="status-container">
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(app.status) }}
                >
                  {app.status.toUpperCase()}
                </span>
              </div>

              {app.status === 'pending' && (
                <button
                  onClick={() => handleWithdraw(app._id)}
                  className="btn-withdraw"
                >
                  Withdraw Application
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;