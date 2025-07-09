import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/types/contact'
import { ZodError } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // バリデーション
    const validatedData = contactFormSchema.parse(body)
    
    // Google Apps Script にデータを送信
    const gasUrl = process.env.GOOGLE_APPS_SCRIPT_URL
    
    if (!gasUrl) {
      throw new Error('Google Apps Script URL is not configured')
    }
    
    const response = await fetch(gasUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    })
    
    const result = await response.json()
    
    if (result.success) {
      return NextResponse.json({ 
        message: result.message || 'お問い合わせを受け付けました。2-3営業日以内にご返信いたします。' 
      })
    } else {
      return NextResponse.json(
        { error: result.error || 'データの保存に失敗しました。' },
        { status: 500 }
      )
    }
    
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
      { error: 'データの送信に失敗しました。しばらく経ってから再度お試しください。' },
      { status: 500 }
    )
  }
}