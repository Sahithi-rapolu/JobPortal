// src/pages/auth/ForgotPassword.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      await authAPI.forgotPassword(email);
      setMessage('Password reset link sent to your email!');
      setEmail('');
    } catch (err) {
      setError(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-3">Forgot Password</h2>
              <p className="text-center text-muted mb-4">
                Enter your email to reset your password
              </p>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {message && (
                  <div className="alert alert-success">{message}</div>
                )}

                {error && (
                  <div className="alert alert-danger">{error}</div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>

                <div className="mt-3 text-center">
                  <Link to="/login" className="text-decoration-none">
                    Back to Login
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

export default ForgotPassword;