"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { filterNewsItems } from "../lib/newsAdapter"
import { getCategoryColor, formatNewsDate, formatReadTime } from "@/constants/news"
import type { NewsItem } from "../model/type"

interface NewsGridProps {
  selectedCategory: string
  selectedYear: string
  searchTerm: string
  newsItems: NewsItem[]
}

export default function NewsGrid({ selectedCategory, selectedYear, searchTerm, newsItems }: NewsGridProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()

  // Filter news items
  const filteredNews = useMemo(() => {
    return filterNewsItems(newsItems, selectedCategory, selectedYear, searchTerm)
  }, [newsItems, selectedCategory, selectedYear, searchTerm])

  // Paginate
  const pageSize = 12
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedNews = filteredNews.slice(startIndex, endIndex)
  const hasNext = endIndex < filteredNews.length

  // Get featured news
  const featuredNews = newsItems.filter(item => item.is_featured)

  const pagination = {
    total: filteredNews.length,
    page: currentPage,
    page_size: pageSize,
    has_next: hasNext,
    has_prev: currentPage > 1,
  }

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, selectedYear, searchTerm])

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

    const section = document.getElementById('news-grid')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])


  const handleNewsClick = (id: string) => {
    router.push(`/news/${id}`)
  }

  return (
    <section id="news-grid" className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Results count */}
        <div className="mb-8">
          <p className="text-foreground/60">
            {`${pagination?.total || 0}件の記事が見つかりました`}
          </p>
        </div>

        {/* Featured News */}
        {selectedCategory === "all" && searchTerm === "" && featuredNews.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-8">注目の記事</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.slice(0, 4).map((item, index) => (
                <article 
                  key={item.id}
                  onClick={() => handleNewsClick(item.id)}
                  className={`group cursor-pointer bg-card/30 backdrop-blur-sm rounded-2xl border border-border/20 overflow-hidden hover:bg-card/50 hover:border-primary/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.featured_image_url || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center"} 
                      alt={item.featured_image_alt || item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 text-xs font-medium text-white rounded-full ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-2 py-1 text-xs rounded-full">
                      注目
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm text-foreground/50 font-light">{formatNewsDate(item.published_at)}</p>
                      <div className="flex items-center gap-4 text-xs text-foreground/40">
                        <span>{formatReadTime(item.read_time_minutes)}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-foreground/70 line-clamp-3 leading-relaxed font-light">
                      {item.excerpt}
                    </p>
                    <div className="mt-4 text-primary font-medium text-sm group-hover:text-primary/80 transition-colors">
                      続きを読む →
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* All News Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-8">
            {selectedCategory === "all" ? "すべての記事" : `${selectedCategory}の記事`}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedNews.map((item, index) => (
            <article 
              key={item.id}
              onClick={() => handleNewsClick(item.id)}
              className={`group cursor-pointer bg-card/30 backdrop-blur-sm rounded-2xl border border-border/20 overflow-hidden hover:bg-card/50 hover:border-primary/20 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.featured_image_url || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center"} 
                  alt={item.featured_image_alt || item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-medium text-white rounded-full ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                </div>
                {item.is_featured && (
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-2 py-1 text-xs rounded-full">
                    注目
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-foreground/50 font-light">{formatNewsDate(item.published_at)}</p>
                  <div className="flex items-center gap-4 text-xs text-foreground/40">
                    <span>{formatReadTime(item.read_time_minutes)}</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground/70 line-clamp-3 leading-relaxed font-light">
                  {item.excerpt}
                </p>
                <div className="mt-4 text-primary font-medium text-sm group-hover:text-primary/80 transition-colors">
                  続きを読む →
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No results */}
        {paginatedNews.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">記事が見つかりませんでした</h3>
            <p className="text-foreground/60 mb-6">検索条件を変更してお試しください</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              フィルターをリセット
            </button>
          </div>
        )}

        {/* Load More */}
        {pagination?.has_next && (
          <div className="text-center mt-16">
            <button 
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-8 py-4 border border-primary/30 text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              さらに読み込む
            </button>
          </div>
        )}
      </div>
    </section>
  )
}