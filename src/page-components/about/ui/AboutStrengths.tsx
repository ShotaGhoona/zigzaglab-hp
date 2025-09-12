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
      anchor: "original",
      title: "オリジナル商品",
      subtitle: "常に新しい発想から、自社オリジナル商品を開発。",
      features: [
        {
          title: "オリジナル商品の企画・開発",
          description: "独自オリジナル製品を企画・開発し、これまでにない新しい製品やサービスを提供します。特許出願済。商品一覧はこちら。",
          image: "/strength-detail/company_1_1.jpg"
        },
        {
          title: "3DCADを用いた設計力",
          description: "アクリル製品に「動き」を加え、ユニークなグッズを実現。イベントやプロモーションで印象的な製品展開が可能です。",
          image: "/strength-detail/company_1_2.jpeg"
        },
        {
          title: "ものづくりに対しての技術力",
          description: "医療機器業界や産業機器業界向けのものづくりで培った経験を活かし、高い技術力と徹底した品質管理体制でサービスを提供します。安心してご利用いただける製品をお届けしています。",
          image: "/strength-detail/company_1_3.jpg"
        }
      ],
      icon: (
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      ),
      gradient: "from-purple-500/10 to-purple-600/5"
    },
    {
      id: 2,
      anchor: "integrated",
      title: "自社一貫生産",
      subtitle: "自社の工場で一貫生産。印刷から梱包まで。",
      features: [
        {
          title: "月間50万個の製缶体制",
          description: "手動缶バッジマシン20台に加えて、自社工場内に電動装置を10台を保有。月間50万個の生産体制を完備。",
          image: "/strength-detail/company_2_1.jpg"
        },
        {
          title: "最新のオンデマンド印刷機",
          description: "社内に最新のオンデマンド印刷機を導入することで、必要な数量を必要なタイミングで生産可能になりました。白版印刷にも対応しており、大量生産はもちろん、小ロットのリピート発注でも短納期・低コスト・高品質を実現します。",
          image: "/strength-detail/company_2_2.png"
        },
        {
          title: "パッケージの作成",
          description: "グッズ本体の生産だけでなく、グッズを入れる紙封筒や外箱も作成しています。製品とパッケージを個別に手配する必要がないため、納期のコントロールやトラブルを回避し、スムーズな納品が可能です。",
          image: "/strength-detail/company_2_3.jpeg"
        }
      ],
      icon: (
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
      ),
      gradient: "from-blue-500/10 to-blue-600/5"
    },
    {
      id: 3,
      anchor: "acrylic",
      title: "アクリル製品",
      subtitle: "UVプリンタとレーザー加工機を導入し、高品質なアクリル製品を作成",
      features: [
        {
          title: "月間約20万個の生産体制",
          description: "UVプリンタ、レーザー加工機の導入によって月間20万個の生産が可能。",
          image: "/strength-detail/company_3_1.jpeg"
        },
        {
          title: "高品質・高出力レーザー加工機",
          description: "社内にレーザー加工機を4台保有。Mimaki製のUVプリンタで鮮明な印刷を実現でき、高出力のレーザーによってスピーディな加工が可能。1mmのアクリルから10mmのアクリルまで加工できます。",
          image: "/strength-detail/company_3_2.jpeg"
        },
        {
          title: "UVプリント",
          description: "Mimaki製のUVプリンタ(UJF-6042MKII)を２台保有。アクリルへの鮮明な印刷が可能であり、オーロラアクリル製品も製作できます。",
          image: "/strength-detail/company_3_3.jpg"
        }
      ],
      icon: (
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>
      ),
      gradient: "from-cyan-500/10 to-cyan-600/5"
    },
    {
      id: 4,
      anchor: "quality",
      title: "品質管理",
      subtitle: "クリーンルーム内での製造など徹底した品質管理を実施。",
      features: [
        {
          title: "品質管理のノウハウ",
          description: "これまでに医療機器や産業機器の生産に携わる中で、高い精度と安全性が求められる現場で品質管理のノウハウを培ってまいりました。グッズ製作においても徹底した品質管理体制にて常に安定した品質と信頼性の高い製品をご提供いたします。",
          image: "/strength-detail/company_4_1.jpg"
        },
        {
          title: "クリーンルームの設置",
          description: "クリーンルーム内での製造体制により製品の異物の混入を防止。環境の整備によって不良品の発生率も低く、低コストを実現できます。",
          image: "/strength-detail/company_4_2.jpg"
        },
        {
          title: "品質保証への取り組み",
          description: "自社工場では工程ごとに作業スペースを独立させ、厳格な品質管理を実施し、安定した品質をお届けします。",
          image: "/strength-detail/company_4_3.jpg"
        }
      ],
      icon: (
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
      gradient: "from-green-500/10 to-green-600/5"
    }
  ]

  return (
    <section 
      id="about-strengths-section"
      className="py-32 px-4 bg-gradient-to-b from-white to-gray-50/30"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-6 tracking-tight">
              ZIGZAG<span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Lab</span>の強み
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
              技術力と品質管理で、お客様のアイディアを最高の形で実現します。
            </p>
          </div>
        </div>

        {/* Strengths */}
        <div className="space-y-32">
          {strengths.map((strength, index) => (
            <div 
              key={strength.id}
              id={strength.anchor}
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 200}ms` : '0s',
                scrollMarginTop: '200px'
              }}
            >
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-4 mb-6">
                  {strength.icon}
                  <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
                    {strength.title}
                  </h3>
                </div>
                <p className="text-lg text-gray-600 font-light max-w-3xl mx-auto">
                  {strength.subtitle}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                {strength.features.map((feature, featureIndex) => (
                  <div 
                    key={featureIndex} 
                    className="group relative"
                  >
                    {/* Modern geometric card */}
                    <div className="relative bg-white overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-700 h-full flex flex-col">
                      {/* Geometric overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5"></div>
                      
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${strength.gradient} mix-blend-multiply opacity-60`}></div>
                        <Image 
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        
                        {/* Diagonal element */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent"
                             style={{
                               clipPath: 'polygon(50% 0%, 100% 0%, 100% 50%)'
                             }}
                        ></div>
                        
                        {/* Number badge with geometric design */}
                        {/* <div className="absolute top-6 right-6">
                          <div className="relative w-12 h-12 bg-white/95 backdrop-blur-sm flex items-center justify-center text-gray-800 font-bold text-lg shadow-2xl transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                            {featureIndex + 1}
                          </div>
                        </div> */}
                      </div>

                      {/* Content */}
                      <div className="p-8 relative flex-1 flex flex-col">
                        {/* Zigzag accent line */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary"
                             style={{
                               clipPath: 'polygon(0% 0%, 20% 100%, 40% 0%, 60% 100%, 80% 0%, 100% 100%, 100% 0%)'
                             }}
                        ></div>
                        
                        <h4 className="text-xl font-bold text-gray-900 mb-4 mt-4 group-hover:text-primary transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-sm font-light flex-1">
                          {feature.description}
                        </p>
                        
                        {/* Corner accent - subtle geometric element */}
                        <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-primary/20 transform rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
                      </div>
                    </div>

                    {/* Floating geometric elements */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                         style={{
                           clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                         }}
                    ></div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                         style={{
                           clipPath: 'polygon(0% 0%, 100% 0%, 100% 70%, 70% 100%, 0% 100%)'
                         }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}