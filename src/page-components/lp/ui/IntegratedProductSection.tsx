"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { allProducts, type Product } from "@/constants/product"

export default function IntegratedProductSection() {
  const [selectedCategory, setSelectedCategory] = useState("ALL")
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('integrated-product-section')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const categories = ["ALL", "缶バッジ", "アクリル", "その他"]

  const filteredProducts = selectedCategory === "ALL" 
    ? allProducts 
    : allProducts.filter(product => product.category === selectedCategory)

  const handleProductClick = (product: Product) => {
    router.push(`/product/${encodeURIComponent(product.name)}`)
  }


  return (
    <section 
      id="integrated-product-section"
      className="py-16 px-4 bg-gradient-to-b from-background to-primary/5"
    >
      <div className="container mx-auto max-w-7xl">
        {/* セクションヘッダー */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            ZIGZAG<span className="text-primary">グッズ</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            身に着けても飾っても目を引く、高品質なオリジナルグッズ。
          </p>
        </div>

        {/* カテゴリフィルター */}
        <div className={`flex justify-center mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-wrap gap-2 p-2 bg-card/50 rounded-xl">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 商品ギャラリー */}
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.name}
                onClick={() => handleProductClick(product)}
                className={`group cursor-pointer bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: isVisible ? `${index * 100}ms` : '0s' 
                }}
              >
                {/* 商品画像 - Square */}
                <div className="relative aspect-square bg-white overflow-hidden">
                  <Image 
                    src={product.mainImage}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* 商品情報 */}
                <div className="p-3">
                  <h3 className="font-bold text-foreground text-sm mb-1 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {product.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* CTA */}
        <div className="text-center mt-12">
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-foreground/70 mb-6">
              お見積り・ご相談はお気軽にお問い合わせください
            </p>
            <button 
              onClick={() => {
                const section = document.getElementById('contact-section')
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              お問い合わせ
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  )
}