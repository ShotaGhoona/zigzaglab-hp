"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { getActiveProducts, categories, type Product } from "@/constants/product"

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

  const activeProducts = getActiveProducts()
  
  const filteredProducts = selectedCategory === "ALL" 
    ? activeProducts 
    : activeProducts.filter(product => product.category === selectedCategory)

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
        <div className={`flex justify-center mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-wrap gap-1 p-1 bg-white border border-border/20 rounded-lg shadow-sm">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 font-medium transition-all duration-300 rounded-md ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-sm'
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id}
                onClick={() => handleProductClick(product)}
                className={`group cursor-pointer bg-white border border-border/10 hover:border-border/30 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-lg ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: isVisible ? `${index * 80}ms` : '0s' 
                }}
              >
                {/* 商品画像 */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                  <Image 
                    src={product.mainImage}
                    alt={product.name}
                    fill
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* カテゴリバッジ */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-foreground/80 text-xs px-2 py-1 rounded-md font-medium border border-border/20">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* 商品情報 */}
                <div className="p-5">
                  <h3 className="font-semibold text-foreground text-base mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-sm text-foreground/60 line-clamp-2 leading-relaxed">
                    {product.subtitle}
                  </p>
                  
                  {/* 詳細を見るアロー */}
                  <div className="flex items-center justify-end mt-4 text-primary group-hover:translate-x-1 transition-transform duration-300">
                    <span className="text-xs font-medium mr-1">詳細を見る</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
      
    </section>
  )
}