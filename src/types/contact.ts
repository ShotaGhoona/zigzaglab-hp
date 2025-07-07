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