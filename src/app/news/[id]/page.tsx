import NewsDetail from "@/page-components/news/ui/news-detail";

interface NewsDetailPageProps {
  params: {
    id: string;
  };
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  return <NewsDetail newsId={params.id} />;
}