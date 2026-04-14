import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const getRoleBasedMessage = () => {
    switch (user?.role) {
      case 'admin':
        return (
          <>
            <h2>Admin Dashboard</h2>
            <p>Welcome, {user?.name}! You have full access to the system.</p>
            <div className="dashboard-info">
              <p>As an Admin, you can:</p>
              <ul>
                <li>Create new users</li>
                <li>View, edit, and delete all users</li>
                <li>Assign or change user roles</li>
                <li>Activate or deactivate users</li>
                <li>Access the complete user list</li>
              </ul>
            </div>
          </>
        );
      case 'manager':
        return (
          <>
            <h2>Manager Dashboard</h2>
            <p>Welcome, {user?.name}! You have limited administrative access.</p>
            <div className="dashboard-info">
              <p>As a Manager, you can:</p>
              <ul>
                <li>View all users</li>
                <li>Edit non-admin user profiles</li>
                <li>View user details</li>
                <li>Manage your own profile</li>
              </ul>
            </div>
          </>
        );
      case 'user':
        return (
          <>
            <h2>User Dashboard</h2>
            <p>Welcome, {user?.name}!</p>
            <div className="dashboard-info">
              <p>As a regular User, you can:</p>
              <ul>
                <li>View and manage your own profile</li>
                <li>Update your name and password</li>
              </ul>
            </div>
          </>
        );
      default:
        return <h2>Dashboard</h2>;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {getRoleBasedMessage()}
        <div className="dashboard-stats">
          <h3>Your Information</h3>
          <div className="stat-item">
            <span className="stat-label">Name:</span>
            <span className="stat-value">{user?.name}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Email:</span>
            <span className="stat-value">{user?.email}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Role:</span>
            <span className="stat-value badge" style={{ textTransform: 'uppercase' }}>
              {user?.role}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Status:</span>
            <span className="stat-value">
              <span className={`status ${user?.status}`}>{user?.status}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
