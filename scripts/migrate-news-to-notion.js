/**
 * News Migration Script: JSON to Notion
 * 既存のニュース記事JSONデータをNotionデータベースに移行
 */

const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

// .env.localファイルを手動で読み込み
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=:#]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    envVars[key] = value;
  }
});

const notion = new Client({
  auth: envVars.NOTION_API_KEY,
});

const DATABASE_ID = envVars.NOTION_NEWS_DATABASE_ID;

// 移行するニュースデータ
const newsData = [
  {
    "id": "1",
    "title": "推し活EXPO開催",
    "excerpt": "9/24(水)~9/26(金) インテックス大阪にて推し活EXPO開催！",
    "content": "<p>このたび、インテックス大阪で開催される <strong>「推し活EXPO」</strong> に出展いたします。</p><p><strong>開催日：</strong>2025年9月24日(水)～26(金)<br><strong>場所：</strong>インテックス大阪<br><strong>小間番号：</strong>W5-41</p><div class=\"mb-8\"><img src=\"/news/1/写真１.png\" alt=\"推し活EXPO会場の様子\" class=\"w-full rounded-lg\" /></div><p>推し活EXPOは<strong>「推し消費」</strong>に注目した業界初の\"推し活\"の専門展示会です。</p><p>当社は缶バッジ・アクリルグッズのメーカーとして、推し活をさらに楽しく彩るオリジナルアイテムをご紹介いたします。</p><h3>出展アイテム一押し！</h3><h4>多機能缶バッジ</h4><p>スタンドやキーホルダー用のヒンジがついたオリジナル缶バッジ。<br>使わない機能は隠せて使用できるこれまでになかった新しい缶バッジ。</p><div class=\"mb-8\"><img src=\"/news/1/写真２.jpg\" alt=\"多機能缶バッジの詳細\" class=\"w-full rounded-lg\" /></div><h4>10mm厚アクリルスタンド</h4><p>高出力レーザー加工機にて加工した10mmのアクリルスタンド。<br>厚みだけで自立するので置き場所を選びません。</p><div class=\"mb-8\"><img src=\"/news/1/写真３.jpeg\" alt=\"10mm厚アクリルスタンド\" class=\"w-full rounded-lg\" /></div><p>ぜひ会場で、実物をご覧ください！</p><p>皆さまのご来場を心よりお待ちしております。</p>",
    "category": "イベント",
    "featured_image_url": "/news/1/サムネイル.jpeg",
    "featured_image_alt": "推し活EXPOのイメージ",
    "author": "営業部",
    "published_at": "2024-09-16T10:00:00Z",
    "updated_at": "2024-09-16T10:00:00Z",
    "read_time_minutes": 3,
    "is_featured": true,
    "tags": [
      {"id": "1", "tag_name": "推し活EXPO"},
      {"id": "2", "tag_name": "展示会"},
      {"id": "3", "tag_name": "多機能缶バッジ"},
      {"id": "4", "tag_name": "アクリルスタンド"}
    ]
  },
  {
    "id": "2",
    "title": "「推し活EXPO」＠インテックス大阪に出展しました。",
    "excerpt": "2025年9月24日〜26日、インテックス大阪で開催された推し活EXPOへの出展報告",
    "content": "<p>ZIGZAG Labは、2025年9月24日(水)～26日(金)までの3日間、インテックス大阪にて開催された <strong>「推し活EXPO」</strong> に出展しました。</p><p>今回のEXPOは、ライフスタイルWeek大阪の中核展示「推し活グッズ＆サービス」ゾーンの一角として催され、全国から\"推し\"に関連する企業が集結いたしました。</p><div class=\"mb-8\"><img src=\"/news/2/写真１.jpeg\" alt=\"推し活EXPO会場の様子\" class=\"w-full rounded-lg\" /></div><p>今回は弊社が企画・開発を行った <strong>「多機能缶バッジ」</strong>、高出力レーザーを用いた <strong>「10mmアクリルスタンド」</strong> を中心に推し活グッズの展示を行いました。</p><p>ZIGZAG Lab展示ブースまで足を運んでいただきましたお客様ならびに関係者の方々に厚く御礼申し上げます。</p><h3>展示内容</h3><ul><li><strong>アクリル製品</strong></li><li><strong>多機能缶バッジ</strong></li><li><strong>紙パッケージ</strong></li></ul><div class=\"mb-8\"><img src=\"/news/2/写真２.jpeg\" alt=\"展示商品の詳細\" class=\"w-full rounded-lg\" /></div><p>今後もZIGZAG Labは、推し活をより楽しく彩るオリジナルアイテムの企画・開発を続けてまいります。</p>",
    "category": "イベント",
    "featured_image_url": "/news/2/写真１.jpeg",
    "featured_image_alt": "推し活EXPO出展報告のイメージ",
    "author": "営業部",
    "published_at": "2025-09-27T14:00:00Z",
    "updated_at": "2025-09-27T14:00:00Z",
    "read_time_minutes": 2,
    "is_featured": false,
    "tags": [
      {"id": "5", "tag_name": "推し活EXPO"},
      {"id": "6", "tag_name": "出展報告"},
      {"id": "7", "tag_name": "多機能缶バッジ"},
      {"id": "8", "tag_name": "アクリル製品"}
    ]
  },
  {
    "id": "3",
    "title": "プレミアム・インセンティブショー秋2025に出展！",
    "excerpt": "2025年10月8日〜10日、池袋サンシャインシティで開催される展示会への出展予告",
    "content": "<p>2025年10月8日（水）～10日（金）、池袋で開催される <strong>「プレミアム・インセンティブショー秋」</strong> に、ZIGZAG Labが出展いたします。</p><p>当社は缶バッジ・アクリル製品をはじめとしたグッズの企画・製造を行っており、今回の展示会では特許出願済み <strong>「多機能缶バッジシリーズ」</strong> を中心に缶バッジ・アクリル製品を出展します。</p><h3>出展の目玉商品（コンテスト出品作品）</h3><p>今回の展示会では、下記4点の新発想缶バッジを <strong>コンテストにも出品</strong> いたします。</p><p>ぜひ会場で実物を手に取り、他にはない新しい魅力をご体感ください。</p><h4>ヒンジ・スタンド付き缶バッジ</h4><p>立てかけて飾れるディスプレイ機能付き</p><div class=\"mb-8\"><img src=\"/news/3/写真2.jpg\" alt=\"ヒンジ・スタンド付き缶バッジ\" class=\"w-full rounded-lg\" /></div><h4>マグネット付き缶バッジ</h4><p>両面缶バッジにもなる使い方多様な缶バッジ</p><div class=\"mb-8\"><img src=\"/news/3/写真３.jpg\" alt=\"マグネット付き缶バッジ\" class=\"w-full rounded-lg\" /></div><h4>アクリルチャーム付き缶バッジ</h4><p>揺れるチャームがかわいい、多機能缶バッジ</p><div class=\"mb-8\"><img src=\"/news/3/写真４.jpg\" alt=\"アクリルチャーム付き缶バッジ\" class=\"w-full rounded-lg\" /></div><h4>連結缶バッジ</h4><p>缶バッジを複数をつなげられる新感覚デザイン</p><div class=\"mb-8\"><img src=\"/news/3/写真５.jpeg\" alt=\"連結缶バッジ\" class=\"w-full rounded-lg\" /></div><p>いずれも当社オリジナルのバックパーツを採用した、他にはないアイテムです。</p><h3>開催概要</h3><ul><li><strong>展示会名</strong>：プレミアム・インセンティブショー秋2025</li><li><strong>会期</strong>：2025年10月8日（水）～10日（金）</li><li><strong>会場</strong>：池袋 サンシャインシティ文化会館ビル</li><li><strong>展示ブース</strong>：3063</li></ul><p>ZIGZAG Labは、缶バッジの新たな可能性を追求し続けます。</p><p><strong>ぜひ会場にお越しいただき、コンテスト展示エリアで私たちの新商品をご覧ください！</strong></p>",
    "category": "イベント",
    "featured_image_url": "/news/3/サムネイル.png",
    "featured_image_alt": "プレミアム・インセンティブショー秋2025のイメージ",
    "author": "営業部",
    "published_at": "2025-10-05T09:00:00Z",
    "updated_at": "2025-10-05T09:00:00Z",
    "read_time_minutes": 4,
    "is_featured": true,
    "tags": [
      {"id": "9", "tag_name": "プレミアム・インセンティブショー"},
      {"id": "10", "tag_name": "コンテスト"},
      {"id": "11", "tag_name": "多機能缶バッジ"},
      {"id": "12", "tag_name": "新商品"}
    ]
  }
];

/**
 * HTMLをNotionブロックに変換
 * 簡易的な変換（パース）を行う
 */
function htmlToNotionBlocks(html) {
  const blocks = [];

  // HTMLタグを削除して簡易的にパース
  const lines = html
    .replace(/<div[^>]*>/g, '')
    .replace(/<\/div>/g, '')
    .split(/<\/p>|<\/h3>|<\/h4>|<\/ul>|<\/li>/);

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // 見出し3
    if (trimmed.includes('<h3>')) {
      const text = trimmed.replace(/<[^>]+>/g, '').trim();
      if (text) {
        blocks.push({
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [{
              type: 'text',
              text: { content: text }
            }]
          }
        });
      }
      return;
    }

    // 見出し4
    if (trimmed.includes('<h4>')) {
      const text = trimmed.replace(/<[^>]+>/g, '').trim();
      if (text) {
        blocks.push({
          object: 'block',
          type: 'heading_3',
          heading_3: {
            rich_text: [{
              type: 'text',
              text: { content: text }
            }]
          }
        });
      }
      return;
    }

    // リスト項目
    if (trimmed.includes('<li>') || trimmed.includes('<ul>')) {
      const text = trimmed.replace(/<[^>]+>/g, '').trim();
      if (text && !text.match(/^</) && text.length > 0) {
        blocks.push({
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [{
              type: 'text',
              text: { content: text }
            }]
          }
        });
      }
      return;
    }

    // 画像
    if (trimmed.includes('<img')) {
      const srcMatch = trimmed.match(/src="([^"]+)"/);
      const altMatch = trimmed.match(/alt="([^"]+)"/);

      if (srcMatch) {
        const imageUrl = srcMatch[1];
        // 相対パスを絶対URLに変換（本番環境のURLに置き換える必要あり）
        const fullUrl = imageUrl.startsWith('http')
          ? imageUrl
          : `https://zigzaglab.jp${imageUrl}`;

        blocks.push({
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{
              type: 'text',
              text: { content: `📷 画像: ${altMatch ? altMatch[1] : imageUrl}` }
            }]
          }
        });

        // Note: Notion APIで外部画像を追加するには、画像がパブリックにアクセス可能である必要があります
        // 現在は画像の説明テキストとして追加しています
      }
      return;
    }

    // 通常の段落
    if (trimmed.includes('<p>')) {
      let text = trimmed.replace(/<p>/g, '').replace(/<br\s*\/?>/g, '\n').trim();

      // strongタグを太字に変換（Notionのrich_textで対応可能）
      const hasStrong = text.includes('<strong>');
      text = text.replace(/<[^>]+>/g, '');

      if (text) {
        blocks.push({
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{
              type: 'text',
              text: { content: text },
              annotations: hasStrong ? { bold: true } : {}
            }]
          }
        });
      }
    }
  });

  return blocks;
}

/**
 * Notionページを作成
 */
async function createNewsPage(newsItem) {
  try {
    console.log(`\n📝 Creating page: "${newsItem.title}"`);

    // プロパティの準備
    const properties = {
      Name: {
        title: [{
          text: { content: newsItem.title }
        }]
      },
      Date: {
        date: {
          start: newsItem.published_at.split('T')[0]
        }
      },
      Tag: {
        multi_select: newsItem.tags.map(tag => ({ name: tag.tag_name }))
      },
      Description: {
        rich_text: [{
          text: { content: newsItem.excerpt }
        }]
      },
      Author: {
        rich_text: [{
          text: { content: newsItem.author }
        }]
      },
      ReadTime: {
        number: newsItem.read_time_minutes
      },
      IsFeature: {
        checkbox: newsItem.is_featured
      }
    };

    // Thumbnailは手動で設定する必要があるため、コメントとして残す
    console.log(`   Thumbnail: ${newsItem.featured_image_url}`);

    // ページ作成（Data Sources APIを使用）
    const response = await notion.pages.create({
      parent: {
        type: 'database_id',
        database_id: DATABASE_ID
      },
      properties: properties
    });

    console.log(`✅ Page created with ID: ${response.id}`);

    // 本文ブロックを追加
    const blocks = htmlToNotionBlocks(newsItem.content);

    if (blocks.length > 0) {
      // Notion APIは一度に100ブロックまでしか追加できないため、分割して追加
      const chunkSize = 100;
      for (let i = 0; i < blocks.length; i += chunkSize) {
        const chunk = blocks.slice(i, i + chunkSize);
        await notion.blocks.children.append({
          block_id: response.id,
          children: chunk
        });
      }
      console.log(`   Added ${blocks.length} blocks to the page`);
    }

    return response;
  } catch (error) {
    console.error(`❌ Error creating page "${newsItem.title}":`, error.message);
    if (error.body) {
      console.error('   Error details:', JSON.stringify(error.body, null, 2));
    }
    throw error;
  }
}

/**
 * メイン処理
 */
async function main() {
  console.log('🚀 Starting News Migration to Notion...\n');
  console.log(`Database ID: ${DATABASE_ID}`);
  console.log(`Total items to migrate: ${newsData.length}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const newsItem of newsData) {
    try {
      await createNewsPage(newsItem);
      successCount++;

      // APIレート制限を避けるため、少し待機
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Migration Summary');
  console.log('='.repeat(60));
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log(`📝 Total: ${newsData.length}`);
  console.log('='.repeat(60));

  console.log('\n⚠️  Important Notes:');
  console.log('1. Thumbnail images need to be uploaded manually to each page');
  console.log('2. Images in content are converted to text references');
  console.log('3. Please review and format the pages in Notion');
  console.log('4. Make sure to add the ID property manually if needed\n');
}

main().catch(console.error);
