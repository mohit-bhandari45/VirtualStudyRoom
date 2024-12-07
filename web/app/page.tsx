import Navbar from "@/components/LandingPageComponents/Navbar";
import HeroSection from "@/components/LandingPageComponents/HeroSection";
import FeatureSection from "@/components/LandingPageComponents/FeatureSection";
import HowItWorksSection from "@/components/LandingPageComponents/HowItWorksSection";
import Footer from "@/components/LandingPageComponents/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
}

export default Home;
