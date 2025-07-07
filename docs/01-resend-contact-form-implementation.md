# 01. Resend Contact Form Implementation Guide

## 📋 実装計画概要

ContactSectionのお問い合わせフォームにResendを使用したメール送信機能を実装します。

## 🎯 実装目標

- お客様からのお問い合わせをメールで受信
- お客様への自動返信メール送信
- セキュアで信頼性の高いメール送信システム

## 📊 実装フェーズ

### Phase 1: 環境設定
1. **Resendライブラリのインストール**
   ```bash
   npm install resend zod
   ```

2. **環境変数の設定**
   ```env
   # .env.local
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
   CONTACT_EMAIL_FROM=noreply@yourdomain.com
   CONTACT_EMAIL_TO=contact@yourdomain.com
   ```

3. **Resendアカウント設定**
   - [Resend Dashboard](https://resend.com/dashboard)でAPI Key取得
   - 送信ドメインの設定（オプション）

### Phase 2: 型定義とバリデーション
4. **型定義ファイルの作成**
   - `src/types/contact.ts` - フォームデータの型定義
   - Zodスキーマによるバリデーション

5. **バリデーション機能**
   - 必須項目の検証
   - メールアドレス形式の検証
   - 文字数制限の検証

### Phase 3: API Route実装
6. **API Routeファイルの作成**
   - `src/app/api/contact/route.ts`
   - POST メソッドの実装

7. **Resendクライアントの設定**
   - `src/lib/resend.ts` - Resendクライアントの初期化
   - エラーハンドリング

### Phase 4: メール機能実装
8. **メールテンプレートの作成**
   - お客様への自動返信メール
   - 管理者への通知メール
   - HTMLとテキスト両方のフォーマット

9. **メール送信機能**
   - 同期的な複数メール送信
   - エラーハンドリング
   - ログ出力

### Phase 5: テスト・デバッグ
10. **機能テスト**
    - 正常系のテスト
    - エラー系のテスト
    - レスポンス確認

## 🏗️ 実装詳細

### ディレクトリ構成
```
src/
├── app/
│   └── api/
│       └── contact/
│           └── route.ts          # 新規作成
├── components/
│   └── lp/
│       └── ContactSection.tsx    # 既存（修正なし）
├── lib/
│   ├── resend.ts                # 新規作成
│   └── utils.ts                 # 既存
└── types/
    └── contact.ts               # 新規作成
```

### 技術仕様
- **メール送信**: Resend API v1
- **バリデーション**: Zod (型安全性)
- **エラーハンドリング**: Next.js標準エラーレスポンス
- **型安全性**: TypeScript strict mode

### セキュリティ対策
- 入力値のサニタイズ
- レート制限（必要に応じて）
- CORS設定
- 機密情報の環境変数化

## 📝 実装手順

### 1. パッケージのインストール
```bash
npm install resend zod
```

### 2. 環境変数の設定
```env
# .env.local
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL_FROM=noreply@yourdomain.com
CONTACT_EMAIL_TO=contact@yourdomain.com
```

### 3. 型定義の作成
`src/types/contact.ts`
```typescript
import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(1, '名前は必須です').max(100, '名前は100文字以内で入力してください'),
  company: z.string().min(1, '会社名は必須です').max(100, '会社名は100文字以内で入力してください'),
  email: z.string().email('正しいメールアドレスを入力してください').max(100, 'メールアドレスは100文字以内で入力してください'),
  phone: z.string().max(20, '電話番号は20文字以内で入力してください').optional(),
  category: z.string().max(50, 'カテゴリは50文字以内で入力してください').optional(),
  message: z.string().min(1, 'お問い合わせ内容は必須です').max(2000, 'お問い合わせ内容は2000文字以内で入力してください'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
```

### 4. Resendクライアントの設定
`src/lib/resend.ts`
```typescript
import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not configured')
}

export const resend = new Resend(process.env.RESEND_API_KEY)
```

### 5. API Routeの実装
`src/app/api/contact/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/types/contact'
import { resend } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // バリデーション
    const validatedData = contactFormSchema.parse(body)
    
    // メール送信処理
    const emailPromises = [
      // 管理者への通知
      resend.emails.send({
        from: process.env.CONTACT_EMAIL_FROM!,
        to: process.env.CONTACT_EMAIL_TO!,
        subject: '新しいお問い合わせがあります',
        html: `
          <h2>新しいお問い合わせ</h2>
          <p><strong>名前:</strong> ${validatedData.name}</p>
          <p><strong>会社名:</strong> ${validatedData.company}</p>
          <p><strong>メールアドレス:</strong> ${validatedData.email}</p>
          <p><strong>電話番号:</strong> ${validatedData.phone || '未入力'}</p>
          <p><strong>カテゴリ:</strong> ${validatedData.category || '未選択'}</p>
          <p><strong>お問い合わせ内容:</strong></p>
          <p>${validatedData.message}</p>
        `,
      }),
      
      // お客様への自動返信
      resend.emails.send({
        from: process.env.CONTACT_EMAIL_FROM!,
        to: validatedData.email,
        subject: 'お問い合わせを受け付けました - ZIGZAG',
        html: `
          <h2>お問い合わせありがとうございます</h2>
          <p>${validatedData.name}様</p>
          <p>お問い合わせを受け付けました。</p>
          <p>2-3営業日以内にご返信いたします。</p>
          <br>
          <p>ZIGZAG</p>
        `,
      }),
    ]
    
    await Promise.all(emailPromises)
    
    return NextResponse.json({ 
      message: 'お問い合わせを受け付けました。ご返信をお待ちください。' 
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'メール送信に失敗しました。しばらく経ってから再度お試しください。' },
      { status: 500 }
    )
  }
}
```

## 🧪 テスト手順

### 1. 開発環境でのテスト
```bash
npm run dev
```

### 2. テストケース
- [ ] 正常なフォーム送信
- [ ] 必須項目未入力エラー
- [ ] 無効なメールアドレスエラー
- [ ] 文字数制限エラー
- [ ] ネットワークエラー

### 3. 確認項目
- [ ] 管理者にメールが届く
- [ ] お客様に自動返信メールが届く
- [ ] フォームがリセットされる
- [ ] 成功メッセージが表示される

## 🚀 デプロイ前チェックリスト

- [ ] 環境変数が本番環境に設定されている
- [ ] Resend API Keyが有効
- [ ] 送信先メールアドレスが正しい
- [ ] メールテンプレートが適切
- [ ] エラーハンドリングが適切
- [ ] セキュリティ設定が適切

## 📞 サポート

実装中に問題が発生した場合は、以下を確認してください：
1. Resend API Keyの有効性
2. 環境変数の設定
3. メールアドレスの有効性
4. ネットワーク接続

## 🔄 今後の拡張可能性

- フォームの項目追加
- メールテンプレートのカスタマイズ
- 添付ファイル対応
- CRMシステムとの連携
- お問い合わせ管理画面