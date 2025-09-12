function doPost(e) {
  try {
    // スプレッドシートを取得（このスクリプトに紐付いたシート）
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // POSTデータを解析
    const data = JSON.parse(e.postData.contents);
    
    // データ配列を作成
    const rowData = [
      new Date().toLocaleString('ja-JP'), // 送信日時
      data.contactType || '',             // 問い合わせタイプ（inquiry/quote/sample）
      data.name || '',                    // 名前
      data.company || '',                 // 会社名
      data.position || '',                // 役職
      data.email || '',                   // メールアドレス
      data.address || '',                 // 住所
      data.phone || '',                   // 電話番号
      data.category || '',                // 商品カテゴリ
      data.message || ''                  // お問い合わせ内容
    ];
    
    // データをスプレッドシートに追加
    sheet.appendRow(rowData);
    
    // メール通知を送信
    sendNotificationEmail(rowData);
    
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

function sendNotificationEmail(rowData) {
  const recipient = 'yamashita98syota@gmail.com';
  
  // 問い合わせタイプによってメール件名を変更
  const contactTypeMap = {
    'inquiry': 'お問い合わせ',
    'quote': '見積もり依頼', 
    'sample': 'サンプル送付依頼'
  };
  const contactTypeLabel = contactTypeMap[rowData[1]] || 'お問い合わせ';
  const subject = `ZIGZAG - 新しい${contactTypeLabel}があります`;
  
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
        新しい${contactTypeLabel}
      </h2>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 10px 0;"><strong>送信日時:</strong> ${rowData[0]}</p>
        <p style="margin: 10px 0;"><strong>問い合わせタイプ:</strong> ${contactTypeLabel}</p>
        <p style="margin: 10px 0;"><strong>お名前:</strong> ${rowData[2]}</p>
        <p style="margin: 10px 0;"><strong>会社名:</strong> ${rowData[3]}</p>
        ${rowData[4] ? `<p style="margin: 10px 0;"><strong>役職:</strong> ${rowData[4]}</p>` : ''}
        <p style="margin: 10px 0;"><strong>メールアドレス:</strong> ${rowData[5]}</p>
        ${rowData[6] ? `<p style="margin: 10px 0;"><strong>住所:</strong> ${rowData[6]}</p>` : ''}
        <p style="margin: 10px 0;"><strong>電話番号:</strong> ${rowData[7] || '未入力'}</p>
        <p style="margin: 10px 0;"><strong>商品カテゴリ:</strong> ${rowData[8] || '未選択'}</p>
      </div>
      <div style="background: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
        <h3 style="color: #333; margin-top: 0;">${rowData[1] === 'sample' ? '希望サンプル:' : 'お問い合わせ内容:'}</h3>
        <p style="line-height: 1.6; white-space: pre-wrap;">${rowData[9]}</p>
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