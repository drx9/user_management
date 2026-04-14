import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import userService from '../services/userService';
import '../styles/Profile.css';

const Profile = () => {
  const { user: currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const updateData = {
        name: formData.name,
      };

      if (formData.newPassword) {
        updateData.password = formData.newPassword;
      }

      await userService.updateUser(currentUser?.id, updateData);
      setSuccess('Profile updated successfully');
      setFormData({
        ...formData,
        password: '',
        newPassword: '',
        confirmPassword: '',
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>My Profile</h2>
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-info">
          <h3>Account Information</h3>
          <div className="info-item">
            <span className="label">Email:</span>
            <span className="value">{currentUser?.email}</span>
          </div>
          <div className="info-item">
            <span className="label">Role:</span>
            <span className={`badge role-${currentUser?.role}`}>
              {currentUser?.role}
            </span>
          </div>
          <div className="info-item">
            <span className="label">Status:</span>
            <span className={`badge status-${currentUser?.status}`}>
              {currentUser?.status}
            </span>
          </div>
          <div className="info-item">
            <span className="label">Member Since:</span>
            <span className="value">
              {new Date(currentUser?.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <h3>Update Profile</h3>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="form-input"
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
