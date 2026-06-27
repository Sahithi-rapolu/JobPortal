// src/pages/recruiter/PostJob.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobAPI } from '../../services/api';
import { 
  FaArrowLeft, 
  FaPlus, 
  FaTimes, 
  FaSave, 
  FaSpinner 
} from 'react-icons/fa';

const PostJob = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: user?.company || '',
    location: '',
    jobType: 'Full-time',
    experience: 'Mid Level',
    salary: '',
    description: '',
    requirements: [],
    skills: [],
    remote: false,
    applicationDeadline: '',
    status: 'active'
  });

  const [requirementsInput, setRequirementsInput] = useState('');
  const [skillsInput, setSkillsInput] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addItem = (field, value, setter) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
      setter('');
    }
  };

  const removeItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await jobAPI.createJob(formData);
      alert('✅ Job posted successfully!');
      navigate('/recruiter/manage-jobs');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-job">
      <div className="d-flex align-items-center gap-3 mb-4">
        <button 
          onClick={() => navigate('/recruiter/manage-jobs')}
          className="btn btn-outline-secondary"
        >
          <FaArrowLeft />
        </button>
        <div>
          <h2 className="mb-1">📝 Post a New Job</h2>
          <p className="text-muted">Fill in the details to attract the best candidates</p>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              {/* Job Title */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Job Title <span className="text-danger">*</span>
                </label>
                <input
                  name="title"
                  className="form-control form-control-lg"
                  placeholder="e.g., Senior React Developer"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Company */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Company Name <span className="text-danger">*</span>
                </label>
                <input
                  name="company"
                  className="form-control form-control-lg"
                  placeholder="Your company name"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Location */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Location <span className="text-danger">*</span>
                </label>
                <input
                  name="location"
                  className="form-control form-control-lg"
                  placeholder="e.g., New York, NY or Remote"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Job Type */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Job Type <span className="text-danger">*</span>
                </label>
                <select
                  name="jobType"
                  className="form-select form-select-lg"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              {/* Experience Level */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Experience Level <span className="text-danger">*</span>
                </label>
                <select
                  name="experience"
                  className="form-select form-select-lg"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                >
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                  <option value="Lead">Lead</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>

              {/* Salary */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Salary Range</label>
                <input
                  name="salary"
                  className="form-control form-control-lg"
                  placeholder="e.g., $80,000 - $100,000"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </div>

              {/* Description */}
              <div className="col-12">
                <label className="form-label fw-semibold">
                  Job Description <span className="text-danger">*</span>
                </label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="6"
                  placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Requirements */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Requirements <span className="text-danger">*</span>
                </label>
                <div className="input-group mb-2">
                  <input
                    className="form-control"
                    value={requirementsInput}
                    onChange={(e) => setRequirementsInput(e.target.value)}
                    placeholder="Add requirement"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addItem('requirements', requirementsInput, setRequirementsInput);
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => addItem('requirements', requirementsInput, setRequirementsInput)}
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {formData.requirements.map((req, index) => (
                    <span key={index} className="badge bg-primary p-2 d-flex align-items-center gap-2">
                      {req}
                      <FaTimes 
                        style={{ cursor: 'pointer' }}
                        onClick={() => removeItem('requirements', index)}
                      />
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Skills Required <span className="text-danger">*</span>
                </label>
                <div className="input-group mb-2">
                  <input
                    className="form-control"
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
                    placeholder="Add skill (e.g., React)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addItem('skills', skillsInput, setSkillsInput);
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => addItem('skills', skillsInput, setSkillsInput)}
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span key={index} className="badge bg-success p-2 d-flex align-items-center gap-2">
                      {skill}
                      <FaTimes 
                        style={{ cursor: 'pointer' }}
                        onClick={() => removeItem('skills', index)}
                      />
                    </span>
                  ))}
                </div>
              </div>

              {/* Options */}
              <div className="col-md-6">
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="remote"
                    checked={formData.remote}
                    onChange={handleChange}
                    id="remoteSwitch"
                  />
                  <label className="form-check-label fw-semibold" htmlFor="remoteSwitch">
                    Remote Position
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Application Deadline</label>
                <input
                  type="date"
                  name="applicationDeadline"
                  className="form-control form-control-lg"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="mt-4 pt-3 border-top d-flex gap-3">
              <button 
                type="submit" 
                className="btn btn-primary btn-lg px-5"
                disabled={loading}
              >
                {loading ? (
                  <><FaSpinner className="spinner-border spinner-border-sm me-2" /> Posting...</>
                ) : (
                  <><FaSave className="me-2" /> Post Job</>
                )}
              </button>
              <button 
                type="button" 
                className="btn btn-outline-secondary btn-lg px-5"
                onClick={() => navigate('/recruiter/manage-jobs')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;