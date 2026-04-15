import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = user?.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <nav style={{
      background: '#0f0f0f',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: '2px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>

      <Link to="/" style={{
        fontSize: '14px',
        fontWeight: 600,
        color: '#fff',
        letterSpacing: '-0.2px',
        marginRight: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        textDecoration: 'none',
      }}>
        <div style={{
          width: 28, height: 28,
          borderRadius: 8,
          background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="4" cy="4" r="2.5" fill="#0f0f0f" />
            <circle cx="10" cy="4" r="2.5" fill="#0f0f0f" />
            <circle cx="7" cy="10" r="2.5" fill="#0f0f0f" />
          </svg>
        </div>
        User Management
      </Link>

      {isAuthenticated ? (
        <>
          <Link to="/dashboard" style={navLinkStyle}>Dashboard</Link>

          {(user?.role === 'admin' || user?.role === 'manager') && (
            <Link to="/users" style={navLinkStyle}>Users</Link>
          )}

          <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.12)', margin: '0 8px' }} />

          <Link to="/profile" style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '5px 5px 5px 12px',
            borderRadius: 99,
            background: 'rgba(255,255,255,0.07)',
            border: '0.5px solid rgba(255,255,255,0.12)',
            textDecoration: 'none',
            transition: 'background 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
          >
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{user?.name}</span>
            <div style={{
              width: 24, height: 24, borderRadius: '50%',
              background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 600, color: '#0f0f0f',
            }}>
              {initials}
            </div>
          </Link>

          <button
            onClick={handleLogout}
            style={logoutStyle}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#ff6b6b';
              e.currentTarget.style.background = 'rgba(255,100,100,0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={navLinkStyle}>Login</Link>
          <Link to="/register" style={{
            fontSize: '13px',
            color: '#0f0f0f',
            padding: '7px 14px',
            borderRadius: '7px',
            background: '#fff',
            textDecoration: 'none',
            fontWeight: 500,
            marginLeft: '4px',
            transition: 'opacity 0.15s',
          }}>
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

const navLinkStyle = {
  fontSize: '13px',
  color: 'rgba(255,255,255,0.55)',
  padding: '7px 13px',
  borderRadius: '7px',
  textDecoration: 'none',
  fontWeight: 400,
  letterSpacing: '0.01em',
  transition: 'all 0.15s',
};

const logoutStyle = {
  fontSize: '12.5px',
  color: 'rgba(255,255,255,0.45)',
  padding: '7px 13px',
  borderRadius: '7px',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'all 0.15s',
  marginLeft: '2px',
};

export default Navbar;