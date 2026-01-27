import { ArrowLeft, Home } from 'lucide-react';
import './notfound.scss';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    window.history.back();
  };

  const handleHomeClick = () => {
    console.log("Clicked Back")
    navigate("/")
  };

  return (
    <div className="notfound-wrapper">
      <div className="notfound-container">
        {/* Animated background elements */}
        <div className="bg-element bg-1"></div>
        <div className="bg-element bg-2"></div>
        <div className="bg-element bg-3"></div>

        {/* 404 Content */}
        <div className="notfound-content">
          {/* Large 404 Text */}
          <div className="error-code">
            <span className="error-digit">4</span>
            <div className="error-circle">
              <div className="error-dot"></div>
            </div>
            <span className="error-digit">4</span>
          </div>

          {/* Heading */}
          <h1 className="notfound-title">Page Not Found</h1>
          <p className="notfound-subtitle">
            Oops! The page you're looking for doesn't exist or has been moved. Let us help you get back on track.
          </p>


          {/* Action Buttons */}
          <div className="button-group">
            <button onClick={handleHomeClick} className="btn btn-primary">
              <Home size={20} />
              <span>Back to Home</span>
            </button>
            <button onClick={handleGoBack} className="btn btn-secondary">
              <ArrowLeft size={20} />
              <span>Go Back</span>
            </button>
          </div>

          {/* Suggestions */}
          <div className="suggestions">
            <h3 className="suggestions-title">Quick Navigation</h3>
            <div className="suggestions-grid">
              <Link to="/" className="suggestion-link">
                <div className="suggestion-icon-wrapper">
                  <Home size={24} />
                </div>
                <span>Home</span>
              </Link>
              <Link to="/dashboard" className="suggestion-link">
                <div className="suggestion-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </div>
                <span>Dashboard</span>
              </Link>
              <Link to="/contact" className="suggestion-link">
                <div className="suggestion-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <span>Contact</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Illustration */}
        <div className="illustration">
          <div className="rocket-icon">
            <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Rocket body */}
              <defs>
                <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>

              {/* Main body */}
              <path
                d="M60 10 L45 35 L45 95 C45 105 50 110 60 110 C70 110 75 105 75 95 L75 35 Z"
                fill="url(#rocketGradient)"
              />

              {/* Window */}
              <circle cx="60" cy="35" r="6" fill="#ffffff" stroke="#a855f7" strokeWidth="1.5" />

              {/* Left fin */}
              <path
                d="M45 75 L25 95 L35 85 Z"
                fill="#ec4899"
                opacity="0.8"
              />

              {/* Right fin */}
              <path
                d="M75 75 L95 95 L85 85 Z"
                fill="#ec4899"
                opacity="0.8"
              />

              {/* Center bottom accent */}
              <path
                d="M55 95 L50 110 M65 95 L70 110"
                stroke="#a855f7"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Flame 1 */}
              <path
                d="M50 110 Q48 125 50 145 Q52 130 50 110"
                fill="#f97316"
                opacity="0.7"
              />

              {/* Flame 2 */}
              <path
                d="M70 110 Q72 125 70 145 Q68 130 70 110"
                fill="#f97316"
                opacity="0.7"
              />

              {/* Flame inner */}
              <path
                d="M60 110 Q58 130 60 150 Q62 130 60 110"
                fill="#fbbf24"
                opacity="0.8"
              />

              {/* Glow effect */}
              <circle cx="60" cy="35" r="10" fill="none" stroke="#a855f7" strokeWidth="1" opacity="0.3" />
            </svg>
          </div>

          {/* Floating elements */}
          <div className="floating-elements">
            <div className="float-element elem-1"></div>
            <div className="float-element elem-2"></div>
            <div className="float-element elem-3"></div>
          </div>

          {/* Glow effect */}
          <div className="rocket-glow"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;