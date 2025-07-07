# 02. Resend API Key取得方法

## 📋 概要

Resendを使用してメール送信機能を実装するために必要なAPI Keyの取得方法を説明します。

## 🎯 必要なもの

- 有効なメールアドレス
- Webブラウザ
- インターネット接続

## 📝 手順

### Step 1: Resendアカウントの作成

1. **Resend公式サイトにアクセス**
   - URL: https://resend.com/
   - 右上の「Sign up」をクリック

2. **アカウント情報の入力**
   ```
   - Email: あなたのメールアドレス
   - Password: 安全なパスワード
   ```

3. **メール認証**
   - 登録したメールアドレスに認証メールが送信される
   - メール内のリンクをクリックして認証を完了

### Step 2: ダッシュボードへのログイン

1. **ログイン**
   - URL: https://resend.com/login
   - 登録したメールアドレスとパスワードでログイン

2. **ダッシュボードの確認**
   - ログイン後、Resendダッシュボードが表示される

### Step 3: API Keyの作成

1. **API Keysページに移動**
   - 左サイドバーの「API Keys」をクリック
   - または直接URL: https://resend.com/api-keys

2. **新しいAPI Keyの作成**
   - 「Create API Key」ボタンをクリック
   - API Key名を入力（例: "zigzag-contact-form"）
   - 「Create」ボタンをクリック

3. **API Keyの取得**
   - 作成されたAPI Keyが表示される
   - **重要**: この画面を閉じると二度と確認できません
   - API Keyをコピーして安全な場所に保存

### Step 4: ドメインの設定（オプション）

1. **Domainsページに移動**
   - 左サイドバーの「Domains」をクリック

2. **ドメインの追加**
   - 「Add Domain」ボタンをクリック
   - 使用するドメインを入力（例: yourdomain.com）
   - DNS設定の指示に従ってドメインを認証

3. **認証の確認**
   - DNS設定が完了すると、ドメインが認証済みになる

## 🔧 環境変数の設定

### .env.local ファイルの作成

プロジェクトのルートディレクトリに `.env.local` ファイルを作成し、以下の内容を追加：

```env
# Resend API Key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx

# 送信元メールアドレス（認証済みドメインまたはデフォルト）
CONTACT_EMAIL_FROM=noreply@yourdomain.com

# 受信先メールアドレス（お問い合わせを受け取るアドレス）
CONTACT_EMAIL_TO=contact@yourdomain.com
```

### 設定値の説明

| 変数名 | 説明 | 例 |
|--------|------|-----|
| `RESEND_API_KEY` | Resendから取得したAPI Key | `re_AbCdEfGh_1234567890` |
| `CONTACT_EMAIL_FROM` | 送信元メールアドレス | `noreply@yourdomain.com` |
| `CONTACT_EMAIL_TO` | 受信先メールアドレス | `contact@yourdomain.com` |

## 📧 メールアドレスの設定

### 送信元メールアドレス（FROM）

1. **認証済みドメインを使用する場合**
   ```
   noreply@yourdomain.com
   info@yourdomain.com
   ```

2. **デフォルトドメインを使用する場合**
   ```
   onboarding@resend.dev
   ```
   - 無料プランではデフォルトドメインのみ使用可能

### 受信先メールアドレス（TO）

- お問い合わせを受け取りたいメールアドレス
- 複数のアドレスに送信する場合は配列で指定可能

## 🛡️ セキュリティ注意事項

### API Keyの取り扱い

1. **絶対に公開しない**
   - GitHubなどの公開リポジトリにコミットしない
   - `.env.local`ファイルは`.gitignore`に追加

2. **適切な権限設定**
   - 必要最小限の権限のみを付与
   - 定期的にAPI Keyをローテーション

3. **環境変数の管理**
   ```bash
   # .gitignoreに追加
   .env.local
   .env*.local
   ```

## 📊 プランと制限

### 無料プラン
- 月間3,000通まで無料
- デフォルトドメインのみ使用可能
- 基本的な機能は全て利用可能

### 有料プラン
- より多くのメール送信が可能
- カスタムドメインの使用が可能
- 高度な機能の利用が可能

## 🔍 トラブルシューティング

### よくある問題

1. **API Keyが無効**
   - API Keyが正しくコピーされているか確認
   - 環境変数名が正しいか確認

2. **メール送信に失敗**
   - 送信元メールアドレスが認証済みか確認
   - API Keyの権限設定を確認

3. **ドメイン認証エラー**
   - DNS設定が正しく行われているか確認
   - 設定が反映されるまで時間がかかる場合がある

## 📞 サポート

### Resend公式サポート
- ドキュメント: https://resend.com/docs
- サポート: https://resend.com/support
- コミュニティ: https://resend.com/community

### 次のステップ

API Keyの取得が完了したら、以下のドキュメントを参照して実装を進めてください：
- `01-resend-contact-form-implementation.md` - 実装計画
- `03-implementation-guide.md` - 実装手順（次に作成予定）

## ✅ チェックリスト

- [ ] Resendアカウントを作成
- [ ] メール認証を完了
- [ ] API Keyを作成
- [ ] API Keyを安全に保存
- [ ] .env.localファイルを作成
- [ ] 環境変数を設定
- [ ] ドメインの設定（オプション）
- [ ] .gitignoreにenv.localを追加


re_CMapMhtU_LsYZ31TNMHZHrsZc6kAkPRLG