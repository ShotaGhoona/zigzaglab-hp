import ProductDetail from "@/page-components/product/ui/product-detail";

interface ProductDetailPageProps {
  params: {
    name: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return <ProductDetail productName={params.name} />;
}