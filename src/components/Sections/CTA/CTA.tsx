import { CheckCircle2, Play } from "lucide-react";
import "./cta.scss";
import SectionEyebrow from "../SectionEyebrow/SectionEyebrow";
import SectionHeadline from "../SectionHeadline/SectionHeadline";
import SectionSubHeadline from "../SectionSubHeadline/SectionSubHeadline";
import Scanner from "../../Scanner/Scanner";

const CTA = () => {
  return (
    <section className="cta-wrapper">
      {/* Subtle Light Grid Background */}
      <div className="cta-grid-pattern"></div>

      <div className="cta-container">
        <div className="cta-card">
          <div className="cta-content">
            <SectionEyebrow text="Free for early adopters" />
            <SectionHeadline text="Ready to land your" gradient_text="dream job?" />
            <SectionSubHeadline text="Master the art of the interview with AI feedback that's actually useful. No fluff, just results." />

            <div className="cta-button-group">
              <button className="btn btn-primary cta-btn">
                Get Started Now
                <Play size={18} fill="currentColor" />
              </button>
            </div>

            <div className="cta-trust-badges">
              <div className="trust-item">
                <CheckCircle2 size={16} />
                <span>No credit card required</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} />
                <span>Instant Feedback</span>
              </div>
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