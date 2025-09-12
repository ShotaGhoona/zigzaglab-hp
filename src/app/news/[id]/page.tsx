import NewsDetail from "@/page-components/news/ui/news-detail";

interface NewsDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  return <NewsDetail newsId={id} />;
}