// src/pages/student/JobListing.jsx
import { useState, useEffect, useCallback } from 'react';
import { jobAPI } from '../../services/api';
import JobCard from '../../components/common/JobCard';
import { FaSearch, FaFilter, FaTimes, FaSpinner } from 'react-icons/fa';

const JobListing = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    jobType: '',
    experience: '',
    skills: ''
  });

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await jobAPI.getJobs(filters);
      setJobs(response.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const clearFilters = () => {
    setFilters({
      keyword: '',
      location: '',
      jobType: '',
      experience: '',
      skills: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(val => val !== '');

  return (
    <div className="job-listing">
      {/* Header */}
      <div className="mb-4">
        <h2 className="mb-1">💼 Browse Jobs</h2>
        <p className="text-muted">Find your dream job among {jobs.length} opportunities</p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group input-group-lg">
          <span className="input-group-text bg-white border-end-0">
            <FaSearch className="text-muted" />
          </span>
          <input
            type="text"
            name="keyword"
            className="form-control border-start-0"
            placeholder="Search by job title, company, or skills..."
            value={filters.keyword}
            onChange={handleFilterChange}
          />
          <button 
            type="button" 
            className="btn btn-outline-secondary"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      {/* Filters */}
      {showFilters && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0">Filters</h6>
              <button 
                className="btn btn-sm btn-link text-decoration-none"
                onClick={() => setShowFilters(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="row g-3">
              <div className="col-md-3">
                <input
                  name="location"
                  className="form-control"
                  placeholder="📍 Location"
                  value={filters.location}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-3">
                <select
                  name="jobType"
                  className="form-select"
                  value={filters.jobType}
                  onChange={handleFilterChange}
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div className="col-md-3">
                <select
                  name="experience"
                  className="form-select"
                  value={filters.experience}
                  onChange={handleFilterChange}
                >
                  <option value="">All Experience</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                </select>
              </div>
              <div className="col-md-3">
                <input
                  name="skills"
                  className="form-control"
                  placeholder="💡 Skills (comma separated)"
                  value={filters.skills}
                  onChange={handleFilterChange}
                />
              </div>
              {hasActiveFilters && (
                <div className="col-12">
                  <button 
                    className="btn btn-link text-decoration-none p-0"
                    onClick={clearFilters}
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">
          {loading ? 'Searching...' : `Showing ${jobs.length} job${jobs.length !== 1 ? 's' : ''}`}
        </span>
      </div>

      {/* Job Listings */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-3" style={{ fontSize: '64px' }}>🔍</div>
          <h4>No jobs found</h4>
          <p className="text-muted">Try adjusting your search or filters</p>
          {hasActiveFilters && (
            <button className="btn btn-primary" onClick={clearFilters}>
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="row g-4">
          {jobs.map(job => (
            <div key={job._id} className="col-lg-4 col-md-6">
              <JobCard job={job} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobListing;