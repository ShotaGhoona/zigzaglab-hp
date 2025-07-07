# 03. 本番環境メール設定手順

## 📋 概要

本番環境でのメール送信機能を設定します。以下の構成で進めます：

- **Webサイト**: `https://zigzaglab.biz`
- **メール受信**: `zigzag@koyoeng.biz`
- **メール送信元**: `noreply@koyoeng.biz`

## 🎯 必要な作業

### Phase 1: koyoeng.bizドメインの認証
### Phase 2: 環境変数の更新
### Phase 3: 本番テスト
### Phase 4: デプロイ設定

---

## 🔧 Phase 1: koyoeng.bizドメインの認証

### Step 1-1: Resendでドメインを追加

1. **Resendダッシュボードにログイン**
   - URL: https://resend.com/dashboard

2. **Domainsページに移動**
   - 左サイドバー「Domains」をクリック
   - または直接URL: https://resend.com/domains

3. **ドメインを追加**
   - 「Add Domain」ボタンをクリック
   - ドメイン名: `koyoeng.biz` を入力
   - 「Add」ボタンをクリック

### Step 1-2: DNS設定の実行

Resendから提供されるDNS設定を実行してください。通常以下の3つのレコードが必要です：

#### 1. SPFレコード
```
タイプ: TXT
名前: @ (または空欄)
値: v=spf1 include:_spf.resend.com ~all
```

#### 2. DKIMレコード
```
タイプ: TXT
名前: resend._domainkey
値: [Resendが提供する値]
```

#### 3. DMARCレコード
```
タイプ: TXT
名前: _dmarc
値: v=DMARC1; p=quarantine; rua=mailto:dmarc@koyoeng.biz
```

### Step 1-3: DNS設定の確認

1. **DNS設定完了後**
   - 設定が反映されるまで1-24時間待機
   - Resendダッシュボードで「Verify」ボタンをクリック

2. **確認方法**
   - ドメインのステータスが「Verified」になることを確認
   - 緑色のチェックマークが表示される

---

## 🔄 Phase 2: 環境変数の更新

### Step 2-1: 開発環境の更新

`.env.local`ファイルを以下のように更新：

```env
# Resend API Key
RESEND_API_KEY=re_CMapMhtU_LsYZ31TNMHZHrsZc6kAkPRLG

# Email configuration (Production)
CONTACT_EMAIL_FROM=noreply@koyoeng.biz
CONTACT_EMAIL_TO=zigzag@koyoeng.biz
```

### Step 2-2: 本番環境の設定

デプロイ先（Vercel/Netlify等）で以下の環境変数を設定：

```env
RESEND_API_KEY=re_CMapMhtU_LsYZ31TNMHZHrsZc6kAkPRLG
CONTACT_EMAIL_FROM=noreply@koyoeng.biz
CONTACT_EMAIL_TO=zigzag@koyoeng.biz
```

---

## 🧪 Phase 3: 本番テスト

### Step 3-1: ローカルテスト

1. **開発サーバーを再起動**
   ```bash
   npm run dev
   ```

2. **お問い合わせフォームでテスト**
   - http://localhost:3000 にアクセス
   - テストデータを入力して送信
   - 成功メッセージが表示されることを確認

### Step 3-2: メール受信確認

1. **zigzag@koyoeng.bizでメール確認**
   - 管理者向け通知メールが届くことを確認
   - 件名: "ZIGZAG - 新しいお問い合わせがあります"

2. **自動返信メール確認**
   - 入力したメールアドレスに自動返信が届くことを確認
   - 件名: "ZIGZAG - お問い合わせを受け付けました"

### Step 3-3: エラーログの確認

1. **Resendダッシュボードで確認**
   - https://resend.com/emails
   - 送信履歴とエラーログを確認

2. **開発者ツールで確認**
   - ブラウザのコンソールでエラーがないことを確認
   - ネットワークタブで200レスポンスを確認

---

## 🚀 Phase 4: デプロイ設定

### Step 4-1: 本番デプロイ

1. **コードをプッシュ**
   ```bash
   git add .
   git commit -m "Add Resend email functionality for production"
   git push origin main
   ```

2. **デプロイ先で環境変数を設定**
   - Vercelの場合: Project Settings → Environment Variables
   - Netlifyの場合: Site Settings → Environment Variables

### Step 4-2: 本番環境テスト

1. **本番サイトにアクセス**
   - https://zigzaglab.biz でお問い合わせフォームをテスト

2. **メール送信確認**
   - zigzag@koyoeng.biz でメール受信を確認

---

## 📊 設定完了チェックリスト

### DNS設定
- [ ] koyoeng.bizドメインをResendに追加
- [ ] SPFレコードを設定
- [ ] DKIMレコードを設定
- [ ] DMARCレコードを設定
- [ ] ドメインが「Verified」状態になっている

### 環境変数
- [ ] .env.localを本番用に更新
- [ ] デプロイ先の環境変数を設定
- [ ] RESEND_API_KEYが正しく設定されている
- [ ] メールアドレスが正しく設定されている

### テスト
- [ ] ローカル環境でメール送信成功
- [ ] zigzag@koyoeng.bizでメール受信確認
- [ ] 自動返信メール受信確認
- [ ] 本番環境でメール送信成功
- [ ] Resendダッシュボードでエラーなし

### デプロイ
- [ ] 本番環境にデプロイ完了
- [ ] 本番サイトでお問い合わせフォーム動作確認
- [ ] 本番環境でメール送信・受信確認

---

## 🔍 トラブルシューティング

### DNS設定が反映されない場合
1. **DNS設定の確認**
   - 設定値が正確かチェック
   - TTL設定を確認（通常300-3600秒）

2. **DNS確認コマンド**
   ```bash
   # SPFレコードの確認
   dig TXT koyoeng.biz
   
   # DKIMレコードの確認
   dig TXT resend._domainkey.koyoeng.biz
   ```

### メール送信エラーの場合
1. **Resendダッシュボードでエラー確認**
   - https://resend.com/emails
   - エラーメッセージを確認

2. **よくあるエラー**
   - `domain_not_verified`: ドメイン認証が未完了
   - `invalid_from_address`: 送信元アドレスが無効
   - `rate_limit_exceeded`: 送信制限に達している

### メールが届かない場合
1. **迷惑メールフォルダを確認**
2. **SPF/DKIM/DMARC設定を再確認**
3. **Resendの送信ログを確認**

---

## 📞 サポート

### 作業中に問題が発生した場合
1. **Resend公式ドキュメント**: https://resend.com/docs
2. **DNS設定ガイド**: https://resend.com/docs/send-with-domains
3. **Resendサポート**: https://resend.com/support

### 次のステップ
設定完了後、以下のドキュメントを参照：
- `04-maintenance-guide.md` - 運用・保守手順（今後作成予定）
- `05-email-customization.md` - メールテンプレートカスタマイズ（今後作成予定）

---

## ⚠️ 重要な注意事項

1. **API Keyの管理**
   - 絶対に公開リポジトリにコミットしない
   - 定期的にローテーションを実施

2. **メール送信制限**
   - 無料プランは月間3,000通まで
   - 制限を超える場合は有料プランへ移行

3. **DNS設定の影響**
   - DNS設定変更は既存のメール配信に影響する可能性
   - 設定前に現在のメール設定を確認

4. **テスト環境の分離**
   - 本番とテストで異なる環境変数を使用
   - テスト時は実際のメールアドレスへの送信に注意