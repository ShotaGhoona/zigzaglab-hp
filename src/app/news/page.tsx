import NewsContainer from "@/page-components/news/ui/NewsContainer";
import { getNewsItemsForUI, getCategoriesForUI } from "@/page-components/news/lib/newsAdapter";

// SSR化: キャッシュを無効化して毎回最新のデータを取得
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function NewsPage() {
  const news = await getNewsItemsForUI();
  const categories = await getCategoriesForUI();

  return <NewsContainer initialNews={news} initialCategories={categories} />;
}