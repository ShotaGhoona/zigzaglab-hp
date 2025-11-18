# Notion News 移行ガイド

Notionデータベースに記事を手動で追加する手順書です。

## 📋 事前準備

Notionデータベース `Zigzag-News-content` に以下のプロパティが設定されていることを確認してください：

| プロパティ名 | タイプ | 必須 |
|------------|--------|------|
| Name | Title | ✅ |
| Date | Date | ✅ |
| Tag | Multi-select | ✅ |
| Description | Rich Text | ✅ |
| Author | Rich Text | ✅ |
| ReadTime | Number | ✅ |
| IsFeature | Checkbox | ✅ |
| Thumbnail | Files & media | ✅ |
| ID | Unique ID | ⚠️ 自動生成 |

---

## 🚀 記事追加手順

### 記事1: 推し活EXPO開催

1. Notionデータベースで「新規」をクリック
2. `news-1.md` の内容を参照して以下を設定:

#### プロパティ
- **Name**: 推し活EXPO開催
- **Date**: 2024-09-16
- **Tag**: `推し活EXPO`, `展示会`, `多機能缶バッジ`, `アクリルスタンド` (4つ追加)
- **Description**: 9/24(水)~9/26(金) インテックス大阪にて推し活EXPO開催！
- **Author**: 営業部
- **ReadTime**: 3
- **IsFeature**: ✅ チェック
- **Thumbnail**: `public/news/1/サムネイル.jpeg` をアップロード

#### 本文
`news-1.md` からコピペして、以下の画像を挿入:
- `public/news/1/写真１.png`
- `public/news/1/写真２.jpg`
- `public/news/1/写真３.jpeg`

---

### 記事2: 「推し活EXPO」＠インテックス大阪に出展しました。

1. Notionデータベースで「新規」をクリック
2. `news-2.md` の内容を参照して以下を設定:

#### プロパティ
- **Name**: 「推し活EXPO」＠インテックス大阪に出展しました。
- **Date**: 2025-09-27
- **Tag**: `推し活EXPO`, `出展報告`, `多機能缶バッジ`, `アクリル製品`
- **Description**: 2025年9月24日〜26日、インテックス大阪で開催された推し活EXPOへの出展報告
- **Author**: 営業部
- **ReadTime**: 2
- **IsFeature**: ☐ チェックなし
- **Thumbnail**: `public/news/2/写真１.jpeg` をアップロード

#### 本文
`news-2.md` からコピペして、以下の画像を挿入:
- `public/news/2/写真１.jpeg`
- `public/news/2/写真２.jpeg`

---

### 記事3: プレミアム・インセンティブショー秋2025に出展！

1. Notionデータベースで「新規」をクリック
2. `news-3.md` の内容を参照して以下を設定:

#### プロパティ
- **Name**: プレミアム・インセンティブショー秋2025に出展！
- **Date**: 2025-10-05
- **Tag**: `プレミアム・インセンティブショー`, `コンテスト`, `多機能缶バッジ`, `新商品`
- **Description**: 2025年10月8日〜10日、池袋サンシャインシティで開催される展示会への出展予告
- **Author**: 営業部
- **ReadTime**: 4
- **IsFeature**: ✅ チェック
- **Thumbnail**: `public/news/3/サムネイル.png` をアップロード

#### 本文
`news-3.md` からコピペして、以下の画像を挿入:
- `public/news/3/写真2.jpg`
- `public/news/3/写真３.jpg`
- `public/news/3/写真４.jpg`
- `public/news/3/写真５.jpeg`

---

## 💡 Tips

### 画像の挿入方法
1. 本文中で `/image` と入力
2. 「画像をアップロード」を選択
3. プロジェクトの `public/news/[番号]/` フォルダから該当画像を選択

### タグの追加方法
1. Tagプロパティをクリック
2. 新しいタグ名を入力
3. Enterで確定
4. 複数追加する場合は繰り返し

### 本文のフォーマット
- `##` は見出し2
- `###` は見出し3
- `**太字**` は太字
- `-` はリスト

---

## ✅ 確認事項

すべての記事を追加したら、以下を確認:

- [ ] 3記事すべてが作成されている
- [ ] すべてのプロパティが正しく設定されている
- [ ] 画像がすべてアップロードされている
- [ ] 本文のフォーマットが正しい
- [ ] Tagが正しく設定されている (重複なし)

---

## 🔗 次のステップ

記事の追加が完了したら、開発サーバーで確認:

```bash
npm run dev
```

- トップページ: http://localhost:3003
- ニュース一覧: http://localhost:3003/news
- ニュース詳細: http://localhost:3003/news/[ID]

記事が正しく表示されることを確認してください。
