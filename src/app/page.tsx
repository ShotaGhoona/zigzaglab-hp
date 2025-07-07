import ContactSection from "@/components/lp/ContactSection";
import StrengthsSection from "@/components/lp/StrengthsSection";
import QualityShowcase from "@/components/lp/QualityShowcase";
import IntegratedProductSection from "@/components/lp/IntegratedProductSection";
import ProcessSection from "@/components/lp/ProcessSection";
import HeroSection from "@/components/lp/HeroSection";

export default function Index() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StrengthsSection />
      <QualityShowcase />
      <IntegratedProductSection />
      <ProcessSection />
      <ContactSection />  
    </div>
  );
}