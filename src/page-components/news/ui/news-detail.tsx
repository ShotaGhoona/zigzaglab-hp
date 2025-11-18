"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { getCategoryColor, formatNewsDate, formatReadTime } from "@/constants/news"
import { NewsPost } from "@/types/news"
import NotionBlockRenderer from "@/components/ui/NotionBlockRenderer"

interface NewsDetailProps {
  newsPost: NewsPost
}

export default function NewsDetail({ newsPost }: NewsDetailProps) {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  // Use the passed newsPost directly
  const newsData = newsPost
  // Related news will be implemented later
  const relatedNews: NewsPost[] = []

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleBackClick = () => {
    router.back()
  }

  const handleRelatedNewsClick = (id: string) => {
    router.push(`/news/${id}`)
  }

  return (
    <div className="min-h-screen">
      {/* Error state */}
      {!newsData && (
        <div className="container mx-auto max-w-4xl py-16 px-6">
          <div className="text-center">
            <div className="text-6xl mb-4">😓</div>
            <h2 className="text-2xl font-bold text-foreground mb-4">記事が見つかりませんでした</h2>
            <p className="text-foreground/60 mb-6">指定された記事は存在しないか、削除された可能性があります。</p>
            <button 
              onClick={() => router.push('/news')}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              ニュース一覧に戻る
            </button>
          </div>
        </div>
      )}
      
      {/* News content */}
      {newsData && (
        <article className="py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            {/* Back button */}
            <button 
              onClick={handleBackClick}
              className="flex items-center gap-2 text-foreground/60 hover:text-foreground mb-8 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              ニュース一覧に戻る
            </button>

            {/* Article header */}
            <header className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-4 mb-6">
                <span className={`px-3 py-1 text-sm font-medium text-white rounded-full ${getCategoryColor(newsData.category || 'お知らせ')}`}>
                  {newsData.category || 'お知らせ'}
                </span>
                <span className="text-sm text-foreground/50">{formatNewsDate(newsData.published_at || newsData.date)}</span>
                <span className="text-sm text-foreground/40">{formatReadTime(newsData.read_time_minutes || 3)}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {newsData.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-foreground/60">
                <span>著者: {newsData.author}</span>
              </div>
            </header>

            {/* Featured image */}
            <div className={`relative mb-12 h-96 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Image
                src={newsData.thumbnail || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop&crop=center"}
                alt={newsData.title}
                fill
                className="object-cover rounded-2xl"
              />
            </div>

            {/* Article content */}
            <div
              className={`prose prose-lg max-w-none mb-12 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              {newsData.blocks && newsData.blocks.length > 0 ? (
                <NotionBlockRenderer blocks={newsData.blocks} />
              ) : (
                <p className="text-foreground/70">{newsData.summary}</p>
              )}
            </div>

            {/* Tags */}
            <div className={`mb-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h3 className="text-lg font-semibold text-foreground mb-4">タグ</h3>
              <div className="flex flex-wrap gap-2">
                {newsData.tags?.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-card/50 text-foreground/70 rounded-full text-sm border border-border/30"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>


            {/* Related news */}
            {relatedNews.length > 0 && (
              <div className={`transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="relative bg-gradient-to-br from-card/30 to-card/10 backdrop-blur-md rounded-3xl border border-border/30 p-8 overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute top-0 left-0 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-2 bg-secondary/10 rounded-xl">
                        <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">関連記事</h3>
                    </div>
                    
                    <p className="text-foreground/60 mb-8 leading-relaxed">
                      この記事に関連する他の記事もぜひご覧ください
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {relatedNews.length === 0 ? (
                        <div className="col-span-2 text-center py-8">
                          <div className="text-foreground/60">関連記事がありません</div>
                        </div>
                      ) : (
                        relatedNews.map((item, index) => (
                          <article 
                            key={item.id}
                            onClick={() => handleRelatedNewsClick(item.id)}
                            className="group cursor-pointer bg-background/50 backdrop-blur-sm rounded-2xl border border-border/40 overflow-hidden hover:bg-background/70 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
                            style={{ animationDelay: `${index * 150}ms` }}
                          >
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <span className={`px-3 py-1 text-xs font-medium text-white rounded-full ${getCategoryColor(item.category || 'お知らせ')}`}>
                                  {item.category || 'お知らせ'}
                                </span>
                                <span className="text-sm text-foreground/50 font-light">{formatNewsDate(item.published_at || item.date)}</span>
                              </div>
                              
                              <h4 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-4 leading-tight">
                                {item.title}
                              </h4>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-primary font-medium text-sm group-hover:text-primary/80 transition-colors flex items-center gap-2">
                                  続きを読む
                                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </span>
                                
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-primary/40 rounded-full"></div>
                                  <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Hover effect line */}
                            <div className="h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                          </article>
                        ))
                      )}
                    </div>
                    
                    {/* More articles button */}
                    <div className="text-center mt-8">
                      <button 
                        onClick={() => router.push('/news')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-medium hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        すべての記事を見る
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </article>
      )}
    </div>
  )
}