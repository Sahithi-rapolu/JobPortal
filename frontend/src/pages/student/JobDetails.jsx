// src/pages/student/JobDetails.jsx
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobAPI, applicationAPI } from '../../services/api';

const JobDetails = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const [applicationLoading, setApplicationLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);

  const fetchJobDetails = useCallback(async () => {
    try {
      const response = await jobAPI.getJob(id);
      setJob(response.job);
      setHasApplied(response.hasApplied || false);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchJobDetails();
  }, [fetchJobDetails]);

  const handleApply = async (e) => {
    e.preventDefault();
    
    if (!resume) {
      alert('Please upload your resume');
      return;
    }

    try {
      setApplicationLoading(true);
      
      const formData = new FormData();
      formData.append('jobId', id);
      formData.append('coverLetter', coverLetter);
      formData.append('resume', resume);

      await applicationAPI.applyJob(id, formData);
      
      setHasApplied(true);
      alert('Application submitted successfully!');
      navigate('/student/applications');
    } catch (error) {
      alert(error.message);
    } finally {
      setApplicationLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading job details...</div>;
  if (!job) return <div className="not-found">Job not found</div>;

  return (
    <div className="job-details">
      <div className="job-header">
        <h1>{job.title}</h1>
        <div className="job-meta">
          <span className="company">{job.company}</span>
          <span className="location">📍 {job.location}</span>
        </div>
      </div>
      
      <div className="job-info-grid">
        <div className="info-item">
          <label>Job Type</label>
          <p>{job.jobType}</p>
        </div>
        <div className="info-item">
          <label>Experience</label>
          <p>{job.experience}</p>
        </div>
        <div className="info-item">
          <label>Salary</label>
          <p>{job.salary || 'Not specified'}</p>
        </div>
        <div className="info-item">
          <label>Posted</label>
          <p>{new Date(job.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      
      <div className="job-section">
        <h3>Description</h3>
        <p>{job.description}</p>
      </div>
      
      {job.requirements?.length > 0 && (
        <div className="job-section">
          <h3>Requirements</h3>
          <ul>
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      )}
      
      {job.responsibilities?.length > 0 && (
        <div className="job-section">
          <h3>Responsibilities</h3>
          <ul>
            {job.responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="job-section">
        <h3>Skills</h3>
        <div className="skills">
          {job.skills?.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>

      {!hasApplied ? (
        <form onSubmit={handleApply} className="application-form">
          <h3>Apply for this position</h3>
          <div className="form-group">
            <label>Cover Letter</label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows="5"
              placeholder="Tell us why you're a great fit for this role..."
            />
          </div>
          <div className="form-group">
            <label>Resume (PDF, DOC, DOCX) *</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" className="btn-apply" disabled={applicationLoading}>
            {applicationLoading ? 'Applying...' : 'Apply Now'}
          </button>
        </form>
      ) : (
        <div className="applied-message">
          <h3>✅ You have already applied to this job!</h3>
          <p>Check your applications page for status updates.</p>
        </div>
      )}
    </div>
  );
};

export default JobDetails;