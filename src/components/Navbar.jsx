
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, HelpCircle, PieChart, LayoutDashboard, TrendingUp, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../index.css';

const DropdownPortal = ({ isOpen, onClose, anchorRef, children }) => {
  if (!isOpen) return null;

  const rect = anchorRef.current?.getBoundingClientRect();
  const top = rect ? rect.bottom + 12 : 0;
  const right = rect ? window.innerWidth - rect.right : 20;

  return createPortal(
    <>
      <div className="dropdown-overlay" onClick={onClose} />
      <div
        className="dropdown-menu"
        style={{ top: `${top}px`, right: `${right}px`, position: 'fixed' }}
      >
        {children}
      </div>
    </>,
    document.body
  );
};

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="logo-section flex items-center gap-4 hover:opacity-80 transition-opacity">
          <div className="logo-icon">
            <TrendingUp size={28} color="var(--accent-primary)" />
          </div>
          <h1 className="logo-text">SmartInvest</h1>
        </Link>

        <div className="nav-links flex items-center gap-4">
          <Link to="/dashboard" className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/portfolio" className={`nav-item ${isActive('/portfolio') ? 'active' : ''}`}>
            <PieChart size={20} />
            <span>Portfolio</span>
          </Link>
        </div>

        <div className="user-section flex items-center gap-4">
          <button className="icon-btn">
            <Bell size={20} />
          </button>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <button
                  ref={buttonRef}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-lg font-bold shadow-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-primary"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : <User size={20} />}
                </button>

                <DropdownPortal
                  isOpen={isMenuOpen}
                  onClose={() => setIsMenuOpen(false)}
                  anchorRef={buttonRef}
                >
                  {/* Dark Menu Layout (Reference Image Style) */}
                  <div
                    className="flex flex-col w-[260px] bg-[#18181b] border border-[#27272a] rounded-xl shadow-2xl overflow-hidden font-sans mt-2 mr-2 relative z-50 p-2 gap-1"
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >

                    {/* Account Details */}
                    <Link
                      to="/settings"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 text-[14px] font-medium hover:bg-[#27272a] rounded-lg transition-colors group bg-transparent border-none"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      <User size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                      <span>Account Details</span>
                    </Link>

                    {/* Help Center */}
                    <button
                      className="flex items-center gap-3 px-3 py-3 text-[14px] font-medium hover:bg-[#27272a] rounded-lg transition-colors w-full text-left group outline-none"
                      style={{ backgroundColor: 'transparent', border: 'none', color: 'white' }}
                    >
                      <HelpCircle size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                      <span>Help Center</span>
                    </button>

                    {/* Settings */}
                    <Link
                      to="/settings"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 text-[14px] font-medium hover:bg-[#27272a] rounded-lg transition-colors group bg-transparent border-none"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      <Settings size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                      <span>Settings</span>
                    </Link>

                    <div className="h-px bg-[#27272a] mx-2 my-1.5" />

                    {/* Sign Out */}
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-3 py-3 text-[14px] font-medium hover:bg-[#27272a] rounded-lg transition-colors w-full text-left group outline-none"
                      style={{ backgroundColor: 'transparent', border: 'none', color: 'white' }}
                    >
                      <LogOut size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </DropdownPortal>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-medium text-secondary hover:text-white transition-colors">
                  Log In
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
