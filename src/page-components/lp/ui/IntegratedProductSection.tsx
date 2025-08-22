"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function IntegratedProductSection() {
  const [selectedCategory, setSelectedCategory] = useState("全て")
  const [isVisible, setIsVisible] = useState(false)

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
  const allProducts = [
    // ZIGZAGグッズ
    {
      name: "スタンド付き缶バッジ",
      category: "ZIGZAGグッズ",
      description: "展示用としても活用可能な実用性が特長。",
      detail: "バッジとしての使用はもちろん、立てて飾れるスタンド機能付きで、陳列・展示にも対応します。",
      image: "/product/01/03.png",
    },
    {
      name: "チャーム付き缶バッジ",
      category: "ZIGZAGグッズ", 
      description: "揺れるチャームがアクセント。",
      detail: "缶バッジにチャームを組み合わせることで、動きと立体感をプラスした高付加価値アイテムです。",
      image: "/product/01/04.png",
    },
    {
      name: "缶ストラップ",
      category: "ZIGZAGグッズ",
      description: "持ち歩きに適したコンパクトなデザイン。",
      detail: "缶バッジのデザイン性を活かしたストラップ仕様。携帯性に優れ、常時のプロモーションツールとして活用できます。",
      image: "/product/01/05.png",
    },
    {
      name: "ツインフェイスストラップ",
      category: "ZIGZAGグッズ",
      description: "両面にデザインを施すことで視認性を向上。",
      detail: "表裏で異なるデザインを楽しめる2面構成。用途やシーンに応じた訴求が可能です。",
      image: "/product/01/06.png",
    },
    {
      name: "連結ストラップ",
      category: "ZIGZAGグッズ",
      description: "複数モチーフを一体化した連携型仕様。",
      detail: "複数の缶バッジを連結させることで、シリーズ性・コレクション性を演出できます。キャラクター展開に最適です。",
      image: "/product/01/07.png",
    },
    // アクリルグッズ
    {
      name: "アクリルスタンド",
      category: "アクリルグッズ",
      description: "安定感と透明感が特徴のディスプレイ向けアイテム。",
      detail: "透明感と強度を兼ね備えたアクリル製のスタンド型アイテム。ディスプレイ性に優れ、飾って楽しむ商品として人気です。",
      image: "/product/02/01.png",
    },
    {
      name: "アクリルキーホルダー",
      category: "アクリルグッズ",
      description: "実用性と視覚的訴求を両立したアクセサリー。",
      detail: "厚みと高精細印刷による視覚的なインパクトが特徴。日常使いのアイテムとしても優れた訴求効果があります。",
      image: "/product/02/02.png",
    },
    {
      name: "アクリル観覧車",
      category: "アクリルグッズ",
      description: "可動性と装飾性を備えた立体構造。",
      detail: "アクリルパーツを使用した回転式のディスプレイ型アイテム。複数キャラクターを一体で展開できます。",
      image: "/product/02/03.png",
    },
    {
      name: "アクリルバイキング",
      category: "アクリルグッズ",
      description: "ダイナミックな演出が可能な可動タイプ。",
      detail: "可動性を持たせた仕様で、視覚的に動きのある演出が可能。遊び心と高級感を両立しています。",
      image: "/product/02/05.png",
    },
    {
      name: "アクリルブランコ",
      category: "アクリルグッズ",
      description: "柔らかな動きが視覚的効果を高めます。",
      detail: "キャラクターやモチーフがゆらゆらと揺れる仕掛け付き。癒し効果と独自性を兼ね備えた商品です。",
      image: "/product/02/06.png",
    },
    // 周辺グッズ
    {
      name: "缶バッジスタンド_サークル",
      category: "周辺グッズ",
      description: "丸型缶バッジの展示に最適な専用台座。",
      detail: "円形缶バッジの展示に特化した専用スタンド。シンプルな構造で、イベントや店頭でも扱いやすい設計です。",
      image: "/product/03/01.png",
    },
    {
      name: "缶バッジスタンド_ハート",
      category: "周辺グッズ",
      description: "ハート型バッジを美しく飾る専用設計。",
      detail: "ハート型缶バッジの形状にフィットした専用スタンド。製品の魅力を最大限に引き出す什器として活用できます。",
      image: "/product/03/02.png",
    },
  ]

  const categories = ["全て", "ZIGZAGグッズ", "アクリルグッズ", "周辺グッズ"]

  const filteredProducts = selectedCategory === "全て" 
    ? allProducts 
    : allProducts.filter(product => product.category === selectedCategory)

  return (
    <section 
      id="integrated-product-section"
      className="py-16 px-4 bg-gradient-to-b from-background to-primary/5"
    >
      <div className="container mx-auto max-w-7xl">
        {/* セクションヘッダー */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            商品<span className="text-primary">ラインナップ</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            高品質なオリジナルグッズを豊富に取り揃えています
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.name}
                className={`group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: isVisible ? `${index * 100}ms` : '0s' 
                }}
              >
                {/* 商品画像 */}
                <div className="relative aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                  <Image 
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* カテゴリバッジ */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* 商品情報 */}
                <div className="p-4">
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed mb-2">
                    {product.description}
                  </p>
                  <p className="text-xs text-foreground/60 leading-relaxed">
                    {product.detail}
                  </p>
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
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg">
              お問い合わせ
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}