"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function AboutEquipment() {
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

    const section = document.getElementById('about-equipment-section')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const equipment = [
    {
      name: "オンデマンド印刷機",
      count: 1,
      imageUrl: "/equipment/オンデマンド印刷機.png",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
      )
    },
    {
      name: "UVプリンター",
      count: 2,
      imageUrl: "/equipment/UVプリンター.png",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      name: "プロッター",
      count: 1,
      imageUrl: "/equipment/プロッター.jpg",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    },
    {
      name: "レーザー加工機",
      count: 4,
      imageUrl: "/equipment/レーザー加工機.jpg",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      name: "缶バッジマシン",
      count: 30,
      imageUrl: "/equipment/缶バッジマシン.png",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ]


  return (
    <section 
      id="about-equipment-section"
      className="py-20 px-4 bg-gradient-to-b from-secondary/5 to-background"
    >
      <div className="">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              保有<span className="text-primary">設備</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              最新の設備を導入し、高品質なモノづくりを実現しています。
            </p>
          </div>
        </div>

        {/* Equipment Grid Container */}
        <div className={`container mx-auto max-w-6xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 items-stretch">
            {equipment.map((item, index) => (
              <div 
                key={`${item.name}-${index}`}
                className="group relative"
              >
                {/* Modern geometric card */}
                <div className="relative bg-white overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-700 h-full flex flex-col">
                  {/* Geometric overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5"></div>
                  
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/5 mix-blend-multiply opacity-60"></div>
                    <Image 
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    
                    {/* Diagonal element */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent"
                         style={{
                           clipPath: 'polygon(50% 0%, 100% 0%, 100% 50%)'
                         }}
                    ></div>
                    
                  </div>

                  {/* Content */}
                  <div className="p-8 relative flex-1 flex flex-col">
                    {/* Zigzag accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary"
                         style={{
                           clipPath: 'polygon(0% 0%, 20% 100%, 40% 0%, 60% 100%, 80% 0%, 100% 100%, 100% 0%)'
                         }}
                    ></div>
                    
                    <div className="mt-4 flex-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 font-medium">
                        {item.count}台保有
                      </p>
                    </div>
                    
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

      </div>

    </section>
  )
}