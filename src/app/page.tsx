import ContactSection from "@/page-components/lp/ui/ContactSection";
import StrengthsSection from "@/page-components/lp/ui/StrengthsSection";
// import QualityShowcase from "@/page-components/lp/ui/QualityShowcase";
import IntegratedProductSection from "@/page-components/lp/ui/IntegratedProductSection";
import ProcessSection from "@/page-components/lp/ui/ProcessSection";
import HeroSection from "@/page-components/lp/ui/HeroSection";
import NewsSection from "@/page-components/news/ui/NewsSection";

export default function Index() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StrengthsSection />
      {/* <QualityShowcase /> */}
      <IntegratedProductSection />
      <ProcessSection />
      <NewsSection />
      <ContactSection />  
    </div>
  );
}