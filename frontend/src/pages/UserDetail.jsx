import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import userService from '../services/userService';
import '../styles/UserDetail.css';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user: currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await userService.getUserById(id);
      setUser(response.data.user);
      setError('');
    } catch (err) {
      setError('Failed to load user details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading user details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!user) {
    return <div className="error-message">User not found</div>;
  }

  return (
    <div className="user-detail-container">
      <div className="detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2>User Details</h2>
        {(currentUser?.role === 'admin' || (currentUser?.role === 'manager' && user.role !== 'admin')) && (
          <button
            className="edit-btn"
            onClick={() => navigate(`/users/${id}/edit`)}
          >
            Edit
          </button>
        )}
      </div>

      <div className="detail-card">
        <div className="card-section">
          <h3>Personal Information</h3>
          <div className="detail-item">
            <span className="label">Name:</span>
            <span className="value">{user.name}</span>
          </div>
          <div className="detail-item">
            <span className="label">Email:</span>
            <span className="value">{user.email}</span>
          </div>
        </div>

        <div className="card-section">
          <h3>Account Status</h3>
          <div className="detail-item">
            <span className="label">Role:</span>
            <span className={`badge role-${user.role}`}>{user.role}</span>
          </div>
          <div className="detail-item">
            <span className="label">Status:</span>
            <span className={`badge status-${user.status}`}>{user.status}</span>
          </div>
        </div>

        <div className="card-section">
          <h3>Audit Information</h3>
          <div className="detail-item">
            <span className="label">Created At:</span>
            <span className="value">{new Date(user.createdAt).toLocaleString()}</span>
          </div>
          <div className="detail-item">
            <span className="label">Updated At:</span>
            <span className="value">{new Date(user.updatedAt).toLocaleString()}</span>
          </div>
          {user.createdBy && (
            <div className="detail-item">
              <span className="label">Created By:</span>
              <span className="value">
                {user.createdBy.name} ({user.createdBy.email})
              </span>
            </div>
          )}
          {user.updatedBy && (
            <div className="detail-item">
              <span className="label">Updated By:</span>
              <span className="value">
                {user.updatedBy.name} ({user.updatedBy.email})
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
