/**
 * Test Notion Page Creation
 * データベースへのページ作成をテスト
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

async function testCreate() {
  console.log('🧪 Testing Notion Page Creation...\n');
  console.log(`Database ID: ${DATABASE_ID}\n`);

  try {
    // 最小限のプロパティでページ作成を試す
    const response = await notion.pages.create({
      parent: {
        type: 'database_id',
        database_id: DATABASE_ID
      },
      properties: {
        Name: {
          title: [{
            text: { content: 'テスト記事' }
          }]
        }
      }
    });

    console.log('✅ Success! Page created:');
    console.log(`   ID: ${response.id}`);
    console.log(`   URL: ${response.url}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code) {
      console.error(`   Code: ${error.code}`);
    }
    if (error.body) {
      console.error('   Details:', JSON.stringify(error.body, null, 2));
    }
  }
}

testCreate();
