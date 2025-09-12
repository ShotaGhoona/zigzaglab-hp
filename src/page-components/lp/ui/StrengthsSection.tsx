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
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&crop=center",
      delay: "0s"
    },
    {
      id: 2,
      category: "🏭 一貫生産",
      title: "自社一貫生産",
      description: "自社の工場で一貫生産。小ロットの生産から大量生産まで対応可能です。",
      image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=400&h=300&fit=crop&crop=center",
      delay: "0.2s"
    },
    {
      id: 3,
      category: "✨ アクリル",
      title: "アクリル商品",
      description: "UVプリンタとレーザー加工機を導入し、高品質なアクリル製品も作成可能。",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center",
      delay: "0.4s"
    },
    {
      id: 4,
      category: "🔍 品質管理",
      title: "品質管理",
      description: "クリーンルーム内での製造など徹底した品質管理を実施。",
      image: "https://images.unsplash.com/photo-1576669801775-ff43c5ab079d?w=400&h=300&fit=crop&crop=center",
      delay: "0.6s"
    }
  ]

  return (
    <section 
      id="strengths-section"
      className="py-20 px-4 bg-gradient-to-b from-background to-background/50"
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

        {/* Strengths Grid - Completely Redesigned */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 lg:gap-10">
          {strengths.map((strength) => (
            <Link href="/about">
            <div
              key={strength.id}
              className={`group transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ 
                transitionDelay: isVisible ? strength.delay : '0s' 
              }}
            >
              <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group">
                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={strength.image}
                    alt={strength.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <span className="text-sm font-medium text-gray-800">{strength.category}</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                    {strength.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {strength.description}
                  </p>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>
            </Link>
          ))}
        </div>

        {/* About詳細ページへのCTA */}
        <div className="text-center mt-16">
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link 
              href="/about"
              className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              詳しく見る
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Next-Level Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/6 left-1/12 w-60 h-60 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-red-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/6 right-1/12 w-48 h-48 bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-blue-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-gradient-to-r from-purple-500/10 via-blue-500/15 to-cyan-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2.5s' }}></div>
        </div>
      </div>
    </section>
  )
}