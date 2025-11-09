/**
 * News Adapter
 * Notion APIデータを既存UI用の型に変換するアダプター層
 */

import { NewsItem, NewsCategory } from '../model/type'
import { getAllNewsForList, getNewsPostById } from '@/lib/news'

/**
 * Notion APIデータ → 既存UI用のNewsItem型に変換
 */
export async function getNewsItemsForUI(): Promise<NewsItem[]> {
  const notionNews = await getAllNewsForList()

  return notionNews.map(item => ({
    id: item.id,
    title: item.title,
    excerpt: item.summary,
    content: '', // 詳細ページで個別取得するため空
    category: item.category || item.tags[0] || 'お知らせ',
    featured_image_url: item.imageUrl,
    featured_image_alt: item.title,
    author: item.author || '編集部',
    published_at: item.date,
    updated_at: item.date,
    read_time_minutes: item.read_time_minutes || 3,
    is_featured: item.is_featured || false,
    tags: item.tags.map((tag, idx) => ({
      id: String(idx + 1),
      tag_name: tag,
    })),
  }))
}

/**
 * カテゴリ一覧を動的生成
 */
export async function getCategoriesForUI(): Promise<NewsCategory[]> {
  const news = await getNewsItemsForUI()

  // カテゴリから重複を除いてカウント
  const categoryMap = new Map<string, number>()

  news.forEach(item => {
    const category = item.category
    categoryMap.set(category, (categoryMap.get(category) || 0) + 1)
  })

  const categories: NewsCategory[] = [
    { id: 'all', name: 'すべて', count: news.length }
  ]

  categoryMap.forEach((count, name) => {
    categories.push({
      id: name,
      name,
      count,
    })
  })

  return categories
}

/**
 * IDでニュース記事を取得（詳細ページ用）
 */
export async function getNewsItemByIdForUI(id: string): Promise<NewsItem | null> {
  const notionPost = await getNewsPostById(id)

  if (!notionPost) {
    return null
  }

  return {
    id: notionPost.id,
    title: notionPost.title,
    excerpt: notionPost.summary,
    content: '', // NotionBlockを使用するため不要
    category: notionPost.tags[0] || 'お知らせ',
    featured_image_url: notionPost.thumbnail,
    featured_image_alt: notionPost.title,
    author: notionPost.author || '編集部',
    published_at: notionPost.date,
    updated_at: notionPost.date,
    read_time_minutes: notionPost.read_time_minutes || 3,
    is_featured: notionPost.is_featured || false,
    tags: notionPost.tags.map((tag, idx) => ({
      id: String(idx + 1),
      tag_name: tag,
    })),
  }
}

/**
 * フィルタリング用のヘルパー関数
 */
export function filterNewsItems(
  items: NewsItem[],
  category: string,
  year: string,
  searchTerm: string
): NewsItem[] {
  let filtered = [...items]

  // カテゴリフィルター
  if (category !== 'all') {
    filtered = filtered.filter(item => item.category === category)
  }

  // 年度フィルター
  if (year !== 'all') {
    filtered = filtered.filter(item => {
      const itemYear = new Date(item.published_at).getFullYear()
      return itemYear === parseInt(year)
    })
  }

  // 検索フィルター
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase()
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(searchLower) ||
      item.excerpt.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower)
    )
  }

  return filtered
}

/**
 * 利用可能な年度を取得
 */
export function getAvailableYears(items: NewsItem[]): number[] {
  const years = items.map(item => new Date(item.published_at).getFullYear())
  const uniqueYears = [...new Set(years)]
  return uniqueYears.sort((a, b) => b - a)
}
