"use client"

import { useEffect, useState } from "react"

export default function AboutProcess() {
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

    const section = document.getElementById('about-process-section')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const processSteps = [
    {
      step: "01",
      title: "お見積り・ご相談",
      description: "お客様のご要望をお聞きし、最適なプランをご提案いたします。小さなことでもお気軽にご相談ください。",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      bgColor: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-500/30"
    },
    {
      step: "02",
      title: "デザイン確認",
      description: "お客様からいただいたデザインデータを確認し、印刷に最適な形式に調整いたします。",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      bgColor: "from-green-500/20 to-green-600/20",
      borderColor: "border-green-500/30"
    },
    {
      step: "03",
      title: "サンプル制作",
      description: "ご希望に応じてサンプルを制作し、色味や品質をご確認いただきます。",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      bgColor: "from-yellow-500/20 to-yellow-600/20",
      borderColor: "border-yellow-500/30"
    },
    {
      step: "04",
      title: "本格生産",
      description: "確認後、機構部品メーカーの技術力を活かした高品質な製品を製作いたします。",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      bgColor: "from-purple-500/20 to-purple-600/20",
      borderColor: "border-purple-500/30"
    },
    {
      step: "05",
      title: "品質検査・出荷",
      description: "厳格な品質検査を経て、丁寧に梱包してお客様のもとへお届けいたします。",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: "from-red-500/20 to-red-600/20",
      borderColor: "border-red-500/30"
    }
  ]

  return (
    <section 
      id="about-process-section"
      className="py-20 px-4 bg-gradient-to-b from-background to-primary/5"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              制作<span className="text-primary">プロセス</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              お客様のアイディアが形になるまでの流れをご紹介します。
            </p>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Desktop Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/20 via-primary to-primary/20 hidden lg:block"></div>

          <div className="space-y-12 lg:space-y-16">
            {processSteps.map((process, index) => (
              <div 
                key={index}
                className={`relative transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 200 + 300}ms` }}
              >
                {/* Mobile Step Number */}
                <div className="flex items-center mb-6 lg:hidden">
                  <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-primary-foreground font-bold text-lg">{process.step}</span>
                  </div>
                  <div className="flex-1 h-1 bg-primary/20 ml-4"></div>
                </div>

                <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                  {/* Desktop Step Circle */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center z-10 shadow-xl hidden lg:flex">
                    <span className="text-primary-foreground font-bold text-xl">{process.step}</span>
                  </div>

                  {/* Content Side */}
                  <div className={`${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:col-start-2 lg:pl-12'}`}>
                    <div className={`bg-gradient-to-br ${process.bgColor} backdrop-blur-sm rounded-2xl border ${process.borderColor} p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2`}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-background/80 backdrop-blur-sm rounded-xl flex items-center justify-center text-primary shadow-lg">
                          {process.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-foreground mb-2">
                            {process.title}
                          </h3>
                          <div className="w-16 h-1 bg-primary rounded-full"></div>
                        </div>
                      </div>

                      <p className="text-foreground/80 leading-relaxed">
                        {process.description}
                      </p>

                      {/* Step indicator dots */}
                      <div className="flex items-center gap-2 mt-6">
                        {processSteps.map((_, dotIndex) => (
                          <div
                            key={dotIndex}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              dotIndex <= index ? 'bg-primary' : 'bg-primary/20'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Empty side for spacing */}
                  <div className={`hidden lg:block ${index % 2 === 0 ? 'lg:col-start-2' : 'lg:col-start-1'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-8 border border-border/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              お客様のアイディアをお聞かせください
            </h3>
            <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
              どのような製品をお考えでも、まずはお気軽にご相談ください。
              経験豊富なスタッフが最適なソリューションをご提案いたします。
            </p>
            <button className="px-10 py-4 bg-primary text-primary-foreground rounded-lg font-medium text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/30">
              お問い合わせはこちら
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}