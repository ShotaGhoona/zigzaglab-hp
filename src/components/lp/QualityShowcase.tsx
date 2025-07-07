"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function QualityShowcase() {
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
      { threshold: 0.2 }
    )

    const section = document.getElementById('quality-section')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const qualityFeatures = [
    {
      number: "01",
      title: "複雑な立体形状",
      subtitle: "Complex 3D Shapes",
      description: "立体アクリルスタンドの企画や修正を行い、難しい形状やあっ！と目を引く作品も制作いたします。",
      path: "/quality01.png"
    },
    {
      number: "02",
      title: "品質管理",
      subtitle: "Quality Control",
      description: "徹底した品質管理を実施。クリーンルーム内での製造により汚れや傷の発生を防ぎます。",
      path: "/quality02.png"
    }
  ]

  return (
    <section 
      id="quality-section"
      className="py-24 px-6 bg-gradient-to-b from-background to-primary/2"
    >
      <div className="container mx-auto max-w-7xl">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-5xl md:text-6xl font-light text-foreground mb-6">
            品質への<span className="font-bold text-primary">こだわり</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-3xl mx-auto font-light leading-relaxed">
            ～試行錯誤の品質追求が、お客様の信頼に応える製品を生み出します。～
          </p>
        </div>

        <div className="space-y-32">
          {qualityFeatures.map((feature, index) => (
            <div 
              key={feature.number}
              className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              style={{ transitionDelay: `${index * 200 + 300}ms` }}
            >
              {/* 画像セクション */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative group">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
                    <Image 
                      src={feature.path}
                      alt={feature.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-6 left-6">
                    <div className="w-16 h-16 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">{feature.number}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* コンテンツセクション */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-primary font-medium tracking-wider uppercase mb-2">
                      {feature.subtitle}
                    </p>
                    <h3 className="text-4xl font-light text-foreground mb-4">
                      {feature.title}
                    </h3>
                    <div className="w-16 h-0.5 bg-primary"></div>
                  </div>
                  
                  <p className="text-lg text-foreground/70 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}