# Google Apps Script を使った新規問い合わせ通知メール送信の実装戦略

## 概要

スプレッドシートに新しい行が追加された際に、自動的に `zigzag@koyoeng.biz` にメール通知を送信する機能をGoogle Apps Scriptで実装します。

## 戦略

### 1. 現在の状況
- お問い合わせフォームからスプレッドシートへの直接保存が完了
- データはスプレッドシートに蓄積されるが、リアルタイム通知がない
- 手動でスプレッドシートを確認する必要がある

### 2. 実装方針
- **スプレッドシートのトリガー機能を使用**: 新規行追加時に自動実行
- **Gmail API を使用**: Google Apps Script の組み込みメール機能を利用
- **既存のdoPost関数に統合**: 現在の問い合わせ受付機能を拡張

### 3. トリガーの種類
- **onEdit トリガー**: セルの編集時に実行（リアルタイム）
- **onChange トリガー**: スプレッドシートの構造変更時に実行（推奨）
- **Form submit トリガー**: Googleフォーム送信時（今回は不使用）

## 実装アーキテクチャ

### 1. トリガー設定
- `onChange` イベントでスプレッドシートの変更を監視
- 新規行の追加を検知してメール送信を実行

### 2. メール送信機能
- Gmail API を使用してメール作成・送信
- HTMLメール形式で見やすい通知を作成
- 問い合わせ内容を整理して表示

### 3. エラーハンドリング
- メール送信失敗時のリトライ機能
- ログ出力による問題追跡
- 重複送信の防止

## 実装手順

### Phase 1: メール送信機能の実装

#### A. 新しい関数の追加
既存のGoogle Apps Scriptプロジェクトに以下の関数を追加：

```javascript
// メール送信関数
function sendNotificationEmail(rowData) {
  const recipient = 'zigzag@koyoeng.biz';
  const subject = 'ZIGZAG - 新しいお問い合わせがあります';
  
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
        新しいお問い合わせ
      </h2>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 10px 0;"><strong>送信日時:</strong> ${rowData[0]}</p>
        <p style="margin: 10px 0;"><strong>お名前:</strong> ${rowData[1]}</p>
        <p style="margin: 10px 0;"><strong>会社名:</strong> ${rowData[2]}</p>
        <p style="margin: 10px 0;"><strong>メールアドレス:</strong> ${rowData[3]}</p>
        <p style="margin: 10px 0;"><strong>電話番号:</strong> ${rowData[4] || '未入力'}</p>
        <p style="margin: 10px 0;"><strong>商品カテゴリ:</strong> ${rowData[5] || '未選択'}</p>
      </div>
      <div style="background: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
        <h3 style="color: #333; margin-top: 0;">お問い合わせ内容:</h3>
        <p style="line-height: 1.6; white-space: pre-wrap;">${rowData[6]}</p>
      </div>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #666; font-size: 12px;">
        <p>このメールはZIGZAGのお問い合わせ管理システムから自動送信されました。</p>
        <p>スプレッドシート: <a href="${SpreadsheetApp.getActiveSpreadsheet().getUrl()}">お問い合わせ管理</a></p>
      </div>
    </div>
  `;
  
  try {
    GmailApp.sendEmail(recipient, subject, '', {
      htmlBody: htmlBody
    });
    console.log('Email sent successfully to:', recipient);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}
```

#### B. 既存のdoPost関数の拡張
現在のdoPost関数にメール送信機能を組み込み：

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // データをスプレッドシートに追加
    const rowData = [
      new Date().toLocaleString('ja-JP'),
      data.name || '',
      data.company || '',
      data.email || '',
      data.phone || '',
      data.category || '',
      data.message || ''
    ];
    
    sheet.appendRow(rowData);
    
    // メール通知を送信
    sendNotificationEmail(rowData);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'お問い合わせを受け付けました。2-3営業日以内にご返信いたします。'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: 'データの保存に失敗しました。しばらく経ってから再度お試しください。'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Phase 2: バックアップ用トリガーの設定（オプション）

#### A. onChange トリガーの追加
万が一doPost内でのメール送信が失敗した場合のバックアップとして：

```javascript
function onSpreadsheetChange(e) {
  // 新規行の追加を検知
  if (e.changeType === 'INSERT_ROW') {
    const sheet = e.source.getActiveSheet();
    const lastRow = sheet.getLastRow();
    
    // 最後の行のデータを取得
    if (lastRow > 1) { // ヘッダー行を除く
      const rowData = sheet.getRange(lastRow, 1, 1, 7).getValues()[0];
      
      // 空の行でない場合のみメール送信
      if (rowData[1] && rowData[2] && rowData[3]) { // 名前、会社名、メールアドレスが存在する場合
        try {
          sendNotificationEmail(rowData);
        } catch (error) {
          console.error('Failed to send backup notification:', error);
        }
      }
    }
  }
}
```

#### B. トリガーの設定
Google Apps Script エディターで：
1. 「トリガー」メニューから「新しいトリガーを追加」
2. 実行する関数: `onSpreadsheetChange`
3. イベントソース: `スプレッドシートから`
4. イベントタイプ: `変更時`

### Phase 3: テストと検証

#### A. 機能テスト
1. Webフォームからテストデータを送信
2. スプレッドシートにデータが追加されることを確認
3. 指定のメールアドレスに通知が届くことを確認

#### B. エラーハンドリングテスト
1. 不正なメールアドレスでのテスト
2. 大量データ送信時の動作確認
3. Gmail API の制限値テスト

## 技術的考慮事項

### 1. Gmail API の制限
- **1日あたりの送信制限**: 個人アカウント100通/日、G Workspace 1,500通/日
- **1分あたりの送信制限**: 20通/分
- **添付ファイルサイズ制限**: 25MB

### 2. セキュリティ対策
- スクリプトの実行権限を適切に設定
- 機密情報のハードコーディングを避ける
- ログ出力による監査証跡の確保

### 3. パフォーマンス最適化
- 大量データ処理時のタイムアウト対策
- メール送信の非同期処理
- 重複送信の防止メカニズム

## 運用上の注意点

### 1. メール配信の信頼性
- Google Apps Script は無料枠での利用のため、大量処理時に制限がかかる可能性
- 重要な通知の場合は、定期的な手動確認も併用を推奨

### 2. メンテナンス
- 定期的なログ確認
- メール送信失敗時のアラート設定
- スプレッドシートの容量管理

### 3. 拡張性
- 将来的な追加機能（自動返信、カテゴリ別振り分け等）への対応
- 他のシステムとの連携可能性

## 実装後の改善案

### 1. 自動返信機能
- 顧客へのお問い合わせ受付確認メール
- テンプレート化されたメール内容

### 2. 通知の高度化
- Slack などのチャットツールとの連携
- モバイル通知の実装

### 3. 分析機能
- お問い合わせ件数の集計
- カテゴリ別の分析レポート

## 次のステップ

1. **Phase 1**: メール送信機能の実装とテスト
2. **Phase 2**: バックアップトリガーの設定（必要に応じて）
3. **Phase 3**: 本番環境での運用開始
4. **Phase 4**: 運用状況の監視と改善

この戦略により、スプレッドシートへのデータ保存と同時に、リアルタイムでのメール通知が可能になり、お問い合わせ対応の効率が大幅に向上します。