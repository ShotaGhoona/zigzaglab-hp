import ProductDetail from "@/page-components/product/ui/product-detail";

interface ProductDetailPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { name } = await params;
  return <ProductDetail productName={name} />;
}