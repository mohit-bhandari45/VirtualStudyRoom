import FeatureSection from "@/components/LandingPageComponents/Feature";
import Footer from "@/components/LandingPageComponents/Footer";
import HeroSection from "@/components/LandingPageComponents/HeroSection";
import HowItWorksSection from "@/components/LandingPageComponents/HowItWorks";
import Navbar from "@/components/LandingPageComponents/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
};

export default Home;
