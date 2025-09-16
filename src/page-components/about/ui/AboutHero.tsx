"use client"

import { useEffect, useState } from "react"

export default function AboutHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative py-32 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-foreground mb-8">
            ZIGZAG<span className="font-bold text-primary">Lab</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto font-light leading-relaxed mb-12">
            品質にこだわったグッズを作成しませんか？<br />
            小ロットから大ロットまで幅広く対応いたします。
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">自社一貫</div>
              <div className="text-sm text-foreground/60 uppercase tracking-wide">ワンストップで内製対応</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50万個/月</div>
              <div className="text-sm text-foreground/60 uppercase tracking-wide">缶バッジ生産可能</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">20万個/月</div>
              <div className="text-sm text-foreground/60 uppercase tracking-wide">アクリル製品生産可能</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">品質管理</div>
              <div className="text-sm text-foreground/60 uppercase tracking-wide">クリーンルーム内での生産</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}