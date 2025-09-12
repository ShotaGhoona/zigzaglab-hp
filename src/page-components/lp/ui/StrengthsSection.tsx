"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function StrengthsSection() {
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

    const section = document.getElementById('strengths-section')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const strengths = [
    {
      id: 1,
      category: "💎 オリジナル",
      title: "オリジナル商品",
      description: "市場のニーズに合わせた自社オリジナル商品を多数開発。",
      image: "/strength/オリジナル商品.jpg",
      delay: "0s",
      anchor: "original"
    },
    {
      id: 2,
      category: "🏭 一貫生産",
      title: "自社一貫生産",
      description: "自社の工場で一貫生産。小ロットの生産から大量生産まで対応可能です。",
      image: "/strength/自社一貫生産.JPG",
      delay: "0.2s",
      anchor: "integrated"
    },
    {
      id: 3,
      category: "✨ アクリル",
      title: "アクリル商品",
      description: "UVプリンタとレーザー加工機を導入し、高品質なアクリル製品も作成可能。",
      image: "/strength/アクリル製品.jpeg",
      delay: "0.4s",
      anchor: "acrylic"
    },
    {
      id: 4,
      category: "🔍 品質管理",
      title: "品質管理",
      description: "クリーンルーム内での製造など徹底した品質管理を実施。",
      image: "/strength/品質管理.jpg",
      delay: "0.6s",
      anchor: "quality"
    }
  ]

  return (
    <section 
      id="strengths-section"
      className="py-24 px-6 bg-gradient-to-b from-background to-primary/5"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              ZIGZAGLabの<span className="text-primary">強み</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              技術力と品質管理で、お客様のアイディアを最高の形で実現します。
            </p>
          </div>
        </div>

        {/* Strengths Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
          {strengths.map((strength) => (
            <Link href={`/about#${strength.anchor}`} key={strength.id}>
              <div
                className={`group transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ 
                  transitionDelay: isVisible ? strength.delay : '0s' 
                }}
              >
                <div className="relative overflow-hidden bg-white rounded-lg shadow-sm border border-border/10 hover:shadow-md hover:border-border/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  {/* Image Section */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={strength.image}
                      alt={strength.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-300"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border/20">
                        <span className="text-xs font-medium text-foreground">{strength.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {strength.title}
                    </h3>
                    
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {strength.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* About詳細ページへのCTA */}
        <div className="text-center mt-16">
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-border/10 py-8 px-6">
              <p className="text-foreground/70 mb-4">ZIGZAGLabの詳しい情報をご覧ください</p>
              <Link 
                href="/about"
                className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-sm"
              >
                詳しく見る
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* 背景装飾 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/6 left-1/12 w-32 h-32 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-1/6 right-1/12 w-24 h-24 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </section>
  )
}