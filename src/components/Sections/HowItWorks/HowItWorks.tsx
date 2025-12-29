import { Search, BrainCircuit, BarChartHorizontal, CheckCircle, ArrowRight } from "lucide-react";
import "./howitworks.scss";
import SectionEyebrow from "../SectionEyebrow/SectionEyebrow";
import SectionHeadline from "../SectionHeadline/SectionHeadline";
import SectionSubHeadline from "../SectionSubHeadline/SectionSubHeadline";

const steps = [
  {
    step: "01",
    title: "Browse & Choose",
    desc: "Explore jobs and select roles that match your career goals. Get instant readiness scores.",
    icon: <Search size={28} />,
  },
  {
    step: "02",
    title: "Train with AI",
    desc: "Practice with AI-powered mock interviews tailored to your target role and experience level.",
    icon: <BrainCircuit size={28} />,
  },
  {
    step: "03",
    title: "Get Insights",
    desc: "Receive detailed feedback on your performance, skill gaps, and areas to improve.",
    icon: <BarChartHorizontal size={28} />,
  },
  {
    step: "04",
    title: "Apply with Confidence",
    desc: "Once you're interview-ready, apply to jobs knowing you're prepared to succeed.",
    icon: <CheckCircle size={28} />,
  },
];

const HowItWorks = () => {
  return (
    <section className="hiw-section">

      <div className="hiw-container">
        <div className="hiw-header">
          <SectionEyebrow text="The Process" />
          <SectionHeadline text="Your Journey to" gradient_text="Hired" />
          <SectionSubHeadline text="A simple, structured approach to mastering the interview process and landing your dream job." />
        </div>

        <div className="hiw-grid">
          {steps.map((item, _index) => (
            <div key={item.step} className="hiw-item-wrapper">
              <div className="hiw-card">
                <div className="hiw-step-pill">Step {item.step}</div>
                
                <div className="hiw-icon-box">
                  {item.icon}
                </div>

                <h3 className="hiw-card-title">{item.title}</h3>
                <p className="hiw-card-desc">{item.desc}</p>

                <div className="hiw-card-footer">
                  <ArrowRight size={20} className="hiw-arrow-icon" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;