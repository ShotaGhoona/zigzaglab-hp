# Google Apps Script を使ったお問い合わせフォームの実装戦略

## 概要

ResendからGoogle Apps Scriptを使用したスプレッドシート連携へ移行することで、お問い合わせデータを直接Google スプレッドシートに保存する仕組みを構築します。

## 戦略

### 1. 現在の構成の問題点
- Resend APIキーの設定が複雑
- メール送信の不安定性
- 環境変数の管理が必要

### 2. Google Apps Script の利点
- 無料で利用可能
- Google スプレッドシートに直接データ保存
- サーバーレスで運用が簡単
- 設定が最小限

### 3. 実装方針
- 既存のフォームUIはそのまま維持
- APIエンドポイントの送信先のみ変更
- バリデーションロジックは維持

## 実装手順

### Phase 1: Google Apps Script 設定（ユーザー作業）

#### A. スプレッドシート作成
1. Google Drive で新しいスプレッドシートを作成
2. 以下のヘッダーを A1:G1 に設定：
   ```
   送信日時 | 名前 | 会社名 | メールアドレス | 電話番号 | 商品カテゴリ | お問い合わせ内容
   ```

#### B. Google Apps Script 設定
1. スプレッドシート上で「拡張機能」→「Apps Script」を開く
2. 以下のスクリプトをコピー＆ペースト：

```javascript
function doPost(e) {
  try {
    // スプレッドシートを取得（このスクリプトに紐付いたシート）
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // POSTデータを解析
    const data = JSON.parse(e.postData.contents);
    
    // データをスプレッドシートに追加
    sheet.appendRow([
      new Date().toLocaleString('ja-JP'), // 送信日時
      data.name || '',                     // 名前
      data.company || '',                  // 会社名
      data.email || '',                    // メールアドレス
      data.phone || '',                    // 電話番号
      data.category || '',                 // 商品カテゴリ
      data.message || ''                   // お問い合わせ内容
    ]);
    
    // 成功レスポンスを返す
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'お問い合わせを受け付けました。2-3営業日以内にご返信いたします。'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // エラーレスポンスを返す
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: 'データの保存に失敗しました。しばらく経ってから再度お試しください。'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

#### C. Web App として公開
1. 「デプロイ」→「新しいデプロイ」を選択
2. 種類を「ウェブアプリ」に設定
3. 以下の設定を行う：
   - 実行者：「自分」
   - アクセスできるユーザー：「全員」
4. 「デプロイ」をクリック
5. **Web App URL をコピーして保存**（例：`https://script.google.com/macros/s/ABC123.../exec`）

### Phase 2: Next.js アプリケーション修正（開発作業）

#### A. API エンドポイントの修正
- `src/app/api/contact/route.ts` を修正
- Resend を使用したメール送信から Google Apps Script への HTTP リクエストに変更

#### B. 環境変数の設定
- `.env.local` に Google Apps Script の Web App URL を追加

#### C. エラーハンドリングの調整
- Google Apps Script のレスポンス形式に合わせてエラーハンドリングを調整

### Phase 3: テストと検証

#### A. 開発環境でのテスト
1. ローカル環境でフォーム送信をテスト
2. スプレッドシートにデータが正しく保存されることを確認
3. エラーハンドリングが正常に動作することを確認

#### B. 本番環境での検証
1. 本番環境にデプロイ
2. 実際のフォームから送信テスト
3. データの整合性を確認

## ユーザー側で発生する作業

### 必須作業
1. **Google スプレッドシートの作成**
   - 新しいスプレッドシートを作成
   - 指定のヘッダーを設定

2. **Google Apps Script の設定**
   - 提供されたスクリプトをコピー＆ペースト
   - Web App として公開
   - Web App URL を取得

3. **URL の共有**
   - 取得した Web App URL を開発者に共有

### 推奨作業
1. **スプレッドシートの共有設定**
   - 必要に応じて関係者とスプレッドシートを共有
   - 適切な権限設定を行う

2. **通知設定**
   - Google スプレッドシートの通知機能を利用
   - 新しいデータが追加された際の通知を設定

## 技術的メリット

### 1. 実装の簡素化
- 外部APIキーの管理が不要
- メール送信の複雑性を排除
- 環境変数の削減

### 2. 運用の安定性
- Google のインフラを利用
- サーバーレスで運用コストが低い
- 障害リスクの軽減

### 3. データ管理の利便性
- スプレッドシートで直接データ確認
- フィルタリングや検索が簡単
- CSVエクスポート機能

## 制約事項

### 1. 技術的制約
- Google Apps Script の実行時間制限（6分）
- 1日あたりの実行回数制限
- スプレッドシートの行数制限（1000万行）

### 2. 機能的制約
- 自動返信メール機能は別途実装が必要
- リアルタイム通知は設定が必要
- データの暗号化は Google 側に依存

## 次のステップ

1. ユーザーによる Google Apps Script の設定
2. Web App URL の取得と共有
3. 開発環境での実装とテスト
4. 本番環境へのデプロイ

この戦略により、Resend の問題を解決し、より簡単で安定したお問い合わせフォームシステムを構築できます。