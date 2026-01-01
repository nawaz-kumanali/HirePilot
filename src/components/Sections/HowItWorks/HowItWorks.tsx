import { Search, BrainCircuit, BarChartHorizontal, CheckCircle } from "lucide-react";
import "./howitworks.scss";
import VisualHeader from "../../VisualHeader/VisualHeader";
import HIWCard from "./HIWCard/HIWCard";

const steps = [
  {
    step: "01",
    title: "Browse & Choose",
    desc: "Explore jobs and select roles that match your career goals. Get instant readiness scores.",
    Icon: <Search size={28} />,
  },
  {
    step: "02",
    title: "Train with AI",
    desc: "Practice with AI-powered mock interviews tailored to your target role and experience level.",
    Icon: <BrainCircuit size={28} />,
  },
  {
    step: "03",
    title: "Get Insights",
    desc: "Receive detailed feedback on your performance, skill gaps, and areas to improve.",
    Icon: <BarChartHorizontal size={28} />,
  },
  {
    step: "04",
    title: "Apply with Confidence",
    desc: "Once you're interview-ready, apply to jobs knowing you're prepared to succeed.",
    Icon: <CheckCircle size={28} />,
  },
];

const HowItWorks = () => {
  return (
    <section className="hiw-section">

      <div className="hiw-container">
        <div className="hiw-header">
          <VisualHeader badge="The Process" title="Your Journey to get" gradient_title="Hired" subtitle="A simple, structured approach to mastering the interview process and landing your dream job." />
        </div>

        <div className="hiw-grid">
          {steps.map((item, _index) => (
            <div key={item.step} className="hiw-item-wrapper">
              <HIWCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;