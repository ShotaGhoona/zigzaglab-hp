"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function RefinedHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* 洗練されたロゴ */}
        <Link href="/" className="flex items-center space-x-3 group">
          <Image src="/logo.png" alt="ZIGZAGLAB" width={36} height={36} />
          <Image src="/logo-text.png" alt="ZIGZAGLAB" width={150} height={50} />
          
        </Link>

        {/* エレガントなナビゲーション */}
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { name: "強み", href: "#strengths-section" },
            // { name: "品質", href: "#quality-section" },
            { name: "グッズ", href: "#integrated-product-section" },
            { name: "プロセス", href: "#process-section" },
            { name: "お問い合わせ", href: "#contact-section" },
          ].map((item) => (
            <a 
              key={item.name}
              className="relative text-foreground/80 hover:text-foreground transition-colors duration-300 text-sm font-medium py-2 group"
              onClick={() => {
                const section = document.getElementById(item.href.replace('#', ''))
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              {item.name}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
            </a>
          ))}
        </nav>

        {/* 洗練されたアクションボタン */}
        <div className="flex items-center space-x-3">
          {/* <Button 
            variant="outline" 
            size="sm"
            className="text-sm font-medium border-border/40 hover:border-primary/50 hover:text-primary transition-all duration-300"
          >
            お見積り
          </Button> */}
          <Button 
            size="sm"
            className="text-sm font-medium bg-primary hover:bg-primary/90 transition-all duration-300"
            onClick={() => {
              const section = document.getElementById('contact-section')
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            お問い合わせ
          </Button>
        </div>
      </div>
    </header>
  )
}