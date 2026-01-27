import { 
  Play, 
  TrendingUp, 
  CheckCircle, 
  BrainCircuit
} from 'lucide-react';
import { Link } from "react-router-dom";
import "./hero.scss";

const Hero = () => {

  

  return (
    <section className="hero-wrapper">
      {/* Animated background elements */}
      <div className="hero-float-circle hero-float-circle-1" />
      <div className="hero-float-circle hero-float-circle-2" />

      <div className="hero-container">
        <div className="hero-content">
          {/* Main headline */}
          <h1 className="hero-title">
            Train Smarter.
            <br />
            Interview Better.
          </h1>

          {/* Subheadline */}
          <p className="hero-subtitle">
            Master your next interview with AI-powered mock sessions, real-time
            feedback, and personalized training paths
          </p>

          {/* Feature highlights */}
          <div className="hero-features">
            <div className="hero-feature-pill">
              <BrainCircuit className="hero-feature-icon" size={20} />
              <span className="hero-feature-text">AI Mock Interviews</span>
            </div>
            <div className="hero-feature-pill">
              <TrendingUp className="hero-feature-icon" size={20} />
              <span className="hero-feature-text">Skill Gap Analysis</span>
            </div>
            <div className="hero-feature-pill">
              <CheckCircle className="hero-feature-icon" size={20} />
              <span className="hero-feature-text">Readiness Scoring</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="hero-cta-group">
            <Link to={'/courses'} className="no-underline">
              <button className="btn btn-secondary btn-large">
                Start Training <Play size={20} fill="currentColor" />
              </button>
            </Link>
            <Link to='/jobs' className="no-underline">
              <button className="btn btn-transparent btn-large">
                Browse Jobs
              </button>
            </Link>
          </div>

          {/* Social proof */}
          <p className="hero-social-proof">
            Join <strong>10,000+</strong> candidates who've improved their
            interview skills
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;