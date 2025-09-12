export interface Product {
  name: string
  category: string
  subtitle: string
  description: string
  images: string[]
  mainImage: string
}

export const allProducts: Product[] = [
  // 缶バッジ
  {
    name: "スタンド付き缶バッジ",
    category: "缶バッジ",
    subtitle: "展示用としても活用可能な実用性が特長",
    description: "バッジとしての使用はもちろん、立てて飾れるスタンド機能付きで、陳列・展示にも対応します。ホログラム加工やサイズ違いなど、様々なバリエーションをご用意しています。",
    images: ["/product/01/03.png", "/product/01/01.png", "/product/01/02.png"],
    mainImage: "/product/01/03.png",
  },
  {
    name: "チャーム付き缶バッジ",
    category: "缶バッジ",
    subtitle: "揺れるチャームがアクセント",
    description: "缶バッジにチャームを組み合わせることで、動きと立体感をプラスした高付加価値アイテムです。ホログラム加工やサイズ違いなど、様々なバリエーションをご用意しています。",
    images: ["/product/01/04.png", "/product/01/01.png", "/product/01/02.png"],
    mainImage: "/product/01/04.png",
  },
  {
    name: "缶ストラップ",
    category: "缶バッジ",
    subtitle: "持ち歩きに適したコンパクトなデザイン",
    description: "缶バッジのデザイン性を活かしたストラップ仕様。携帯性に優れ、常時のプロモーションツールとして活用できます。ホログラム加工やサイズ違いなど、様々なバリエーションをご用意しています。",
    images: ["/product/01/05.png", "/product/01/01.png", "/product/01/02.png"],
    mainImage: "/product/01/05.png",
  },
  {
    name: "ツインフェイスストラップ",
    category: "缶バッジ",
    subtitle: "両面にデザインを施すことで視認性を向上",
    description: "表裏で異なるデザインを楽しめる2面構成。用途やシーンに応じた訴求が可能です。ホログラム加工やサイズ違いなど、様々なバリエーションをご用意しています。",
    images: ["/product/01/06.png", "/product/01/01.png", "/product/01/02.png"],
    mainImage: "/product/01/06.png",
  },
  {
    name: "連結ストラップ",
    category: "缶バッジ",
    subtitle: "複数モチーフを一体化した連携型仕様",
    description: "複数の缶バッジを連結させることで、シリーズ性・コレクション性を演出できます。キャラクター展開に最適です。ホログラム加工やサイズ違いなど、様々なバリエーションをご用意しています。",
    images: ["/product/01/07.png", "/product/01/01.png", "/product/01/02.png"],
    mainImage: "/product/01/07.png",
  },
  // アクリル
  {
    name: "アクリルスタンド",
    category: "アクリル",
    subtitle: "安定感と透明感が特徴のディスプレイ向けアイテム",
    description: "透明感と強度を兼ね備えたアクリル製のスタンド型アイテム。ディスプレイ性に優れ、飾って楽しむ商品として人気です。A2サイズまでの印刷カットが可能で、オーロラ加工などの特殊加工も承っています。",
    images: ["/product/02/01.png", "/product/02/02.png", "/product/02/03.png"],
    mainImage: "/product/02/01.png",
  },
  {
    name: "アクリルキーホルダー",
    category: "アクリル",
    subtitle: "実用性と視覚的訴求を両立したアクセサリー",
    description: "厚みと高精細印刷による視覚的なインパクトが特徴。日常使いのアイテムとしても優れた訴求効果があります。A2サイズまでの印刷カットが可能で、オーロラ加工などの特殊加工も承っています。",
    images: ["/product/02/02.png", "/product/02/01.png", "/product/02/03.png"],
    mainImage: "/product/02/02.png",
  },
  {
    name: "アクリル観覧車",
    category: "アクリル",
    subtitle: "可動性と装飾性を備えた立体構造",
    description: "アクリルパーツを使用した回転式のディスプレイ型アイテム。複数キャラクターを一体で展開できます。A2サイズまでの印刷カットが可能で、オーロラ加工などの特殊加工も承っています。",
    images: ["/product/02/03.png", "/product/02/01.png", "/product/02/02.png"],
    mainImage: "/product/02/03.png",
  },
  {
    name: "アクリルバイキング",
    category: "アクリル",
    subtitle: "ダイナミックな演出が可能な可動タイプ",
    description: "可動性を持たせた仕様で、視覚的に動きのある演出が可能。遊び心と高級感を両立しています。A2サイズまでの印刷カットが可能で、オーロラ加工などの特殊加工も承っています。",
    images: ["/product/02/05.png", "/product/02/01.png", "/product/02/02.png"],
    mainImage: "/product/02/05.png",
  },
  {
    name: "アクリルブランコ",
    category: "アクリル",
    subtitle: "柔らかな動きが視覚的効果を高める",
    description: "キャラクターやモチーフがゆらゆらと揺れる仕掛け付き。癒し効果と独自性を兼ね備えた商品です。A2サイズまでの印刷カットが可能で、オーロラ加工などの特殊加工も承っています。",
    images: ["/product/02/06.png", "/product/02/01.png", "/product/02/02.png"],
    mainImage: "/product/02/06.png",
  },
  // その他
  {
    name: "缶バッジスタンド_サークル",
    category: "その他",
    subtitle: "丸型缶バッジの展示に最適な専用台座",
    description: "円形缶バッジの展示に特化した専用スタンド。シンプルな構造で、イベントや店頭でも扱いやすい設計です。様々なサイズに対応し、ディスプレイ効果を最大限に高めます。",
    images: ["/product/03/01.png", "/product/03/02.png"],
    mainImage: "/product/03/01.png",
  },
  {
    name: "缶バッジスタンド_ハート",
    category: "その他",
    subtitle: "ハート型バッジを美しく飾る専用設計",
    description: "ハート型缶バッジの形状にフィットした専用スタンド。製品の魅力を最大限に引き出す什器として活用できます。様々なサイズに対応し、ディスプレイ効果を最大限に高めます。",
    images: ["/product/03/02.png", "/product/03/01.png"],
    mainImage: "/product/03/02.png",
  },
]