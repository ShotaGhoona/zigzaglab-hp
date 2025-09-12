"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { allProducts, getActiveProducts, type Product } from "@/constants/product"

interface ProductDetailProps {
  productName: string
}

export default function ProductDetail({ productName }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // URLデコードして商品を検索（アクティブな商品のみ）
    const decodedName = decodeURIComponent(productName)
    const foundProduct = allProducts.find(p => p.name === decodedName && p.is_active)
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
      <div className="mt-[60px] min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-primary/5">
        <div className="text-center p-8">
          <div className="bg-white rounded-lg border border-border/20 p-12 shadow-sm">
            <h1 className="text-2xl font-semibold text-foreground mb-4">商品が見つかりません</h1>
            <p className="text-foreground/70 mb-6">お探しの商品は存在しないか、現在公開されていません。</p>
            <button 
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
              ホームに戻る
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* ヘッダー */}
      <header className="border-b border-border/10 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-foreground/5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">戻る</span>
            </button>
            
            <div className="text-sm">
              <span className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium shadow-sm">
                {product.category}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto max-w-6xl px-6 py-16">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* 左側: 画像カルーセル */}
            <div>
              {/* メイン画像 */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden mb-6 border border-border/10">
                <Image 
                  src={product.images[currentImageIndex]}
                  alt={`${product.name} ${currentImageIndex + 1}`}
                  fill
                  className="object-contain p-12 transition-all duration-500"
                  priority
                />
                
                {/* カルーセル操作ボタン */}
                {product.images.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 text-foreground border border-border/20 rounded-lg flex items-center justify-center hover:bg-white hover:shadow-md transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button 
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 text-foreground border border-border/20 rounded-lg flex items-center justify-center hover:bg-white hover:shadow-md transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                              ? 'bg-primary w-6' 
                              : 'bg-white/60 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* サムネイル */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-300 group ${
                        index === currentImageIndex 
                          ? 'border-primary shadow-md scale-105' 
                          : 'border-border/20 hover:border-primary/50 hover:shadow-sm'
                      }`}
                    >
                      <Image 
                        src={image}
                        alt={`${product.name} 画像 ${index + 1}`}
                        fill
                        className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* アクティブインジケーター */}
                      {index === currentImageIndex && (
                        <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full shadow-sm"></div>
                      )}
                      {/* 画像番号 */}
                      <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                        {index + 1}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 右側: 商品詳細 */}
            <div className="space-y-10">
              {/* 商品名とサブタイトル */}
              <div>
                <h1 className="text-3xl font-semibold text-foreground mb-4 leading-tight">
                  {product.name}
                </h1>
                <p className="text-lg text-primary font-medium leading-relaxed">
                  {product.subtitle}
                </p>
              </div>

              {/* 説明文 */}
              <div className="bg-white rounded-lg border border-border/10 p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">商品説明</h2>
                <p className="text-foreground/80 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* 特徴 */}
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-border/10 p-6">
                <h3 className="font-semibold text-foreground mb-4">特徴</h3>
                {product.category === 'アクリル' && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-foreground/70">A2サイズまでの印刷カットが可能</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-foreground/70">オーロラ加工などの特殊加工対応</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-foreground/70">透明感と強度を兼ね備えた高品質素材</span>
                    </div>
                  </div>
                )}
                {product.category === '缶バッジ' && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-foreground/70">ホログラム加工対応</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-foreground/70">様々なサイズバリエーション</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-foreground/70">小ロットから大ロットまで対応</span>
                    </div>
                  </div>
                )}
                {product.category === 'その他' && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-foreground/70">様々なサイズに対応</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-foreground/70">ディスプレイ効果を最大化</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-foreground/70">イベントや店頭での扱いやすさ</span>
                    </div>
                  </div>
                )}
              </div>

              {/* アクションボタン */}
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    const section = document.getElementById('contact-section')
                    if (section) {
                      router.push('/#contact-section')
                    } else {
                      router.push('/')
                    }
                  }}
                  className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-sm"
                >
                  この商品についてお問い合わせ
                </button>
                <button 
                  onClick={() => router.push('/#integrated-product-section')}
                  className="w-full px-8 py-4 bg-white border border-border/20 text-foreground rounded-lg font-medium hover:bg-foreground/5 transition-all duration-300"
                >
                  他の商品を見る
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 関連商品 */}
        <section className={`mt-24 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              同じカテゴリの商品
            </h2>
            <p className="text-foreground/60">他の{product.category}商品もご覧ください</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {getActiveProducts()
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 3)
              .map((relatedProduct) => (
                <button
                  key={relatedProduct.id}
                  onClick={() => router.push(`/product/${encodeURIComponent(relatedProduct.name)}`)}
                  className="group bg-white border border-border/10 rounded-lg overflow-hidden hover:border-border/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-left"
                >
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    <Image 
                      src={relatedProduct.mainImage}
                      alt={relatedProduct.name}
                      fill
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-foreground/60 line-clamp-2">
                      {relatedProduct.subtitle}
                    </p>
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