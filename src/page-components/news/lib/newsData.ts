import { NewsItem, NewsCategory, NewsFilterParams, NewsPagination } from "../model/type";
import newsData from "../data/news.json";
import categoriesData from "../data/categories.json";

// Get all news items
export const getAllNews = (): NewsItem[] => {
  return newsData as NewsItem[];
};

// Get all categories
export const getAllCategories = (): NewsCategory[] => {
  return categoriesData as NewsCategory[];
};

// Get filtered news with pagination
export const getFilteredNews = (params: NewsFilterParams = {}): {
  news: NewsItem[];
  pagination: NewsPagination;
} => {
  let filteredNews = [...newsData] as NewsItem[];

  // Filter by category
  if (params.category && params.category !== "all") {
    filteredNews = filteredNews.filter(item => item.category === params.category);
  }

  // Filter by year
  if (params.year) {
    filteredNews = filteredNews.filter(item => {
      const itemYear = new Date(item.published_at).getFullYear();
      return itemYear === params.year;
    });
  }

  // Filter by search term
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredNews = filteredNews.filter(item =>
      item.title.toLowerCase().includes(searchLower) ||
      item.excerpt.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower)
    );
  }

  // Sort
  const sortBy = params.sort_by || 'published_at';
  const sortOrder = params.sort_order || 'desc';
  
  filteredNews.sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'published_at':
        aValue = new Date(a.published_at).getTime();
        bValue = new Date(b.published_at).getTime();
        break;
      case 'title':
        aValue = a.title;
        bValue = b.title;
        break;
      default:
        aValue = new Date(a.published_at).getTime();
        bValue = new Date(b.published_at).getTime();
    }

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // Pagination
  const page = params.page || 1;
  const pageSize = params.page_size || 12;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedNews = filteredNews.slice(startIndex, endIndex);

  const pagination: NewsPagination = {
    total: filteredNews.length,
    page,
    page_size: pageSize,
    has_next: endIndex < filteredNews.length,
    has_prev: page > 1,
  };

  return {
    news: paginatedNews,
    pagination,
  };
};

// Get news by ID
export const getNewsById = (id: string): NewsItem | null => {
  const news = newsData.find(item => item.id === id);
  return news as NewsItem || null;
};

// Get related news (by category, excluding current item)
export const getRelatedNews = (newsId: string, limit: number = 3): NewsItem[] => {
  const currentNews = getNewsById(newsId);
  if (!currentNews) return [];

  const relatedNews = newsData
    .filter(item => item.id !== newsId && item.category === currentNews.category)
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, limit);

  return relatedNews as NewsItem[];
};

// Get available years from news data
export const getAvailableYears = (): number[] => {
  const years = newsData.map(item => new Date(item.published_at).getFullYear());
  const uniqueYears = [...new Set(years)];
  return uniqueYears.sort((a, b) => b - a);
};

// Get featured news
export const getFeaturedNews = (): NewsItem[] => {
  return newsData.filter(item => item.is_featured) as NewsItem[];
};