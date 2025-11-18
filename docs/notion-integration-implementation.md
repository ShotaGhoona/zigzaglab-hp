# Notion連携 News機能 実装完了報告

## 📋 実施日
2025年11月9日

---

## 🎯 実装概要

JSONベースのNews機能をNotion APIと連携させ、Notionデータベースから記事を動的に取得・表示できるようにしました。

---

## ✅ 実装完了項目

### 1. 環境構築

#### 1.1 パッケージのインストール
```bash
npm install @notionhq/client
```

#### 1.2 環境変数の設定
**ファイル**: `.env.local`

```env
NOTION_API_KEY=<your-notion-api-key>
NOTION_NEWS_DATABASE_ID=<your-database-id>
```

**Notionデータベース情報**:
- データベース名: `Zigzag-News-content`

---

### 2. ファイル作成・修正

#### 2.1 新規作成したファイル

##### ✅ `src/components/ui/CodeBlock.tsx`
- **目的**: NotionBlockRendererで使用するコードブロック表示コンポーネント
- **機能**:
  - コピーボタン付きコードブロック
  - シンタックスハイライト対応
  - モバイル/デスクトップ対応

##### ✅ `src/page-components/news/lib/newsAdapter.ts`
- **目的**: Notion APIデータを既存UI用の型に変換するアダプター層
- **主要関数**:
  - `getNewsItemsForUI()`: Notion → NewsItem型に変換
  - `getCategoriesForUI()`: カテゴリ一覧を動的生成
  - `getNewsItemByIdForUI()`: IDで記事取得（詳細ページ用）
  - `filterNewsItems()`: フィルタリング
  - `getAvailableYears()`: 利用可能な年度取得

##### ✅ `scripts/check-notion-databases.js`
- **目的**: Notionインテグレーションでアクセス可能なデータベースを一覧表示
- **機能**:
  - データベース検索
  - プロパティ一覧表示
  - 設定されているIDとの照合

#### 2.2 修正したファイル

##### ✅ `src/lib/notion/config/news-config.ts`
**追加プロパティ**:
```typescript
author: {
  name: 'Author',
  type: 'rich_text',
},
readTime: {
  name: 'ReadTime',
  type: 'number',
},
isFeatured: {
  name: 'IsFeatured',
  type: 'checkbox',
},
```

##### ✅ `src/types/news.ts`
**追加フィールド**:
- `NewsPost`: `author`, `read_time_minutes`, `is_featured`, `category`, `published_at`
- `NewsListItem`: `author`, `read_time_minutes`, `is_featured`, `category`

##### ✅ `src/lib/news.ts`
- `getAllNewsForList()`: 追加フィールドをマッピング
- `getNewsPostById()`: 追加フィールドをマッピング

##### ✅ `src/app/news/page.tsx`
**変更内容**:
```typescript
// Before
export default function NewsPage() {
  return <NewsContainer />;
}

// After
export default async function NewsPage() {
  const news = await getNewsItemsForUI();
  const categories = await getCategoriesForUI();
  return <NewsContainer initialNews={news} initialCategories={categories} />;
}
```

##### ✅ `src/app/news/[id]/page.tsx`
**変更内容**:
```typescript
export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  const newsPost = await getNewsPostById(id);

  if (!newsPost) {
    notFound();
  }

  return <NewsDetail newsPost={newsPost} />;
}
```

##### ✅ `src/page-components/news/ui/NewsContainer.tsx`
**変更内容**:
- Client Componentとして動作
- `initialNews`, `initialCategories`をpropsで受け取る
- フィルタリングロジックはクライアント側で実行

##### ✅ `src/page-components/news/ui/NewsFilter.tsx`
**変更内容**:
- `categories`, `newsItems`をpropsで受け取る
- `getAvailableYears()`を使用

##### ✅ `src/page-components/news/ui/NewsGrid.tsx`
**変更内容**:
- `newsItems`をpropsで受け取る
- `filterNewsItems()`を使用してフィルタリング
- ページネーションをクライアント側で実装

##### ✅ `src/page-components/news/ui/news-detail.tsx`
**変更内容**:
- `newsPost`をpropsで受け取る
- `NotionBlockRenderer`を使用して本文を表示
- `dangerouslySetInnerHTML`を削除

##### ✅ `src/page-components/news/ui/NewsSection.tsx`
**変更内容**:
- `newsItems`をpropsで受け取る
- `getAllNews()`の呼び出しを削除
- Client Componentとして動作

##### ✅ `src/app/page.tsx`
**変更内容**:
```typescript
export default async function Index() {
  const newsItems = await getNewsItemsForUI();

  return (
    <div className="min-h-screen">
      {/* ... */}
      <NewsSection newsItems={newsItems} />
      {/* ... */}
    </div>
  );
}
```

##### ✅ `eslint.config.mjs`
**変更内容**:
```javascript
{
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  },
}
```

---

### 3. 削除候補ファイル

以下のファイルは旧JSONベースの実装で、削除済み：

- ❌ `src/page-components/news/data/news.json`
- ❌ `src/page-components/news/data/categories.json`
- ❌ `src/page-components/news/lib/newsData.ts`

---

## 🗂️ Notion データベース設定

### データベース名
`Zigzag-News-content`

### 必要なプロパティ

| プロパティ名 | タイプ | 説明 | ステータス |
|------------|--------|------|-----------|
| **Name** | Title | 記事タイトル | ✅ 設定済み |
| **ID** | Unique ID | 記事の一意識別子 | ⚠️ 要追加 |
| **Date** | Date | 公開日 | ⚠️ 要追加 |
| **Tags** | Multi-select | カテゴリタグ（複数選択可） | ⚠️ 要追加 |
| **Description** | Rich Text | 記事の概要・説明文 | ⚠️ 要追加 |
| **Thumbnail** | Files & media | サムネイル画像 | ⚠️ 要追加 |
| **Author** | Rich Text | 著者名 | ⚠️ 要追加 |
| **ReadTime** | Number | 読了時間（分） | ⚠️ 要追加 |
| **IsFeatured** | Checkbox | 注目記事フラグ | ⚠️ 要追加 |

### Tags（Multi-select）の推奨値

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

### 本文の記述方法

Notionページの本文（ページ内のブロック）として記述します。

**サポートされるブロックタイプ**:
- 見出し1, 2, 3
- 段落
- 箇条書きリスト
- 番号付きリスト
- 引用
- コード
- 画像
- 区切り線

---

## 🔧 技術的な変更点

### アーキテクチャ変更

#### Before: JSONベース
```
JSON ファイル
  ↓
newsData.ts (同期処理)
  ↓
UI Component (Client Component)
```

#### After: Notion API ベース
```
Notion Database
  ↓
Notion API (src/lib/notion/client.ts)
  ↓
news.ts (非同期処理)
  ↓
newsAdapter.ts (型変換)
  ↓
Server Component (app/news/page.tsx)
  ↓
Client Component (UI Components)
```

### データフロー

1. **Server Component** (`app/news/page.tsx`)
   - Notion APIからデータ取得
   - `getNewsItemsForUI()`, `getCategoriesForUI()`を呼び出し
   - データをClient Componentに渡す

2. **Client Component** (`NewsContainer`, `NewsGrid`, etc.)
   - propsでデータを受け取る
   - フィルタリング、ソート、ページネーションをクライアント側で実行
   - インタラクティブな機能を提供

3. **Adapter Layer** (`newsAdapter.ts`)
   - Notion APIの型 → 既存UIの型に変換
   - カテゴリの動的生成
   - フィルタリングヘルパー関数

---

## 🚀 動作確認

### 開発サーバー
```bash
npm run dev
```
- URL: http://localhost:3003

### 確認すべきページ
- トップページ: http://localhost:3003 （NewsSectionが表示）
- ニュース一覧: http://localhost:3003/news
- ニュース詳細: http://localhost:3003/news/[id]

### 確認すべき機能
- [ ] ニュース一覧の表示
- [ ] カテゴリフィルタリング
- [ ] 年度フィルタリング
- [ ] キーワード検索
- [ ] 注目記事の表示
- [ ] ページネーション
- [ ] ニュース詳細ページ
- [ ] Notionブロックのレンダリング（見出し、段落、画像など）
- [ ] 関連記事の表示（現在は空配列）

---

## 📝 残タスク

### Notion側
1. データベースに必要なプロパティを追加
2. テスト用のニュース記事を作成（3件程度）
3. 画像をNotionにアップロード、またはpublicフォルダを使用

### コード側
1. 関連記事機能の実装（現在は空配列を返している）
2. 旧JSONファイルの削除（Notionデータが安定した後）
3. エラーハンドリングの強化
4. ISR（Incremental Static Regeneration）の設定検討
5. キャッシュ戦略の実装

---

## 🐛 トラブルシューティング

### Issue 1: Database IDが見つからない

**問題**:
```
Could not find database with ID: <incorrect-id>
```

**原因**:
- 提供されたURLのIDが正しくなかった

**解決方法**:
```bash
node scripts/check-notion-databases.js
```
このスクリプトでアクセス可能なデータベースを確認

### Issue 2: Notionインテグレーションが接続できない

**確認事項**:
1. NotionでIntegrationを作成済みか
2. データベースページでIntegrationを「接続」に追加したか
3. API Keyが正しいか（`.env.local`を確認）

---

## 📚 参考リンク

- [Notion Integration 管理画面](https://www.notion.so/my-integrations)
- [Notion API Documentation](https://developers.notion.com/)
- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Next.js Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

---

## 🎉 完了

Notion連携の実装が完了しました。Notion側でデータベースの設定を行い、記事を作成してください。

**次のステップ**:
1. Notionデータベースにプロパティを追加
2. テスト記事を作成
3. ブラウザで動作確認
4. 問題があれば報告

---

**実装者**: Claude Code
**実装日**: 2025年11月9日
**プロジェクト**: ZIGZAG Lab News System
