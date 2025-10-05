import { z } from 'zod'

// お問い合わせフォームのバリデーションスキーマ
export const contactFormSchema = z.object({
  contactType: z.enum(['inquiry', 'quote', 'sample'], {
    required_error: 'お問い合わせタイプを選択してください'
  }),
  name: z.string().min(1, 'お名前を入力してください').max(100, 'お名前は100文字以内で入力してください'),
  company: z.string().min(1, '会社名を入力してください').max(100, '会社名は100文字以内で入力してください'),
  position: z.string().max(100, '役職は100文字以内で入力してください').optional(),
  email: z.string().email('正しいメールアドレスを入力してください').max(100, 'メールアドレスは100文字以内で入力してください'),
  address: z.string().max(200, '住所は200文字以内で入力してください').optional(),
  phone: z.string().max(20, '電話番号は20文字以内で入力してください').optional(),
  category: z.string().max(50, '商品カテゴリは50文字以内で入力してください').optional(),
  message: z.string().min(1, 'お問い合わせ内容を入力してください').max(2000, 'お問い合わせ内容は2000文字以内で入力してください'),
}).refine(
  (data) => {
    // sampleタイプの場合は住所が必須
    if (data.contactType === 'sample') {
      return data.address && data.address.trim().length > 0;
    }
    return true;
  },
  {
    message: 'サンプル送付の場合は送付先住所を入力してください',
    path: ['address']
  }
)

// 型定義
export type ContactFormData = z.infer<typeof contactFormSchema>