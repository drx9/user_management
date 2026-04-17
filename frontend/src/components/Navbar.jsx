import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu whenever route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

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
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* ── Top bar ── */}
      <div style={{
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: '2px',
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

        {/* ── Desktop nav links ── */}
        <div className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
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
        </div>

        {/* ── Hamburger button (mobile only, hidden on desktop via CSS) ── */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile dropdown menu ── */}
      {menuOpen && (
        <div className="nav-mobile-menu">
          {isAuthenticated ? (
            <>
              <div className="nav-mobile-user">
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, color: '#0f0f0f',
                  flexShrink: 0,
                }}>
                  {initials}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{user?.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{user?.role}</div>
                </div>
              </div>
              <div className="nav-mobile-divider" />
              <Link to="/dashboard" className="nav-mobile-link">Dashboard</Link>
              {(user?.role === 'admin' || user?.role === 'manager') && (
                <Link to="/users" className="nav-mobile-link">Users</Link>
              )}
              <Link to="/profile" className="nav-mobile-link">My Profile</Link>
              <div className="nav-mobile-divider" />
              <button onClick={handleLogout} className="nav-mobile-logout">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-mobile-link">Login</Link>
              <Link to="/register" className="nav-mobile-link">Register</Link>
            </>
          )}
        </div>
      )}

      {/* Scoped responsive styles */}
      <style>{`
        /* Hide desktop links on mobile, show hamburger */
        @media (max-width: 640px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
        }

        /* Always hide hamburger on desktop */
        .nav-hamburger {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          color: #fff;
          margin-left: 8px;
        }

        /* Mobile dropdown */
        .nav-mobile-menu {
          background: #0f0f0f;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 8px 0 16px;
        }

        .nav-mobile-user {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
        }

        .nav-mobile-divider {
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin: 6px 0;
        }

        .nav-mobile-link {
          display: block;
          padding: 12px 20px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }

        .nav-mobile-link:hover,
        .nav-mobile-link:active {
          background: rgba(255,255,255,0.06);
          color: #fff;
        }

        .nav-mobile-logout {
          display: block;
          width: calc(100% - 40px);
          margin: 8px 20px 0;
          padding: 11px 16px;
          background: transparent;
          border: 1px solid rgba(255,100,100,0.3);
          border-radius: 8px;
          color: rgba(255,120,120,0.85);
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          transition: all 0.15s;
        }

        .nav-mobile-logout:hover {
          background: rgba(255,100,100,0.1);
          color: #ff6b6b;
        }
      `}</style>
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