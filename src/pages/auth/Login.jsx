// src/pages/auth/Login.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login({
        email: formData.email,
        password: formData.password
      });
      
      if (response.user.role === 'student') {
        navigate('/student/home');
      } else if (response.user.role === 'recruiter') {
        navigate('/recruiter/home');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side - Purple Section */}
        <div className="login-left">
          <div className="left-content">
            <h1 className="brand-title">Job Portal</h1>
            <p className="brand-subtitle">
              Find your dream job or hire the perfect candidate with ease.
            </p>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="login-right">
          <div className="form-wrapper">
            <h2 className="form-title">Welcome Back</h2>
            <p className="form-subtitle">Login to continue</p>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>

              <div className="input-group">
                <label>Login As</label>
                <div className="role-selector">
                  <button
                    type="button"
                    className={`role-btn ${formData.role === 'student' ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, role: 'student'})}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    className={`role-btn ${formData.role === 'recruiter' ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, role: 'recruiter'})}
                  >
                    Recruiter
                  </button>
                </div>
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                className="login-btn"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              <div className="form-footer">
                <Link to="/forgot-password" className="forgot-link">
                  Forgot Password?
                </Link>
                <p className="register-text">
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .login-page {
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0f2f5;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          position: fixed;
          top: 0;
          left: 0;
        }

        .login-container {
          display: flex;
          width: 100%;
          height: 100vh;
          background: white;
          overflow: hidden;
        }

        /* LEFT SIDE - Purple */
        .login-left {
          flex: 1;
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px;
          position: relative;
          overflow: hidden;
        }

        /* Decorative circles */
        .login-left::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -30%;
          width: 600px;
          height: 600px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
        }

        .login-left::after {
          content: '';
          position: absolute;
          bottom: -40%;
          left: -20%;
          width: 400px;
          height: 400px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
        }

        .left-content {
          text-align: center;
          color: white;
          z-index: 1;
          max-width: 400px;
        }

        .brand-title {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 16px;
          letter-spacing: -1px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .brand-subtitle {
          font-size: 18px;
          opacity: 0.95;
          line-height: 1.6;
          font-weight: 300;
        }

        /* RIGHT SIDE - Form */
        .login-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          padding: 60px;
        }

        .form-wrapper {
          width: 100%;
          max-width: 380px;
        }

        .form-title {
          font-size: 32px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 6px;
          letter-spacing: -0.5px;
        }

        .form-subtitle {
          color: #6b7280;
          font-size: 16px;
          margin-bottom: 32px;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .input-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 6px;
        }

        .input-field {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 15px;
          transition: all 0.2s;
          background: #fafafa;
          color: #1a1a2e;
        }

        .input-field:focus {
          outline: none;
          border-color: #4f46e5;
          background: white;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.08);
        }

        .input-field::placeholder {
          color: #9ca3af;
          font-size: 14px;
        }

        .role-selector {
          display: flex;
          gap: 12px;
        }

        .role-btn {
          flex: 1;
          padding: 10px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          background: white;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          transition: all 0.2s;
        }

        .role-btn:hover {
          border-color: #4f46e5;
          background: #f8fafc;
        }

        .role-btn.active {
          border-color: #4f46e5;
          background: #eef2ff;
          color: #4f46e5;
        }

        .error-message {
          background: #fef2f2;
          color: #dc2626;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 14px;
          margin-bottom: 16px;
          border: 1px solid #fca5a5;
        }

        .login-btn {
          width: 100%;
          padding: 14px;
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 4px;
        }

        .login-btn:hover:not(:disabled) {
          background: #4338ca;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(79, 70, 229, 0.25);
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .form-footer {
          margin-top: 24px;
          text-align: center;
        }

        .forgot-link {
          display: block;
          color: #4f46e5;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 12px;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .register-text {
          color: #6b7280;
          font-size: 14px;
          margin: 0;
        }

        .register-text a {
          color: #4f46e5;
          text-decoration: none;
          font-weight: 600;
        }

        .register-text a:hover {
          text-decoration: underline;
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .login-container {
            flex-direction: column;
            height: 100vh;
          }

          .login-left {
            flex: 0 0 30%;
            padding: 30px 20px;
            min-height: 200px;
          }

          .brand-title {
            font-size: 32px;
          }

          .brand-subtitle {
            font-size: 15px;
          }

          .login-right {
            flex: 1;
            padding: 30px 20px;
            align-items: flex-start;
            overflow-y: auto;
          }

          .form-wrapper {
            max-width: 100%;
            padding-top: 10px;
          }

          .form-title {
            font-size: 28px;
          }
        }

        @media (max-width: 480px) {
          .login-left {
            flex: 0 0 25%;
            padding: 20px 16px;
            min-height: 150px;
          }

          .brand-title {
            font-size: 26px;
            margin-bottom: 8px;
          }

          .brand-subtitle {
            font-size: 13px;
          }

          .login-right {
            padding: 20px 16px;
          }

          .form-title {
            font-size: 24px;
          }

          .form-subtitle {
            font-size: 14px;
            margin-bottom: 20px;
          }

          .input-field {
            padding: 10px 14px;
            font-size: 14px;
          }

          .role-btn {
            padding: 8px 12px;
            font-size: 13px;
          }

          .login-btn {
            padding: 12px;
            font-size: 15px;
          }
        }

        @media (max-width: 380px) {
          .login-left {
            flex: 0 0 20%;
            min-height: 120px;
            padding: 16px 12px;
          }

          .brand-title {
            font-size: 22px;
          }

          .brand-subtitle {
            font-size: 12px;
          }

          .login-right {
            padding: 16px 12px;
          }

          .form-title {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;