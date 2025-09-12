"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function AboutStrengths() {
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

    const section = document.getElementById('about-strengths-section')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const strengths = [
    {
      id: 1,
      title: "オリジナル商品",
      subtitle: "常に新しい発想から、自社オリジナル商品を開発。",
      features: [
        {
          title: "オリジナル商品の企画・開発",
          description: "独自オリジナル製品を企画・開発し、これまでにない新しい製品やサービスを提供します。特許出願済。商品一覧はこちら。"
        },
        {
          title: "3DCADを用いた設計力",
          description: "アクリル製品に「動き」を加え、ユニークなグッズを実現。イベントやプロモーションで印象的な製品展開が可能です。"
        },
        {
          title: "ものづくりに対しての技術力",
          description: "医療機器業界や産業機器業界向けのものづくりで培った経験を活かし、高い技術力と徹底した品質管理体制でサービスを提供します。安心してご利用いただける製品をお届けしています。"
        }
      ],
      icon: (
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      ),
      bgColor: "from-purple-50 to-purple-100/50",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
      delay: "0s"
    },
    {
      id: 2,
      title: "自社一貫生産",
      subtitle: "自社の工場で一貫生産。印刷から梱包まで。",
      features: [
        {
          title: "月間50万個の製缶体制",
          description: "手動缶バッジマシン20台に加えて、自社工場内に電動装置を10台を保有。月間50万個の生産体制を完備。"
        },
        {
          title: "最新のオンデマンド印刷機",
          description: "社内に最新のオンデマンド印刷機を導入することで、必要な数量を必要なタイミングで生産可能になりました。白版印刷にも対応しており、大量生産はもちろん、小ロットのリピート発注でも短納期・低コスト・高品質を実現します。"
        },
        {
          title: "パッケージの作成",
          description: "グッズ本体の生産だけでなく、グッズを入れる紙封筒や外箱も作成しています。製品とパッケージを個別に手配する必要がないため、納期のコントロールやトラブルを回避し、スムーズな納品が可能です。"
        }
      ],
      icon: (
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
      ),
      bgColor: "from-blue-50 to-blue-100/50",
      imageUrl: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=600&h=400&fit=crop",
      delay: "0.2s"
    },
    {
      id: 3,
      title: "アクリル製品",
      subtitle: "UVプリンタとレーザー加工機を導入し、高品質なアクリル製品を作成",
      features: [
        {
          title: "月間約20万個の生産体制",
          description: "UVプリンタ、レーザー加工機の導入によって月間20万個の生産が可能。"
        },
        {
          title: "高品質・高出力レーザー加工機",
          description: "社内にレーザー加工機を4台保有。Mimaki製のUVプリンタで鮮明な印刷を実現でき、高出力のレーザーによってスピーディな加工が可能。1mmのアクリルから10mmのアクリルまで加工できます。"
        },
        {
          title: "UVプリント",
          description: "Mimaki製のUVプリンタ(UJF-6042MKII)を２台保有。アクリルへの鮮明な印刷が可能であり、オーロラアクリル製品も製作できます。"
        }
      ],
      icon: (
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>
      ),
      bgColor: "from-cyan-50 to-cyan-100/50",
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
      delay: "0.4s"
    },
    {
      id: 4,
      title: "品質管理",
      subtitle: "クリーンルーム内での製造など徹底した品質管理を実施。",
      features: [
        {
          title: "品質管理のノウハウ",
          description: "これまでに医療機器や産業機器の生産に携わる中で、高い精度と安全性が求められる現場で品質管理のノウハウを培ってまいりました。グッズ製作においても徹底した品質管理体制にて常に安定した品質と信頼性の高い製品をご提供いたします。"
        },
        {
          title: "クリーンルームの設置",
          description: "クリーンルーム内での製造体制により製品の異物の混入を防止。環境の整備によって不良品の発生率も低く、低コストを実現できます。"
        },
        {
          title: "品質保証への取り組み",
          description: "自社工場では工程ごとに作業スペースを独立させ、厳格な品質管理を実施し、安定した品質をお届けします。"
        }
      ],
      icon: (
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
      bgColor: "from-green-50 to-green-100/50",
      imageUrl: "https://images.unsplash.com/photo-1576669801775-ff43c5ab079d?w=600&h=400&fit=crop",
      delay: "0.6s"
    }
  ]

  return (
    <section 
      id="about-strengths-section"
      className="py-20 px-4 bg-gradient-to-b from-background to-background/50"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              ZIGZAGLabの<span className="text-primary">強み</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              技術力と品質管理で、お客様のアイディアを最高の形で実現します。
            </p>
          </div>
        </div>

        {/* Strengths */}
        <div className="space-y-32">
          {strengths.map((strength, index) => (
            <div 
              key={strength.id}
              className={`relative transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ 
                transitionDelay: isVisible ? strength.delay : '0s' 
              }}
            >
              {/* Background decorative elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute ${index % 2 === 0 ? 'top-10 right-10' : 'top-10 left-10'} w-32 h-32 opacity-5`}>
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M10,50 L30,20 L50,50 L70,20 L90,50" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <div className={`absolute ${index % 2 === 0 ? 'bottom-20 left-20' : 'bottom-20 right-20'} w-24 h-24 bg-primary/5 rounded-full blur-xl`}></div>
              </div>

              <div className="grid lg:grid-cols-12 gap-12 items-start">
                {/* Content Side */}
                <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  {/* Header */}
                  <div className="mb-12">
                    <div className="flex items-start gap-6 mb-8">
                      <div className="flex-1">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                          {strength.title}
                        </h3>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
                        <p className="text-lg text-foreground/70 font-medium leading-relaxed">
                          {strength.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="space-y-8">
                    {strength.features.map((feature, featureIndex) => (
                      <div 
                        key={featureIndex} 
                        className="group/feature relative"
                      >
                        {/* Feature number line */}
                        <div className="flex gap-6">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover/feature:scale-110 transition-transform duration-300">
                              {featureIndex + 1}
                            </div>
                            {featureIndex < strength.features.length - 1 && (
                              <div className="w-px h-16 bg-gradient-to-b from-primary/30 to-transparent mt-4"></div>
                            )}
                          </div>
                          
                          <div className="flex-1 pb-8">
                            <h4 className="text-xl font-bold text-foreground mb-4 group-hover/feature:text-primary transition-colors duration-300">
                              {feature.title}
                            </h4>
                            <p className="text-foreground/70 leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Side */}
                <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative group">
                    {/* Main image container */}
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-700">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
                      <Image 
                        src={strength.imageUrl}
                        alt={strength.title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>
                      
                      {/* Floating elements */}
                      <div className="absolute top-6 right-6">
                        <div className="w-12 h-12 bg-background/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl rotate-12 group-hover:rotate-0 transition-transform duration-700"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}