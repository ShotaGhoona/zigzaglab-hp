"use client"

import { useEffect, useState } from "react"

interface FormData {
  name: string
  company: string
  position: string
  email: string
  address: string
  phone: string
  category: string
  message: string
}

type ContactType = 'inquiry' | 'quote' | 'sample'

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<ContactType>('inquiry')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    position: '',
    email: '',
    address: '',
    phone: '',
    category: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('contact-section')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const getTabConfig = (tab: ContactType) => {
    switch (tab) {
      case 'inquiry':
        return {
          title: 'お問い合わせ',
          showAddress: false,
          addressRequired: false,
          messageLabel: 'お問い合わせ内容',
          messagePlaceholder: 'お問い合わせ内容をお書きください。'
        }
      case 'quote':
        return {
          title: '見積もり依頼',
          showAddress: true,
          addressRequired: false,
          messageLabel: 'お問い合わせ内容',
          messagePlaceholder: 'お見積りしたい商品や内容をお書きください。'
        }
      case 'sample':
        return {
          title: 'サンプル送付',
          showAddress: true,
          addressRequired: true,
          messageLabel: '希望サンプル',
          messagePlaceholder: '希望するサンプルがありましたらお書き下さい'
        }
      default:
        return {
          title: 'お問い合わせ',
          showAddress: false,
          addressRequired: false,
          messageLabel: 'お問い合わせ内容',
          messagePlaceholder: 'お問い合わせ内容をお書きください。'
        }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, contactType: activeTab }),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'お問い合わせを送信しました！'
        })
        setFormData({
          name: '',
          company: '',
          position: '',
          email: '',
          address: '',
          phone: '',
          category: '',
          message: ''
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || '送信に失敗しました。'
        })
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'ネットワークエラーが発生しました。もう一度お試しください。'
      })
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <section 
      id="contact-section"
      className="py-24 px-6 bg-gradient-to-b from-background to-secondary/5"
    >
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-6xl font-light text-foreground mb-6">
            お<span className="font-bold text-primary">問い合わせ</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
            ご質問やご相談など、お気軽にお問い合わせください。
          </p>
        </div>

        {/* 連絡先カード */}

        {/* お問い合わせフォーム */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-card/30 backdrop-blur-sm rounded-3xl border border-border/20 p-8 md:p-12">
            {/* タブナビゲーション */}
            <div className="flex justify-center mb-10">
              <div className="bg-background/50 backdrop-blur-sm p-2 rounded-2xl border border-border/20 inline-flex">
                {[
                  { key: 'inquiry' as ContactType, label: 'お問い合わせ' },
                  { key: 'quote' as ContactType, label: '見積もり依頼' },
                  { key: 'sample' as ContactType, label: 'サンプル送付' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                      activeTab === tab.key
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'text-foreground/70 hover:text-foreground hover:bg-background/30'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center mb-10">
              <h3 className="text-2xl font-light text-foreground mb-4">
                {getTabConfig(activeTab).title}<span className="font-bold text-primary">フォーム</span>
              </h3>
              <p className="text-foreground/70 font-light">
                下記フォームよりお気軽にお問い合わせください
              </p>
            </div>

            {/* ステータスメッセージ */}
            {submitStatus.type && (
              <div className={`p-4 rounded-xl mb-6 ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                    placeholder="山田 太郎"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    会社名 <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                    placeholder="株式会社サンプル"
                  />
                </div>
              </div>

              {/* 役職フィールド */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  役職
                </label>
                <input 
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                  placeholder="経営企画部 マネージャー"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                  placeholder="example@company.com"
                />
              </div>

              {/* 住所フィールド - タブによって表示制御 */}
              {getTabConfig(activeTab).showAddress && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {activeTab === 'sample' ? '送付先住所' : '住所'} 
                    {getTabConfig(activeTab).addressRequired && <span className="text-red-500">*</span>}
                    {activeTab === 'sample' && <span className="text-sm text-foreground/60 block">送付先の住所を記入して下さい</span>}
                  </label>
                  <textarea 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required={getTabConfig(activeTab).addressRequired}
                    rows={3}
                    className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none"
                    placeholder="〒123-4567 東京都渋谷区..."
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  商品カテゴリ
                </label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                >
                  <option value="">選択してください</option>
                  <option value="can-badge">缶バッジ</option>
                  <option value="acrylic">アクリルグッズ</option>
                  <option value="peripheral">周辺グッズ</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {getTabConfig(activeTab).messageLabel} <span className="text-red-500">*</span>
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none"
                  placeholder={getTabConfig(activeTab).messagePlaceholder}
                ></textarea>
              </div>

              <div className="text-center">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 py-4 bg-primary text-primary-foreground rounded-xl font-medium text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? '送信中...' : `${getTabConfig(activeTab).title}を送信する`}
                </button>
                <p className="text-xs text-foreground/60 mt-4 font-light">
                  送信いただいた内容は、営業時間内にご返信いたします。
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 背景装飾 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/6 left-1/12 w-60 h-60 bg-gradient-to-r from-primary/15 via-secondary/10 to-primary/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/6 right-1/12 w-48 h-48 bg-gradient-to-r from-secondary/15 via-primary/10 to-secondary/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
    </section>
  )
}