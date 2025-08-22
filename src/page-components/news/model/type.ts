export interface NewsTag {
  id: string;
  tag_name: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  featured_image_url?: string;
  featured_image_alt?: string;
  author: string;
  published_at: string;
  updated_at: string;
  read_time_minutes: number;
  view_count: number;
  is_featured: boolean;
  tags?: NewsTag[];
}

export interface NewsCategory {
  id: string;
  name: string;
  count: number;
}

export interface NewsFilterParams {
  category?: string;
  year?: number;
  search?: string;
  page?: number;
  page_size?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface NewsPagination {
  total: number;
  page: number;
  page_size: number;
  has_next: boolean;
  has_prev: boolean;
}