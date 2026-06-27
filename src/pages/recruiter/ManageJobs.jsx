// src/pages/recruiter/ManageJobs.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobAPI, userAPI } from '../../services/api';
import { 
  FaPlus, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaToggleOn, 
  FaToggleOff, 
  FaUsers,
  FaBriefcase,
  FaCheckCircle,
  FaChartLine
} from 'react-icons/fa';

const ManageJobs = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchJobs();
    fetchStats();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await jobAPI.getRecruiterJobs();
      setJobs(response.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await userAPI.getRecruiterStats();
      setStats(response.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await jobAPI.deleteJob(jobId);
        setJobs(jobs.filter(job => job._id !== jobId));
        alert('✅ Job deleted successfully');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleStatusToggle = async (jobId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'closed' : 'active';
    try {
      await jobAPI.updateJob(jobId, { status: newStatus });
      setJobs(jobs.map(job => 
        job._id === jobId ? { ...job, status: newStatus } : job
      ));
      alert(`✅ Job ${newStatus === 'active' ? 'activated' : 'closed'} successfully`);
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredJobs = filter === 'all' 
    ? jobs 
    : jobs.filter(job => job.status === filter);

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-success',
      closed: 'bg-danger',
      draft: 'bg-warning'
    };
    return badges[status] || 'bg-secondary';
  };

  return (
    <div className="manage-jobs">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">💼 Manage Jobs</h2>
          <p className="text-muted">Manage your job postings and track applications</p>
        </div>
        <Link to="/recruiter/post-job" className="btn btn-primary">
          <FaPlus className="me-2" /> Post New Job
        </Link>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Total Jobs</h6>
                    <h2 className="mb-0">{stats.totalJobs || 0}</h2>
                  </div>
                  <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                    <FaBriefcase className="text-primary" size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Active Jobs</h6>
                    <h2 className="mb-0">{stats.activeJobs || 0}</h2>
                  </div>
                  <div className="bg-success bg-opacity-10 p-3 rounded-circle">
                    <FaCheckCircle className="text-success" size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Applications</h6>
                    <h2 className="mb-0">{stats.totalApplications || 0}</h2>
                  </div>
                  <div className="bg-info bg-opacity-10 p-3 rounded-circle">
                    <FaUsers className="text-info" size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">View Rate</h6>
                    <h2 className="mb-0">
                      {stats.totalJobs > 0 
                        ? Math.round((stats.totalApplications / stats.totalJobs) * 10) / 10 
                        : 0}
                    </h2>
                  </div>
                  <div className="bg-warning bg-opacity-10 p-3 rounded-circle">
                    <FaChartLine className="text-warning" size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="d-flex gap-2 mb-4">
        <button 
          className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setFilter('all')}
        >
          All ({jobs.length})
        </button>
        <button 
          className={`btn ${filter === 'active' ? 'btn-success' : 'btn-outline-secondary'}`}
          onClick={() => setFilter('active')}
        >
          Active ({jobs.filter(j => j.status === 'active').length})
        </button>
        <button 
          className={`btn ${filter === 'closed' ? 'btn-danger' : 'btn-outline-secondary'}`}
          onClick={() => setFilter('closed')}
        >
          Closed ({jobs.filter(j => j.status === 'closed').length})
        </button>
      </div>

      {/* Job List */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-3" style={{ fontSize: '64px' }}>📭</div>
          <h4>No jobs found</h4>
          <p className="text-muted">Start by posting your first job</p>
          <Link to="/recruiter/post-job" className="btn btn-primary">
            <FaPlus className="me-2" /> Post Your First Job
          </Link>
        </div>
      ) : (
        <div className="row g-3">
          {filteredJobs.map(job => (
            <div key={job._id} className="col-12">
              <div className="card border-0 shadow-sm hover-shadow transition">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="d-flex align-items-start gap-3">
                        <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                          <FaBriefcase className="text-primary" size={20} />
                        </div>
                        <div>
                          <h5 className="mb-1">{job.title}</h5>
                          <p className="text-muted mb-1">
                            <span className="me-3">🏢 {job.company}</span>
                            <span className="me-3">📍 {job.location}</span>
                            <span className="me-3">💼 {job.jobType}</span>
                          </p>
                          <div className="d-flex gap-2">
                            <span className={`badge ${getStatusBadge(job.status)}`}>
                              {job.status.toUpperCase()}
                            </span>
                            <span className="badge bg-secondary">
                              {job.applicants?.length || 0} Applicants
                            </span>
                            <span className="badge bg-info">
                              👁️ {job.views || 0} Views
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex gap-2 justify-content-md-end mt-3 mt-md-0">
                        <Link 
                          to={`/recruiter/applicants/${job._id}`}
                          className="btn btn-outline-primary btn-sm"
                        >
                          <FaUsers className="me-1" /> Applicants
                        </Link>
                        <button
                          onClick={() => handleStatusToggle(job._id, job.status)}
                          className={`btn btn-sm ${job.status === 'active' ? 'btn-outline-warning' : 'btn-outline-success'}`}
                        >
                          {job.status === 'active' ? (
                            <><FaToggleOff className="me-1" /> Close</>
                          ) : (
                            <><FaToggleOn className="me-1" /> Activate</>
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          <FaTrash />
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

export default ManageJobs;