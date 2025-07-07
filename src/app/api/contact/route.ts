import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/types/contact'
import { resend } from '@/lib/resend'
import { ZodError } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // バリデーション
    const validatedData = contactFormSchema.parse(body)
    
    // メール送信処理
    const emailPromises = [
      // 管理者への通知
      resend.emails.send({
        from: process.env.CONTACT_EMAIL_FROM || 'onboarding@resend.dev',
        to: process.env.CONTACT_EMAIL_TO || 'contact@example.com',
        subject: 'ZIGZAG - 新しいお問い合わせがあります',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              新しいお問い合わせ
            </h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>お名前:</strong> ${validatedData.name}</p>
              <p style="margin: 10px 0;"><strong>会社名:</strong> ${validatedData.company}</p>
              <p style="margin: 10px 0;"><strong>メールアドレス:</strong> ${validatedData.email}</p>
              <p style="margin: 10px 0;"><strong>電話番号:</strong> ${validatedData.phone || '未入力'}</p>
              <p style="margin: 10px 0;"><strong>商品カテゴリ:</strong> ${validatedData.category || '未選択'}</p>
            </div>
            <div style="background: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
              <h3 style="color: #333; margin-top: 0;">お問い合わせ内容:</h3>
              <p style="line-height: 1.6; white-space: pre-wrap;">${validatedData.message}</p>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #666; font-size: 12px;">
              <p>このメールはZIGZAGのお問い合わせフォームから送信されました。</p>
            </div>
          </div>
        `,
      }),
      
      // お客様への自動返信
      resend.emails.send({
        from: process.env.CONTACT_EMAIL_FROM || 'onboarding@resend.dev',
        to: validatedData.email,
        subject: 'ZIGZAG - お問い合わせを受け付けました',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              お問い合わせありがとうございます
            </h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0 0 15px 0; font-size: 16px;">
                <strong>${validatedData.name}様</strong>
              </p>
              <p style="margin: 0 0 15px 0; line-height: 1.6;">
                この度は、ZIGZAGにお問い合わせいただき、誠にありがとうございます。
              </p>
              <p style="margin: 0 0 15px 0; line-height: 1.6;">
                お問い合わせ内容を確認させていただき、<strong>2-3営業日以内</strong>にご返信いたします。
              </p>
              <p style="margin: 0; line-height: 1.6;">
                お急ぎの場合は、お電話にてお問い合わせください。
              </p>
            </div>
            <div style="background: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
              <h3 style="color: #333; margin-top: 0;">送信いただいた内容:</h3>
              <p style="margin: 5px 0;"><strong>お名前:</strong> ${validatedData.name}</p>
              <p style="margin: 5px 0;"><strong>会社名:</strong> ${validatedData.company}</p>
              <p style="margin: 5px 0;"><strong>メールアドレス:</strong> ${validatedData.email}</p>
              <p style="margin: 5px 0;"><strong>商品カテゴリ:</strong> ${validatedData.category || '未選択'}</p>
              <p style="margin: 15px 0 5px 0;"><strong>お問い合わせ内容:</strong></p>
              <p style="background: #f8f9fa; padding: 10px; border-radius: 4px; line-height: 1.6; white-space: pre-wrap;">${validatedData.message}</p>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #666; font-size: 14px;">
              <p style="margin: 0 0 10px 0;"><strong>ZIGZAG</strong></p>
              <p style="margin: 0;">高品質なオリジナルグッズの製造・販売</p>
            </div>
          </div>
        `,
      }),
    ]
    
    await Promise.all(emailPromises)
    
    return NextResponse.json({ 
      message: 'お問い合わせを受け付けました。2-3営業日以内にご返信いたします。' 
    })
    
  } catch (error) {
    console.error('Contact form error:', error)
    
    // バリデーションエラーの場合
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: '入力内容に不備があります。', details: error.errors },
        { status: 400 }
      )
    }
    
    // その他のエラー
    return NextResponse.json(
      { error: 'メール送信に失敗しました。しばらく経ってから再度お試しください。' },
      { status: 500 }
    )
  }
}