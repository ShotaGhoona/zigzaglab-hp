import NewsDetail from "@/page-components/news/ui/news-detail";
import { getNewsPostById } from "@/lib/news";
import { notFound } from "next/navigation";

interface NewsDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;

  const newsPost = await getNewsPostById(id);

  if (!newsPost) {
    notFound();
  }

  return <NewsDetail newsPost={newsPost} />;
}