import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PropertyGrid from "@/components/PropertyGrid";
import HowItWorks from "@/components/HowItWorks";
import TrustSection from "@/components/TrustSection";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <PropertyGrid />
      <HowItWorks />
      <TrustSection />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </>
  );
}
