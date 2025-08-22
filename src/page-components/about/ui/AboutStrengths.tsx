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
      title: "自社一貫生産の強み",
      subtitle: "自社の工場で一貫生産。材料から国産にこだわったオールジャパンのモノづくり",
      features: [
        {
          title: "国産素材を使ったモノづくり",
          description: "アクリルキーホルダーに使用するアクリル素材はすべて国産品を採用。透明度や耐久性、加工精度において高品質を誇ります。素材選びから「安心の国産」にこだわることで、製品全体の完成度を高めています。"
        },
        {
          title: "自社工場で完結する一貫体制",
          description: "デザイン、加工、印刷、組立、検品までをすべて自社工場で一貫して行っています。外注に頼らない体制だからこそ、品質・納期・コストを高水準でコントロール可能。OEMや小ロットにも柔軟に対応します。"
        },
        {
          title: "高精度×大量生産の工場品質",
          description: "自社工場にはUVプリント機やレーザーカッターを完備し、細部まで美しい仕上がりを実現。高精度な加工に加え、アクリル製品は月間約10万個の量産体制も整えています。品質とスピードを両立した、信頼の「工場品質」をお届けします。"
        }
      ],
      icon: (
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
      bgColor: "from-blue-50 to-blue-100/50",
      imageUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=400&fit=crop",
      delay: "0s"
    },
    {
      id: 2,
      title: "少量も大量も柔軟対応",
      subtitle: "オンデマンド印刷機の導入によって、小ロットの生産から大量生産まで対応可能",
      features: [
        {
          title: "オンデマンド印刷機を自社導入",
          description: "自社にオンデマンド印刷機を導入することで、必要な数量を必要なタイミングで生産可能になりました。小ロットからでも無駄なく対応でき、短納期・低コスト・高品質を実現。多品種・多用途に柔軟に対応します。"
        },
        {
          title: "最大45万個の大量生産も可能",
          description: "自社工場における生産体制により、月間最大約45万個までの大量生産にも対応。品質を保ちながら、納期・コスト・数量すべてに柔軟な対応が可能です。全国規模のキャンペーンや販促にも最適です。"
        },
        {
          title: "リピート注文にも安心対応",
          description: "同じ仕様のリピート生産にも迅速に対応可能。自社一貫体制とオンデマンド印刷の強みを活かし、追加注文も安定した品質でご提供します。数量やタイミングを問わず、安心してご利用いただけます。"
        }
      ],
      icon: (
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        </div>
      ),
      bgColor: "from-green-50 to-green-100/50",
      imageUrl: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&h=400&fit=crop",
      delay: "0.2s"
    },
    {
      id: 3,
      title: "本体から梱包まで内製対応",
      subtitle: "パッケージまで自社一貫で納期・品質を徹底管理",
      features: [
        {
          title: "本体からパッケージまで一括対応",
          description: "缶バッジやアクリルグッズなどの本体製作だけでなく、紙封筒や外箱といったパッケージ類もすべて自社で内製可能。製品とパッケージを一括で管理・製造することで、品質の統一と納期短縮を実現します。"
        },
        {
          title: "納期の一元管理で安心",
          description: "自社工場で完結するワンストップ体制により、各工程の進捗を一括で管理。製品とパッケージを個別に手配する必要がないため、納期のズレやトラブルを回避し、スムーズな納品を可能にします。"
        },
        {
          title: "プロッター加工で自由な形状対応",
          description: "自社導入のプロッターにより、紙封筒や外箱に切り取り線や折り加工を自在に施すことが可能。テンプレートにとらわれない自由なパッケージ設計に対応し、商品に合わせたオリジナル性の高い仕上がりを提供します。"
        }
      ],
      icon: (
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
      ),
      bgColor: "from-purple-50 to-purple-100/50",
      imageUrl: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=600&h=400&fit=crop",
      delay: "0.4s"
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