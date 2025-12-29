import CTA from "../../components/Sections/CTA/CTA";
import Features from "../../components/Sections/Features/Features";
import Hero from "../../components/Sections/Hero/Hero";
import HowItWorks from "../../components/Sections/HowItWorks/HowItWorks";
import TrainingTracks from "../../components/Sections/TrainingTracks/TrainingTracks";
import "./home.scss";

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <HowItWorks />
      <Features />
      <TrainingTracks />
      <CTA />
    </div>
  );
};

export default Home;
