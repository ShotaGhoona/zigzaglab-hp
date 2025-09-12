"use client"

import { useEffect, useState } from "react"
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
      className="py-24 px-6 bg-gradient-to-b from-background to-primary/5"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredNews.map((news, index) => (
              <div 
                key={news.id}
                className={`group bg-white rounded-lg overflow-hidden shadow-sm border border-border/10 hover:shadow-md hover:border-border/30 hover:-translate-y-1 transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: isVisible ? `${index * 100}ms` : '0s' 
                }}
              >
                <Link href={`/news/${news.id}`}>
                  {/* ニュース画像 */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={news.featured_image_url}
                      alt={news.featured_image_alt}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* カテゴリバッジ */}
                    <div className="absolute top-3 left-3">
                      <span 
                        className="px-3 py-1 rounded-lg text-xs font-medium text-white shadow-sm backdrop-blur-sm"
                        style={{ backgroundColor: getCategoryColor(news.category) }}
                      >
                        {news.category}
                      </span>
                    </div>
                    {/* 注目記事バッジ */}
                    {news.is_featured && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-lg font-medium shadow-sm">
                          注目
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ニュース情報 */}
                  <div className="p-5">
                    <div className="mb-3">
                      <time className="text-xs text-foreground/60 font-medium">
                        {formatDate(news.published_at)}
                      </time>
                    </div>
                    <h3 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
                      {news.title}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3 mb-4">
                      {news.excerpt}
                    </p>
                    
                    {/* 記事情報 */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/10">
                      <span className="text-xs text-foreground/60">
                        {news.read_time_minutes}分で読める
                      </span>
                      <svg className="w-4 h-4 text-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ニュース一覧へのCTA */}
        <div className="text-center mt-16">
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-border/10 py-8 px-6">
              <p className="text-foreground/70 mb-4 text-lg">
                他のニュースもご覧ください
              </p>
              <Link 
                href="/news"
                className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-sm"
              >
                ニュース一覧を見る
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}