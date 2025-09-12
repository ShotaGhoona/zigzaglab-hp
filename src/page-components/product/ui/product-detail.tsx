"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { allProducts, type Product } from "@/constants/product"

interface ProductDetailProps {
  productName: string
}

export default function ProductDetail({ productName }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // URLデコードして商品を検索
    const decodedName = decodeURIComponent(productName)
    const foundProduct = allProducts.find(p => p.name === decodedName)
    setProduct(foundProduct || null)
    
    // アニメーション用
    setIsVisible(true)
  }, [productName])

  const handlePrevImage = () => {
    if (product) {
      setCurrentImageIndex(prev => 
        prev === 0 ? product.images.length - 1 : prev - 1
      )
    }
  }

  const handleNextImage = () => {
    if (product) {
      setCurrentImageIndex(prev => 
        prev === product.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">商品が見つかりません</h1>
          <button 
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            ホームに戻る
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      {/* ヘッダー */}
      <header className="border-b border-border/20 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              戻る
            </button>
            
            <div className="text-sm text-foreground/60">
              <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full font-medium">
                {product.category}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto max-w-6xl px-6 py-12">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* 左側: 画像カルーセル */}
            <div>
              {/* メイン画像 */}
              <div className="relative aspect-square bg-white rounded-2xl overflow-hidden mb-6 shadow-lg">
                <Image 
                  src={product.images[currentImageIndex]}
                  alt={`${product.name} ${currentImageIndex + 1}`}
                  fill
                  className="object-contain p-8 transition-all duration-500"
                  priority
                />
                
                {/* カルーセル操作ボタン */}
                {product.images.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-300"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button 
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-300"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    
                    {/* インジケーター */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'bg-white w-6' 
                              : 'bg-white/50 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* サムネイル */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-primary' : 'border-border/20 hover:border-primary/50'
                      }`}
                    >
                      <Image 
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain p-2"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 右側: 商品詳細 */}
            <div className="space-y-8">
              {/* 商品名とサブタイトル */}
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>
                <p className="text-xl text-primary font-medium mb-6">
                  {product.subtitle}
                </p>
              </div>

              {/* 説明文 */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">商品説明</h2>
                <p className="text-foreground/70 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              {/* 特徴 */}
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6">
                <h3 className="font-bold text-foreground mb-4 text-lg">特徴</h3>
                {product.category === 'アクリル' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-foreground/70">A2サイズまでの印刷カットが可能</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-foreground/70">オーロラ加工などの特殊加工対応</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-foreground/70">透明感と強度を兼ね備えた高品質素材</span>
                    </div>
                  </div>
                )}
                {product.category === '缶バッジ' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-foreground/70">ホログラム加工対応</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-foreground/70">様々なサイズバリエーション</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-foreground/70">小ロットから大ロットまで対応</span>
                    </div>
                  </div>
                )}
                {product.category === 'その他' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-foreground/70">様々なサイズに対応</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-foreground/70">ディスプレイ効果を最大化</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-foreground/70">イベントや店頭での扱いやすさ</span>
                    </div>
                  </div>
                )}
              </div>

              {/* アクションボタン */}
              <div className="space-y-4">
                <button 
                  onClick={() => {
                    const section = document.getElementById('contact-section')
                    if (section) {
                      router.push('/#contact-section')
                    } else {
                      router.push('/')
                    }
                  }}
                  className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  この商品についてお問い合わせ
                </button>
                <button 
                  onClick={() => router.push('/#integrated-product-section')}
                  className="w-full px-8 py-4 border border-border/20 text-foreground rounded-lg font-medium hover:bg-foreground/5 transition-all duration-300"
                >
                  他の商品を見る
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 関連商品 */}
        <section className={`mt-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            同じカテゴリの商品
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {allProducts
              .filter(p => p.category === product.category && p.name !== product.name)
              .slice(0, 4)
              .map((relatedProduct) => (
                <button
                  key={relatedProduct.name}
                  onClick={() => router.push(`/product/${encodeURIComponent(relatedProduct.name)}`)}
                  className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative aspect-square bg-white overflow-hidden">
                    <Image 
                      src={relatedProduct.mainImage}
                      alt={relatedProduct.name}
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                  </div>
                </button>
              ))
            }
          </div>
        </section>
      </main>
    </div>
  )
}