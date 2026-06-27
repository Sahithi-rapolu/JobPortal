// src/pages/auth/Register.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    phone: '',
    location: '',
    company: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await authAPI.register(registerData);
      
      if (response.user.role === 'student') {
        navigate('/student/home');
      } else if (response.user.role === 'recruiter') {
        navigate('/recruiter/home');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-4">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-3">Create Account</h2>
              <p className="text-center text-muted mb-4">Join our job portal</p>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password *</label>
                  <input
                    type="password"
                    className="form-control"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Min 6 characters"
                    required
                    minLength="6"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirm Password *</label>
                  <input
                    type="password"
                    className="form-control"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="Confirm your password"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">I am a:</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="role"
                        value="student"
                        checked={formData.role === 'student'}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                      />
                      <label className="form-check-label">Student</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="role"
                        value="recruiter"
                        checked={formData.role === 'recruiter'}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                      />
                      <label className="form-check-label">Recruiter</label>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Enter your location"
                  />
                </div>

                {formData.role === 'recruiter' && (
                  <div className="mb-3">
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="Enter your company name"
                    />
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger">{error}</div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Creating account...' : 'Register'}
                </button>

                <div className="mt-3 text-center">
                  <Link to="/login" className="text-decoration-none">
                    Already have an account? Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;