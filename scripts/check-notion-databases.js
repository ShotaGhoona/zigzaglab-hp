/**
 * Notion Integration Database Checker
 * このスクリプトは、Notionインテグレーションでアクセス可能なデータベースを一覧表示します
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

async function listAccessibleDatabases() {
  console.log('🔍 Notionインテグレーションでアクセス可能なデータベースを検索中...\n');
  console.log(`API Key: ${envVars.NOTION_API_KEY?.substring(0, 20)}...`);
  console.log(`Database ID (設定値): ${envVars.NOTION_NEWS_DATABASE_ID}\n`);

  try {
    // Search for all pages/databases accessible by the integration
    // Notion APIでは'database'は'data_source'として扱われる
    const response = await notion.search({
      filter: {
        property: 'object',
        value: 'data_source'
      },
      sort: {
        direction: 'descending',
        timestamp: 'last_edited_time'
      }
    });

    console.log(`✅ ${response.results.length}個のデータベースが見つかりました:\n`);

    if (response.results.length === 0) {
      console.log('⚠️  アクセス可能なデータベースがありません。');
      console.log('\n📝 以下を確認してください:');
      console.log('1. NotionでIntegrationを作成済みか');
      console.log('2. データベースページでIntegrationを「接続」に追加したか');
      console.log('3. API Keyが正しいか');
      return;
    }

    response.results.forEach((db, index) => {
      console.log(`\n--- データベース ${index + 1} ---`);
      console.log(`ID: ${db.id}`);
      console.log(`タイトル: ${db.title?.[0]?.plain_text || '(タイトルなし)'}`);
      console.log(`URL: ${db.url}`);
      console.log(`最終更新: ${db.last_edited_time}`);

      // プロパティ一覧
      if (db.properties) {
        console.log(`\nプロパティ:`);
        Object.entries(db.properties).forEach(([name, prop]) => {
          console.log(`  - ${name} (${prop.type})`);
        });
      }
    });

    // 設定されているIDと一致するものがあるかチェック
    console.log('\n\n🔎 設定されているDatabase IDとの照合:');
    const configuredId = envVars.NOTION_NEWS_DATABASE_ID;
    const normalizedConfiguredId = configuredId?.replace(/-/g, '');

    const match = response.results.find(db => {
      const normalizedDbId = db.id.replace(/-/g, '');
      return normalizedDbId === normalizedConfiguredId;
    });

    if (match) {
      console.log(`✅ 一致するデータベースが見つかりました: ${match.title?.[0]?.plain_text || match.id}`);
    } else {
      console.log(`❌ 設定されているIDと一致するデータベースが見つかりません`);
      console.log(`\n推奨アクション:`);
      if (response.results.length > 0) {
        console.log(`上記のいずれかのデータベースIDを.env.localのNOTION_NEWS_DATABASE_IDに設定してください`);
      }
    }

  } catch (error) {
    console.error('❌ エラーが発生しました:', error.message);
    if (error.code === 'unauthorized') {
      console.log('\n💡 API Keyが無効です。Notionで正しいIntegration Secretをコピーしてください。');
    }
  }
}

listAccessibleDatabases();
