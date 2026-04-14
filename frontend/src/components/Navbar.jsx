import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          👥 User Management
        </Link>

        {isAuthenticated ? (
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
            {(user?.role === 'admin' || user?.role === 'manager') && (
              <li className="nav-item">
                <Link to="/users" className="nav-link">
                  Users
                </Link>
              </li>
            )}
            {user?.role === 'admin' && (
              <li className="nav-item">
                <Link to="/users/create" className="nav-link">
                  Create User
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                Profile ({user?.name})
              </Link>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
