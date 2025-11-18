# Notion連携 News機能 移行計画書

## 📋 概要

現在のJSONベースのNews機能をNotion APIと連携させるための移行計画書です。

---

## 🎯 必要な作業一覧

### ✅ 1. 環境設定

#### 1.1 パッケージのインストール (新規追加)
```bash
npm install @notionhq/client
```

#### 1.2 環境変数の設定 (新規追加)
**ファイル**: `.env.local`

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxx
NOTION_NEWS_DATABASE_ID=xxxxxxxxxxxxx
```

---

## 📂 2. ファイル構成の変更

### 2.1 既存ファイルの利用状況

```
✅ 利用可能（そのまま使用）
├── src/lib/notion/
│   ├── client.ts              ✅ そのまま使用
│   ├── extractors.ts          ✅ そのまま使用
│   └── types.ts               ✅ そのまま使用
│
├── src/components/ui/
│   └── NotionBlockRenderer.tsx ✅ そのまま使用（CodeBlockコンポーネント作成が必要）
│
└── src/types/
    └── news.ts                 ✅ そのまま使用

🔄 修正が必要
├── src/lib/
│   ├── notion/config/
│   │   └── news-config.ts     🔄 修正必要（プロパティ名の調整）
│   └── news.ts                🔄 修正必要（データ取得ロジックの調整）

❌ 削除予定
└── src/page-components/news/
    ├── data/
    │   ├── news.json          ❌ 削除（Notionに移行）
    │   └── categories.json    ❌ 削除（動的生成に変更）
    └── lib/
        └── newsData.ts        ❌ 削除（src/lib/news.tsに置き換え）
```

### 2.2 新規作成が必要なファイル

```
🆕 新規作成
├── src/components/ui/
│   └── CodeBlock.tsx          🆕 NotionBlockRendererが依存
│
└── src/page-components/news/lib/
    └── newsAdapter.ts         🆕 Notion API → 既存UI の変換層
```

### 2.3 修正が必要なファイル

```
🔄 修正が必要
├── src/page-components/news/ui/
│   ├── NewsContainer.tsx      🔄 データ取得を非同期に変更
│   ├── NewsSection.tsx        🔄 データ取得を非同期に変更
│   ├── NewsGrid.tsx           🔄 データ取得を非同期に変更
│   ├── NewsFilter.tsx         🔄 カテゴリ取得を非同期に変更
│   └── news-detail.tsx        🔄 コンテンツレンダリングをNotionBlock形式に変更
│
├── src/app/news/
│   ├── page.tsx               🔄 Server Componentとして再実装
│   └── [id]/page.tsx          🔄 Server Componentとして再実装
│
└── src/app/page.tsx           🔄 NewsSection呼び出しを非同期に変更
```

---

## 🗂️ 3. Notion データベース設定

### 3.1 データベース名
**推奨名**: `📰 News` または `ニュース`

### 3.2 必要なプロパティ一覧

| プロパティ名 | タイプ | 説明 | 必須 | 既存JSONフィールド対応 |
|------------|--------|------|------|---------------------|
| **Name** | Title | 記事タイトル | ✅ | `title` |
| **ID** | Unique ID | 記事の一意識別子 | ✅ | `id` |
| **Date** | Date | 公開日 | ✅ | `published_at` |
| **Tags** | Multi-select | カテゴリタグ（複数選択可） | ✅ | `category`, `tags` |
| **Description** | Rich Text | 記事の概要・説明文 | ✅ | `excerpt` |
| **Thumbnail** | Files & media | サムネイル画像 | ✅ | `featured_image_url` |
| **Author** | Select または Rich Text | 著者名 | 🔄 | `author` |
| **ReadTime** | Number | 読了時間（分） | 🔄 | `read_time_minutes` |
| **IsFeatured** | Checkbox | 注目記事フラグ | 🔄 | `is_featured` |
| **Status** | Select | 公開ステータス（公開/下書き） | ⭕ | - |

**凡例**:
- ✅ 必須（現在のnews-config.tsで定義済み）
- 🔄 追加推奨（現在のJSONデータにあるが、news-config.tsにない）
- ⭕ オプション（運用上あると便利）

### 3.3 本文の記述方法
- Notionページの本文（ページ内のブロック）として記述
- サポートされるブロックタイプ:
  - 見出し1, 2, 3
  - 段落
  - 箇条書きリスト
  - 番号付きリスト
  - 引用
  - コード
  - 画像
  - 区切り線

### 3.4 Tagsの設定例
既存データから推奨されるタグ:
- `イベント`
- `技術情報`
- `キャンペーン`
- `新商品`
- `企業情報`
- `お知らせ`
- `推し活EXPO`
- `展示会`
- `多機能缶バッジ`
- `アクリル製品`
- `プレミアム・インセンティブショー`
- `コンテスト`

---

## 🔧 4. ファイル別 修正内容詳細

### 4.1 `src/lib/notion/config/news-config.ts`

**修正内容**: プロパティの追加

```typescript
// 🔄 修正: 以下のプロパティを追加
export const newsConfig: DatabaseConfig = {
  database: {
    id: () => {
      const value = process.env.NOTION_NEWS_DATABASE_ID
      if (!value) {
        throw new Error('NOTION_NEWS_DATABASE_ID is not defined')
      }
      return value
    },
    defaultSorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  },
  properties: {
    id: {
      name: 'ID',
      type: 'unique_id',
    },
    title: {
      name: 'Name',
      type: 'title',
    },
    tags: {
      name: 'Tags',
      type: 'multi_select',
    },
    date: {
      name: 'Date',
      type: 'date',
    },
    description: {
      name: 'Description',
      type: 'rich_text',
    },
    thumbnail: {
      name: 'Thumbnail',
      type: 'files',
    },
    // 🆕 以下を追加
    author: {
      name: 'Author',
      type: 'rich_text', // または 'select'
    },
    readTime: {
      name: 'ReadTime',
      type: 'number',
    },
    isFeatured: {
      name: 'IsFeatured',
      type: 'checkbox',
    },
  },
}
```

---

### 4.2 `src/lib/news.ts`

**修正内容**: 既存UIの型に合わせた変換処理を追加

```typescript
// 🔄 修正ポイント
// 1. extractors に新しいプロパティを追加
// 2. NewsListItem への変換で追加フィールドを含める
// 3. NewsPost への変換で追加フィールドを含める

// 修正例:
export async function getAllNewsForList(): Promise<NewsListItem[]> {
  try {
    const pages = await queryDatabase(getDatabaseId(newsConfig), {
      sorts: getDefaultSorts(newsConfig),
    })

    return pages.map((page) => ({
      id: extractors.id(page),
      title: extractors.title(page),
      date: extractors.date(page),
      tags: extractors.tags(page),
      summary: extractors.description(page),
      imageUrl: getImageUrl(extractors.thumbnail(page)),
      // 🆕 追加フィールド
      author: extractors.author(page),
      read_time_minutes: extractors.readTime(page),
      is_featured: extractors.isFeatured(page),
      category: extractors.tags(page)[0] || 'お知らせ', // 最初のタグをカテゴリとして使用
    }))
  } catch (error) {
    console.error('Error fetching news list:', error)
    throw error
  }
}
```

---

### 4.3 `src/page-components/news/lib/newsAdapter.ts` (🆕 新規作成)

**役割**: Notion APIから取得したデータを既存UIコンポーネントが期待する型に変換

```typescript
import { NewsItem, NewsCategory } from '../model/type'
import { NewsListItem } from '@/types/news'
import { getAllNewsForList } from '@/lib/news'

/**
 * Notion APIデータ → 既存UI用のNewsItem型に変換
 */
export async function getNewsItemsForUI(): Promise<NewsItem[]> {
  const notionNews = await getAllNewsForList()

  return notionNews.map(item => ({
    id: item.id,
    title: item.title,
    excerpt: item.summary,
    content: '', // 詳細ページで個別取得
    category: item.tags[0] || 'お知らせ',
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

  // タグから重複を除いてカウント
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
```

---

### 4.4 `src/page-components/news/ui/news-detail.tsx`

**修正内容**: NotionBlockRendererを使用して本文を表示

```typescript
// 🔄 修正前
<div
  className="prose prose-lg max-w-none"
  dangerouslySetInnerHTML={{ __html: newsData.content || "" }}
/>

// 🔄 修正後
import NotionBlockRenderer from '@/components/ui/NotionBlockRenderer'

// コンポーネント内
{newsData.blocks && (
  <NotionBlockRenderer
    blocks={newsData.blocks}
    className="prose prose-lg max-w-none mb-12"
  />
)}
```

---

### 4.5 `src/components/ui/CodeBlock.tsx` (🆕 新規作成)

**必要理由**: NotionBlockRenderer.tsxが依存している

```typescript
interface CodeBlockProps {
  code: string
  language: string
  variant?: 'desktop' | 'mobile'
}

export default function CodeBlock({
  code,
  language,
  variant = 'desktop'
}: CodeBlockProps) {
  return (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
      <code className={`language-${language}`}>
        {code}
      </code>
    </pre>
  )
}
```

---

### 4.6 UIコンポーネントの修正方針

#### Server Component化
```typescript
// 🔄 src/app/news/page.tsx
export default async function NewsPage() {
  const news = await getNewsItemsForUI()
  const categories = await getCategoriesForUI()

  return <NewsContainer initialNews={news} initialCategories={categories} />
}
```

#### Client Component
```typescript
// 🔄 src/page-components/news/ui/NewsContainer.tsx
'use client'

interface NewsContainerProps {
  initialNews: NewsItem[]
  initialCategories: NewsCategory[]
}

export default function NewsContainer({
  initialNews,
  initialCategories
}: NewsContainerProps) {
  // フィルタリングロジックはクライアント側で実行
  // ...
}
```

---

## 📊 5. データ移行フロー

### 5.1 移行手順

```
1. Notionデータベースを作成
   ↓
2. プロパティを設定
   ↓
3. 既存のnews.jsonデータを手動で転記
   （3件のニュース記事）
   ↓
4. Notion API KeyとDatabase IDを取得
   ↓
5. .env.localに設定
   ↓
6. コードを修正・追加
   ↓
7. 動作確認
   ↓
8. JSON関連ファイル削除
```

### 5.2 既存データの参考情報

**既存記事（3件）**:
1. 推し活EXPO開催（ID: 1, イベント, 注目）
2. 推し活EXPO出展報告（ID: 2, イベント）
3. プレミアム・インセンティブショー秋2025に出展（ID: 3, イベント, 注目）

---

## 🌳 6. 修正ファイルツリー構造

```
zigzaglab-2/
│
├── .env.local                              🆕 新規作成
│
├── package.json                            🔄 依存関係追加
│
├── src/
│   ├── app/
│   │   ├── page.tsx                        🔄 修正（NewsSection呼び出し）
│   │   └── news/
│   │       ├── page.tsx                    🔄 修正（Server Component化）
│   │       └── [id]/
│   │           └── page.tsx                🔄 修正（Server Component化）
│   │
│   ├── components/ui/
│   │   ├── NotionBlockRenderer.tsx         ✅ そのまま使用
│   │   └── CodeBlock.tsx                   🆕 新規作成
│   │
│   ├── lib/
│   │   ├── news.ts                         🔄 修正（フィールド追加）
│   │   └── notion/
│   │       ├── client.ts                   ✅ そのまま使用
│   │       ├── extractors.ts               ✅ そのまま使用
│   │       ├── types.ts                    ✅ そのまま使用
│   │       └── config/
│   │           └── news-config.ts          🔄 修正（プロパティ追加）
│   │
│   ├── types/
│   │   └── news.ts                         ✅ そのまま使用
│   │
│   ├── constants/
│   │   └── news.ts                         ✅ そのまま使用（ユーティリティ関数）
│   │
│   └── page-components/news/
│       ├── data/
│       │   ├── news.json                   ❌ 削除
│       │   └── categories.json             ❌ 削除
│       │
│       ├── lib/
│       │   ├── newsData.ts                 ❌ 削除
│       │   └── newsAdapter.ts              🆕 新規作成
│       │
│       ├── model/
│       │   └── type.ts                     ✅ そのまま使用
│       │
│       └── ui/
│           ├── NewsContainer.tsx           🔄 修正（データ受け取り方法変更）
│           ├── NewsSection.tsx             🔄 修正（非同期データ取得）
│           ├── NewsGrid.tsx                🔄 修正（データ受け取り方法変更）
│           ├── NewsFilter.tsx              🔄 修正（カテゴリ受け取り方法変更）
│           ├── NewsHero.tsx                ✅ そのまま使用
│           └── news-detail.tsx             🔄 修正（NotionBlockRenderer使用）
│
└── public/news/                            ⚠️  画像はNotionに移行推奨
    ├── 1/                                  （またはそのまま使用も可）
    ├── 2/
    └── 3/
```

---

## ⚠️ 7. 注意事項

### 7.1 画像の扱い
- **オプション1**: Notionの画像機能を使用（推奨）
  - 画像をNotionページに直接アップロード
  - ThumbnailプロパティにもNotionの画像を設定

- **オプション2**: 既存のpublic/news/画像を継続使用
  - Notionの画像URLフィールドに `/news/1/サムネイル.jpeg` などを記載
  - 本文中の画像もpublicフォルダのパスを使用

### 7.2 パフォーマンス
- Notion APIの呼び出しはサーバー側で実行
- ISR（Incremental Static Regeneration）の活用を検討
- キャッシュ戦略の実装を推奨

### 7.3 開発環境での確認
- `.env.local`はGitにコミットしない
- チーム内でNotion APIキーを共有する際は安全な方法を使用

---

## 📝 8. 実装チェックリスト

### 環境構築
- [ ] `@notionhq/client`をインストール
- [ ] Notionデータベースを作成
- [ ] プロパティを設定
- [ ] `.env.local`を作成してAPI keyとDatabase IDを設定

### ファイル作成・修正
- [ ] `src/components/ui/CodeBlock.tsx`を作成
- [ ] `src/page-components/news/lib/newsAdapter.ts`を作成
- [ ] `src/lib/notion/config/news-config.ts`を修正
- [ ] `src/lib/news.ts`を修正
- [ ] `src/page-components/news/ui/news-detail.tsx`を修正
- [ ] `src/app/news/page.tsx`を修正
- [ ] `src/app/news/[id]/page.tsx`を修正
- [ ] `src/page-components/news/ui/NewsContainer.tsx`を修正
- [ ] `src/page-components/news/ui/NewsSection.tsx`を修正
- [ ] `src/page-components/news/ui/NewsGrid.tsx`を修正
- [ ] `src/page-components/news/ui/NewsFilter.tsx`を修正

### データ移行
- [ ] 既存の3件のニュースをNotionに転記
- [ ] 画像の移行（Notion or publicフォルダ）

### テスト・確認
- [ ] 一覧ページの表示確認
- [ ] 詳細ページの表示確認
- [ ] フィルタリング機能の確認
- [ ] カテゴリ一覧の確認
- [ ] 注目記事の表示確認
- [ ] レスポンシブデザインの確認

### クリーンアップ
- [ ] `src/page-components/news/data/news.json`を削除
- [ ] `src/page-components/news/data/categories.json`を削除
- [ ] `src/page-components/news/lib/newsData.ts`を削除

---

## 🚀 9. 実装優先順位

### フェーズ1: 最小構成（必須）
1. 環境構築とパッケージインストール
2. CodeBlock.tsxの作成
3. news-config.tsの修正（最低限のプロパティ）
4. news-detail.tsxの修正（NotionBlockRenderer使用）

### フェーズ2: データ層（必須）
5. newsAdapter.tsの作成
6. news.tsの修正（フィールド追加）
7. Notionへのデータ移行

### フェーズ3: UI層（必須）
8. Server Component化（page.tsx）
9. Client Componentの修正（NewsContainer, NewsGrid等）
10. 動作確認

### フェーズ4: クリーンアップ
11. 旧JSONファイルの削除
12. 未使用コードの削除

---

以上がNotion連携への移行計画です。
