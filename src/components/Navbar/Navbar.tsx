import { useState } from "react";
import {
  Rocket, Home, Briefcase, BookOpen, BarChart3,
  Settings, LogOut, Menu, X, ChevronDown, Bell,
  MessageSquare, Zap
} from "lucide-react";
import Logo from "../Logo/Logo";
import './navbar.scss'
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../api/auth";
import { useAppDispatch } from "../../store/hooks";
import { authActions } from "../../store/auth/auth.slice";

const NAV_ITEMS = [
  { label: "Home", path: "/", icon: Home },
  { label: "Jobs", path: "/jobs", icon: Briefcase },
  { label: "Courses", path: "/courses", icon: BookOpen },
  { label: "AI Interview", path: "/interview", icon: Zap },

];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);



  const isAuthenticated = AuthService.getAuthenticationState();
  const userName = "Nawaz Kumanali";
  const userEmail = "iamnawazahmad777@gmail.com";
  const notifications = 3;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setIsMobileOpen(false);
    window.location.href = path;
  };

  const userInitials = userName
    .split(" ")
    .map(n => n.charAt(0))
    .join("");

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Logo Section */}
        <Link className="navbar-logo" to={"/"}>
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-nav-desktop">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} to={item.path} className="nav-link">
                <Icon size={18} className="nav-icon" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>


        {/* Action Buttons */}
        <div className="navbar-actions">
          {/* Notifications */}
          {isAuthenticated &&
            <div className="notification-wrapper desktop-only">
              <button
                className="notification-btn"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              >
                <Bell size={20} />
                {notifications > 0 && <span className="notification-badge">{notifications}</span>}
              </button>

              {isNotificationOpen && (
                <div className="notification-dropdown">
                  <div className="dropdown-header">
                    <h3>Notifications</h3>
                    <button className="close-btn" onClick={() => setIsNotificationOpen(false)}>
                      <X size={18} />
                    </button>
                  </div>
                  <div className="notification-item">
                    <div className="notification-dot"></div>
                    <div>
                      <p className="notification-title">New job matching your profile!</p>
                      <p className="notification-time">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="notification-item">
                    <div className="notification-dot"></div>
                    <div>
                      <p className="notification-title">You have a new message</p>
                      <p className="notification-time">2 hours ago</p>
                    </div>
                  </div>
                  <div className="notification-item">
                    <div className="notification-dot"></div>
                    <div>
                      <p className="notification-title">Course recommendation for you</p>
                      <p className="notification-time">1 day ago</p>
                    </div>
                  </div>
                  <div className="notification-footer">
                    <Link to="/notifications" className="view-all">View All</Link>
                  </div>
                </div>
              )}
            </div>
          }

          {isAuthenticated ? (
            <div className="user-profile-wrapper">
              <Link to={"/training"}>
                <button className="btn-training desktop-only">
                  <Rocket size={18} />
                  <span>Start Training</span>
                </button>
              </Link>

              {/* User Avatar & Dropdown */}
              <div className="user-menu">
                <button
                  className="avatar-btn"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  title={userName}
                >
                  <div className="avatar-content">
                    {userInitials}
                  </div>
                  <ChevronDown size={14} className={`chevron ${isUserMenuOpen ? 'open' : ''}`} />
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="user-dropdown">
                    <div className="dropdown-header">
                      <div className="user-info">
                        <div className="user-avatar-large">{userInitials}</div>
                        <div>
                          <p className="user-name">{userName}</p>
                          <p className="user-email">{userEmail}</p>
                        </div>
                      </div>
                    </div>
                    <hr className="dropdown-divider" />
                    <Link to="/profile" className="dropdown-item">
                      <Home size={16} />
                      <span>My Profile</span>
                    </Link>
                    <Link to="/training" className="dropdown-item">
                      <BookOpen size={16} />
                      <span>My Training</span>
                    </Link>
                    <Link to="/interview" className="dropdown-item">
                      <Zap size={16} />
                      <span>My Interviews</span>
                    </Link>
                    <Link to="/dashboard" className="dropdown-item">
                      <BarChart3 size={16} />
                      <span>My Dashboard</span>
                    </Link>

                    <Link to="/messages" className="dropdown-item">
                      <MessageSquare size={16} />
                      <span>Messages</span>
                    </Link>
                    <Link to="/settings" className="dropdown-item">
                      <Settings size={16} />
                      <span>Settings</span>
                    </Link>
                    <hr className="dropdown-divider" />
                    <button className="dropdown-item logout-item" onClick={() => {
                      setTimeout(() => {
                        dispatch(authActions.logout());
                        navigate("/")
                      }, 1000);
                    }}>
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="auth-buttons desktop-only">
              <Link to="/signin" className="btn-signin">Sign In</Link>
              <Link to="/signup" className="btn-signup">Sign Up</Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileOpen(false)}>
          <aside className="mobile-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="sidebar-header">
              <div className="logo-box">
                <Rocket size={20} className="logo-icon" />
                <span className="logo-text">HirePilot.</span>
              </div>
              <button
                className="sidebar-close-btn"
                onClick={() => setIsMobileOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Nav */}
            <ul className="mobile-nav-list">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label} onClick={() => handleNavigation(item.path)}>
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </li>
                );
              })}
            </ul>

            {/* Mobile User Info */}
            {isAuthenticated && (
              <>
                <div className="sidebar-divider"></div>
                <div className="mobile-user-info">
                  <div className="user-avatar-large">{userInitials}</div>
                  <div>
                    <p className="user-name">{userName}</p>
                    <p className="user-email-small">{userEmail}</p>
                  </div>
                </div>
              </>
            )}

            {/* Sidebar Footer */}
            <div className="sidebar-footer">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="sidebar-link">My Profile</Link>
                  <Link to="/settings" className="sidebar-link">Settings</Link>
                  <button className="btn-logout">Sign Out</button>
                </>
              ) : (
                <>
                  <Link to="/signin" className="btn-signin">Sign In</Link>
                  <Link to="/signup" className="btn-signup">Sign Up</Link>
                </>
              )}
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}