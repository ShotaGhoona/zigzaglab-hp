"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { getAllNews } from "../lib/newsData"
import { getCategoryColor } from "@/constants/news"
import type { NewsItem } from "../model/type"

export default function NewsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [featuredNews, setFeaturedNews] = useState<NewsItem[]>([])

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

    const section = document.getElementById('news-section')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const news = getAllNews()
    // 注目記事を優先し、最新4件を取得
    const featured = news
      .sort((a, b) => {
        if (a.is_featured && !b.is_featured) return -1
        if (!a.is_featured && b.is_featured) return 1
        return new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      })
      .slice(0, 4)
    setFeaturedNews(featured)
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section 
      id="news-section"
      className="py-16 px-4 bg-gradient-to-b from-primary/5 to-background"
    >
      <div className="container mx-auto max-w-7xl">
        {/* セクションヘッダー */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            最新<span className="text-primary">ニュース</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            ZIGZAGLabの最新情報をお届けします
          </p>
        </div>

        {/* ニュース一覧 */}
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredNews.map((news, index) => (
              <div 
                key={news.id}
                className={`group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: isVisible ? `${index * 150}ms` : '0s' 
                }}
              >
                <Link href={`/news/${news.id}`}>
                  {/* ニュース画像 */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image 
                      src={news.featured_image_url}
                      alt={news.featured_image_alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* カテゴリバッジ */}
                    <div className="absolute top-3 left-3">
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-medium text-white shadow-lg"
                        style={{ backgroundColor: getCategoryColor(news.category) }}
                      >
                        {news.category}
                      </span>
                    </div>
                    {/* 注目記事バッジ */}
                    {news.is_featured && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                          注目
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ニュース情報 */}
                  <div className="p-4">
                    <div className="mb-2">
                      <time className="text-xs text-foreground/60">
                        {formatDate(news.published_at)}
                      </time>
                    </div>
                    <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
                      {news.title}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3">
                      {news.excerpt}
                    </p>
                    
                    {/* 記事情報 */}
                    <div className="flex justify-center mt-4 pt-3 border-t border-border/20">
                      <span className="text-xs text-foreground/60">
                        {news.read_time_minutes}分で読める
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ニュース一覧へのCTA */}
        <div className="text-center mt-12">
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-foreground/70 mb-6">
              他のニュースもご覧ください
            </p>
            <Link 
              href="/news"
              className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              ニュース一覧を見る
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}