import { Play } from "lucide-react";
import "./cta.scss";
import Scanner from "../../Scanner/Scanner";
import VisualHeader from "../../VisualHeader/VisualHeader";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="cta-wrapper">
      {/* Subtle Light Grid Background */}
      <div className="cta-grid-pattern"></div>

      <div className="cta-container">
        <div className="cta-card">
          <div className="cta-content">
            <VisualHeader badge="Free for early adopters" title="Ready to land your" gradient_title="dream job?" subtitle="Master the art of the interview with AI feedback that's actually useful. No fluff, just results." align="left" />

            <div className="cta-button-group">
              <Link to="/jobs" >
                <button className="btn btn-primary cta-btn">
                  Get Started Now
                  <Play size={18} fill="currentColor" />
                </button>
              </Link>
            </div>
          </div>

          <div className="cta-scanner-wrapper">
            <Scanner />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;