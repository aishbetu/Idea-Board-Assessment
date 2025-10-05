import React from 'react';
import { HeroSection } from './(sections)/HeroSection';
import { FeaturesSection } from './(sections)/FeatuerSection';
import { CTASection } from './(sections)/CTASection';
import { Footer } from './(sections)/Footer';


// Main Landing Page Component
const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;