import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, Shield } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

const HeekaAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!isLogin && !isAdmin && formData.password !== formData.confirmPassword) {
        throw new Error("Passwords don't match");
      }

      if (isAdmin) {
        // Admin login logic
        const response = await axios.post('http://localhost:5000/admin/login', {
          email: formData.email,
          password: formData.password
        });

        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('admin', JSON.stringify(response.data.admin));
        navigate('/admin/dashboard');
      } 
      else if (isLogin) {
        // Regular user login
        const response = await axios.post('http://localhost:5000/login', {
          email: formData.email,
          password: formData.password
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.customer));
        navigate('/home');
      } else {
        // User signup
        const response = await axios.post('http://localhost:5000/register', {
          first_name: formData.first_name.split(' ')[0],
          last_name: formData.first_name.split(' ').slice(1).join(' ') || ' ',
          email: formData.email,
          password: formData.password
        });

        const loginResponse = await axios.post('http://localhost:5000/login', {
          email: formData.email,
          password: formData.password
        });

        localStorage.setItem('token', loginResponse.data.token);
        localStorage.setItem('user', JSON.stringify(loginResponse.data.customer));
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ first_name: '', email: '', password: '', confirmPassword: '' });
    setError('');
  };

  const toggleAdminMode = () => {
    setIsAdmin(!isAdmin);
    setFormData({ first_name: '', email: '', password: '', confirmPassword: '' });
    setError('');
  };

  return (
    <div className="heeka-auth-container">
      {/* Background elements */}
      <div className="background-elements">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>

      {/* Floating particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}></div>
        ))}
      </div>

      {/* Main container */}
      <div className="main-container">
        {/* Logo/Brand */}
        <div className="logo-container">
          <div className="logo-icon-login">
            <Sparkles className="icon" />
          </div>
          <h1 className="logo-title">Heeka</h1>
          <p className="logo-subtitle">An organic World</p>
        </div>

        {/* Admin toggle */}
        <div className="admin-toggle-container">
          <button
            onClick={toggleAdminMode}
            className={`admin-toggle-button ${isAdmin ? 'admin-active' : ''}`}
          >
            <Shield className="admin-icon" />
            <span>{isAdmin ? 'Admin Login' : 'User Login'}</span>
          </button>
        </div>

        {/* Auth Card */}
        <div className="auth-card">
          {/* Tab switcher - only for user mode */}
          {!isAdmin && (
            <div className="tab-switcher">
              <button
                onClick={() => setIsLogin(true)}
                className={`tab-button ${isLogin ? 'active' : ''}`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`tab-button ${!isLogin ? 'active' : ''}`}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Admin title */}
          {isAdmin && (
            <div className="admin-title">
              <Shield className="admin-title-icon" />
              <h3>Admin Portal</h3>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="form-container">
            {/* Name field - only for user signup */}
            {!isLogin && !isAdmin && (
              <div className="form-field">
                <label className="field-label">Full Name</label>
                <div className="input-container">
                  <User className="input-icon" />
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div className="form-field">
              <label className="field-label">Email</label>
              <div className="input-container">
                <Mail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder={isAdmin ? "Enter admin email" : "Enter your email"}
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="form-field">
              <label className="field-label">Password</label>
              <div className="input-container">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder={isAdmin ? "Enter admin password" : "Enter your password"}
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                </button>
              </div>
            </div>

            {/* Confirm Password - only for user signup */}
            {!isLogin && !isAdmin && (
              <div className="form-field">
                <label className="field-label">Confirm Password</label>
                <div className="input-container">
                  <Lock className="input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Confirm your password"
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="password-toggle"
                  >
                    {showConfirmPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                  </button>
                </div>
              </div>
            )}

            {/* Forgot password - only for login modes */}
            {(isLogin || isAdmin) && (
              <div className="forgot-password">
                <button type="button" className="forgot-password-button">
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className={`submit-button ${isAdmin ? 'admin-submit' : ''}`}
              disabled={loading}
            >
              <span>
                {loading ? 'Processing...' : 
                 isAdmin ? 'Admin Login' : 
                 isLogin ? 'Sign In' : 'Create Account'}
              </span>
              {!loading && <ArrowRight className="submit-icon" />}
            </button>

            {/* Terms - only for user signup */}
            {!isLogin && !isAdmin && (
              <p className="terms-text">
                By signing up, you agree to our{' '}
                <button type="button" className="terms-link">Terms of Service</button>{' '}
                and{' '}
                <button type="button" className="terms-link">Privacy Policy</button>
              </p>
            )}
          </form>

          {/* Social login - only for user mode */}
          {!isAdmin && (
            <>
              <div className="social-divider">
                <div className="divider-line"></div>
                <span className="divider-text">or continue with</span>
                <div className="divider-line"></div>
              </div>

              <div className="social-buttons">
                <button type="button" className="social-button google">
                  <svg className="social-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Google</span>
                </button>
                <button type="button" className="social-button facebook">
                  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer - only for user mode */}
        {!isAdmin && (
          <div className="auth-footer">
            <p className="footer-text">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={toggleAuthMode}
                className="footer-link"
                type="button"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeekaAuth;