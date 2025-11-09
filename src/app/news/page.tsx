import NewsContainer from "@/page-components/news/ui/NewsContainer";
import { getNewsItemsForUI, getCategoriesForUI } from "@/page-components/news/lib/newsAdapter";

export default async function NewsPage() {
  const news = await getNewsItemsForUI();
  const categories = await getCategoriesForUI();

  return <NewsContainer initialNews={news} initialCategories={categories} />;
}