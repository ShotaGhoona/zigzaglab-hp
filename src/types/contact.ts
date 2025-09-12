import { z } from 'zod'

// お問い合わせフォームのバリデーションスキーマ
export const contactFormSchema = z.object({
  name: z.string().min(1, 'お名前を入力してください'),
  company: z.string().min(1, '会社名を入力してください'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  phone: z.string().optional(),
  category: z.string().optional(),
  message: z.string().min(1, 'お問い合わせ内容を入力してください'),
})

// 型定義
export type ContactFormData = z.infer<typeof contactFormSchema>