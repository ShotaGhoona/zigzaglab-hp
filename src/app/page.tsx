import ContactSection from "@/page-components/lp/ui/ContactSection";
import StrengthsSection from "@/page-components/lp/ui/StrengthsSection";
// import QualityShowcase from "@/page-components/lp/ui/QualityShowcase";
import IntegratedProductSection from "@/page-components/lp/ui/IntegratedProductSection";
import ProcessSection from "@/page-components/lp/ui/ProcessSection";
import HeroSection from "@/page-components/lp/ui/HeroSection";
import NewsSection from "@/page-components/news/ui/NewsSection";
import { getNewsItemsForUI } from "@/page-components/news/lib/newsAdapter";

// SSR化: キャッシュを無効化して毎回最新のデータを取得
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Index() {
  const newsItems = await getNewsItemsForUI();

  return (
    <div className="min-h-screen">
      <HeroSection />
      <IntegratedProductSection />
      <StrengthsSection />
      {/* <QualityShowcase /> */}
      <ProcessSection />
      <NewsSection newsItems={newsItems} />
      <ContactSection />
    </div>
  );
}