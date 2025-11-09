/**
 * News型定義
 * アプリケーション全体で使用するニュース関連の型定義
 */

import { NotionBlock } from '@/lib/notion/types'

/**
 * ニュース記事の完全なデータ型
 * 詳細ページで使用
 */
export interface NewsPost {
  /** 記事ID（Notionのunique_id.numberを文字列化） */
  id: string
  /** 記事タイトル */
  title: string
  /** 公開日（YYYY-MM-DD形式） */
  date: string
  /** カテゴリタグ（複数） */
  tags: string[]
  /** 記事概要 */
  summary: string
  /** 記事本文（Notionブロック配列） */
  blocks: NotionBlock[]
  /** サムネイル画像URL */
  thumbnail: string
  /** 著者名 */
  author?: string
  /** 読了時間（分） */
  read_time_minutes?: number
  /** 注目記事フラグ */
  is_featured?: boolean
  /** カテゴリ（最初のタグ） */
  category?: string
  /** 公開日（YYYY-MM-DD形式） */
  published_at?: string
}

/**
 * ニュース一覧表示用のデータ型
 * 一覧ページで使用（本文を含まない軽量版）
 */
export interface NewsListItem {
  /** 記事ID */
  id: string
  /** 記事タイトル */
  title: string
  /** 公開日（YYYY-MM-DD形式） */
  date: string
  /** カテゴリタグ（複数） */
  tags: string[]
  /** 記事概要 */
  summary: string
  /** サムネイル画像URL */
  imageUrl: string
  /** 著者名 */
  author?: string
  /** 読了時間（分） */
  read_time_minutes?: number
  /** 注目記事フラグ */
  is_featured?: boolean
  /** カテゴリ（最初のタグ） */
  category?: string
}
