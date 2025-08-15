# 享哥哥手搖飲訂購系統

這是一個完整的飲料訂購系統，客戶可以選購多種飲料，系統會自動記錄到 Google Sheets 並發送確認郵件。

## 🎯 系統功能

- 📱 一頁式訂購介面，支援手機和電腦
- 🛒 購物車功能，可以訂購多種飲料
- 📊 自動記錄訂單到 Google Sheets
- 📧 自動發送確認郵件給客戶
- 🤖 可選：使用 AI 生成個性化郵件
- ⚡ 智能預設值：中杯、去冰、微糖（提升訂購效率）

## 📁 檔案說明

- `index.html` - 訂購網頁
- `style.css` - 網頁樣式
- `script.js` - 功能程式碼
- `README.md` - 說明文件

## 🚀 快速開始

### 1. 前端設定
1. 將所有檔案上傳到你的網站
2. 在 `script.js` 第 25 行更新你的 Make.com webhook URL

### 2. Make.com 後端設定

#### 推薦流程（前端預處理）
```
前端 JavaScript 預處理 → Webhook → Router → Google Sheets
                                        → Gmail
```

**為什麼使用前端預處理？**
- 🚀 **效能更好** - 減少 Make.com 的處理負擔
- 🔧 **功能更強** - JavaScript 有完整的字串處理能力
- 🛡️ **更穩定** - 不依賴 Make.com 的函數限制
- 📊 **資料完整** - 一次性準備好所有需要的格式
- 💰 **成本更低** - 減少 Make.com 的操作次數

## 📋 Make.com 設定步驟

### 步驟 1：建立 Webhook
1. 在 Make.com 建立新的 Scenario
2. 新增 "Custom Webhook" 模組
3. 複製 webhook URL 到 `script.js`

### 步驟 2：前端資料預處理（推薦）
**不需要在 Make.com 中設定 "Set Multiple Variables" 模組**

前端 JavaScript 會自動處理並發送以下預處理資料到 webhook：

**基本資料：**
- `orderId`, `orderTime`, `customerName`, `email`, `phone`
- `items` - 商品陣列
- `totalItems`, `totalAmount` - 統計資訊

**新增預處理資料：**
- `customerTier` - 客戶等級（VIP/Gold/Regular）
- `avgPrice` - 平均單價
- `itemTypes` - 商品種類數
- `itemsDetail` - 格式化商品明細："HPP鮮榨梨可樂達(M杯)x1杯=NT$70 | 皇室奶昔(M杯)x4杯=NT$320"
- `itemsSummary` - 簡化摘要："HPP鮮榨梨可樂達(M)x1, 皇室奶昔(M)x4"
- `categoryList` - 分類列表："旺情鳳梨, 獨門強沙冰, 經典綠茶"
- `icePreference` - 冰塊偏好："少冰, 少冰, 少冰"
- `sugarPreference` - 甜度偏好："七分糖, 七分糖, 七分糖"
- `orderSummary` - 訂單摘要："3種商品，共9杯，總計NT$530"
- `firstDrink` - 第一個商品名稱

**優勢：**
- 🚀 **效能更好** - Make.com 直接使用預處理資料
- 🔧 **功能更強** - JavaScript 有完整的字串處理能力
- 🛡️ **更穩定** - 不依賴 Make.com 的函數限制
- 📊 **資料完整** - 一次性準備好所有需要的格式



### 步驟 3：新增 Google Sheets
1. 新增 "Google Sheets" 模組
2. 選擇 "Add a row"
3. 連接你的 Google 帳戶
4. 建立試算表，設定以下欄位：

| Google Sheets 欄位 | Make.com 變數 | 範例資料 |
|-------------------|---------------|---------|
| 訂單編號 | `{{orderId}}` | CO35703794 |
| 訂購時間 | `{{orderTime}}` | 2025/08/15 下午03:05:35 |
| 客戶姓名 | `{{customerName}}` | test |
| 電子郵件 | `{{email}}` | skypassion5000@gmail.com |
| 電話號碼 | `{{phone}}` | 0901454914 |
| 客戶等級 | `{{customerTier}}` | VIP |
| 商品種類數 | `{{itemTypes}}` | 3 |
| 商品總杯數 | `{{totalItems}}` | 9 |
| 訂單總金額 | `{{totalAmount}}` | 530 |
| 平均單價 | `{{avgPrice}}` | 59 |
| 商品分類 | `{{categoryList}}` | 旺情鳳梨, 獨門強沙冰, 經典綠茶 |
| 商品明細 | `{{itemsDetail}}` | HPP鮮榨梨可樂達(M杯)x1杯=NT$70 \| 皇室奶昔(M杯)x4杯=NT$320 \| 四季春青茶(L杯)x4杯=NT$140 |
| 商品摘要 | `{{itemsSummary}}` | HPP鮮榨梨可樂達(M)x1, 皇室奶昔(M)x4, 四季春青茶(L)x4 |
| 冰塊偏好 | `{{icePreference}}` | 少冰, 少冰, 少冰 |
| 甜度偏好 | `{{sugarPreference}}` | 七分糖, 七分糖, 七分糖 |
| 第一商品 | `{{firstDrink}}` | HPP鮮榨梨可樂達 |
| 訂單摘要 | `{{orderSummary}}` | 3種商品，共9杯，總計NT$530 |

**優勢：**
- ✅ **直接使用** - 所有變數都是前端預處理好的，直接對應即可
- ✅ **格式完整** - 不需要在 Make.com 中做複雜的字串處理
- ✅ **穩定可靠** - 避免 Make.com 函數限制問題
| 訂單摘要 | `{{orderSummary}}` | 3種商品，共9杯，總計NT$530 |

### 多商品訂單處理說明

根據實際測試資料，一個訂單可能包含：
- **多種不同商品** (如：HPP鮮榨梨可樂達、皇室奶昔、四季春青茶)
- **不同數量** (如：1杯、4杯、4杯)
- **相同或不同的客製化選項** (如：都選少冰/七分糖)

**Set Multiple Variables 的優勢：**
- 🔢 **統計計算** - 自動計算商品種類數、平均單價
- 📊 **資料整合** - 將多個商品的資訊整合成易讀格式
- 🎯 **客戶分級** - 根據消費金額自動判定等級
- 📝 **格式統一** - 確保 Google Sheets 和郵件格式一致

### Make.com 變數和函數限制說明

**變數使用限制：**
- ❌ **同模組內變數引用** - 自定義變數不能在同一個 "Set Multiple Variables" 模組中互相引用
- ❌ 例如：`orderSummary = {{itemTypes + "種商品"}}` 會出錯
- ✅ **解決方案** - 直接使用原始變數：`orderSummary = {{length(items) + "種商品"}}`

**陣列存取語法：**
- ❌ `first(items).drink` - 可能不支援
- ❌ `items[0].drink` - 陣列索引從 0 開始可能不支援
- ✅ `items[1].drink` - Make.com 陣列索引從 1 開始
- ✅ `get(items; 1; "drink")` - 另一種安全的存取方式

**不支援的函數：**
- ❌ `unique()` - 無法去除重複值
- ❌ `distinct()` - 無法去除重複值
- ❌ `groupBy()` - 無法分組統計

**替代解決方案：**

1. **重複值處理** - 直接顯示所有值，讓使用者自行判斷
2. **統計需求** - 使用 `length(items)` 計算商品種類數
3. **條件篩選** - 使用 `filter()` 和 `if()` 組合

**不使用變數模組的替代方案：**
如果不想使用 "Set Multiple Variables"，可以直接在 Google Sheets 中使用：
```
商品明細: {{join(map(items; drink + "(" + size + ")x" + quantity + "-NT$" + itemTotal); " | ")}}
商品種類: {{length(items)}}
平均單價: {{round(totalAmount / totalItems)}}
冰塊選擇: {{join(map(items; ice); ", ")}}
甜度選擇: {{join(map(items; sugar); ", ")}}
```

**複雜變數處理的解決方案：**

**方案 1: 多個 Set Variables 模組**
```
Set Variables 1 → Set Variables 2 → Google Sheets
```
- 第一個模組：處理基本變數 (`itemTypes`, `avgPrice`)
- 第二個模組：使用第一個模組的變數 (`orderSummary = {{itemTypes + "種商品"}}`)

**方案 2: 直接在目標模組中處理**
在 Google Sheets 或 Gmail 中直接使用完整公式：
```
訂單摘要: {{length(items) + "種商品，共" + totalItems + "杯，總計NT$" + totalAmount}}
```

**方案 3: 前端預處理**
在前端 JavaScript 中就準備好所有需要的格式化字串。

**推薦做法：**
對於簡單的字串組合，建議直接在目標模組中使用完整公式，避免變數依賴問題。

### 步驟 4：新增 Gmail
1. 新增 "Gmail" 模組
2. 選擇 "Send an email"
3. 連接你的 Gmail 帳戶
4. 設定郵件內容：

**收件人：** `{{email}}`
**主旨：** `享哥哥手搖飲訂單確認 - {{orderId}}`
**內容：** 使用下面的簡單模板

## 📧 簡單郵件模板

```html
<div style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: #74b9ff; color: white; padding: 20px; text-align: center; border-radius: 10px;">
        <h1>🥤 享哥哥手搖飲</h1>
        <h2>訂單確認</h2>
    </div>
    
    <div style="padding: 20px; background: #f8f9fa; margin-top: 10px; border-radius: 10px;">
        <p>親愛的 <strong>{{customerName}}</strong> 您好，</p>
        <p>感謝您的訂購！</p>
        
        <h3>📋 訂單資訊</h3>
        <p>訂單編號：{{orderId}}</p>
        <p>訂購時間：{{orderTime}}</p>
        <p>聯絡電話：{{phone}}</p>
        
        <h3>🧊 訂購商品</h3>
        <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong>商品明細：</strong></p>
            <p>{{itemsDetail}}</p>
        </div>
        
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong>商品分類：</strong>{{categoryList}}</p>
            <p><strong>偏好設定：</strong>{{icePreference}} / {{sugarPreference}}</p>
        </div>
        
        <div style="background: #00b894; color: white; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <h3>{{orderSummary}}</h3>
            <p style="margin: 5px 0;">平均每杯 NT$ {{avgPrice}} | {{customerTier}} 會員</p>
        </div>
        
        <p>⏰ 預計準備時間：15-20 分鐘</p>
        <p>如有問題請聯繫：02-1234-5678</p>
        <p>謝謝您選擇享哥哥手搖飲！</p>
    </div>
</div>
```

## 🤖 進階：AI 個性化郵件（可選）

如果想要更個性化的郵件，可以加入 AI 生成：

### 1. 取得 Gemini API Key
- 前往 [Google AI Studio](https://makersuite.google.com/app/apikey)
- 建立 API Key

### 2. 在 Make.com 加入 HTTP 模組
在 Google Sheets 和 Gmail 之間加入：

**URL：** `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=你的API金鑰`

**Method：** POST

**Body：**
```json
{
  "contents": [{
    "parts": [{
      "text": "你是享哥哥手搖飲店的專業 AI 客服助理。請為以下訂單生成個性化的 HTML 確認郵件：\n\n=== 客戶資訊 ===\n姓名：{{customerName}} ({{customerTier}} 會員)\n訂單編號：{{orderId}}\n訂購時間：{{orderTime}}\n聯絡電話：{{phone}}\n電子郵件：{{email}}\n\n=== 訂單統計 ===\n{{orderSummary}}\n平均單價：NT$ {{avgPrice}}\n客戶等級：{{customerTier}}\n\n=== 商品明細 ===\n{{itemsDetail}}\n\n=== 商品分類 ===\n{{categoryList}}\n\n=== 客戶偏好 ===\n冰塊偏好：{{icePreference}}\n甜度偏好：{{sugarPreference}}\n\n=== 生成要求 ===\n1. 🎨 使用享哥哥手搖飲品牌設計 (藍色#74b9ff, 橙色#fdcb6e)\n2. � 響應式 HTML，包M含完整 CSS\n3. 😊 根據客戶等級 ({{customerTier}}) 調整問候語\n4. 🎯 根據商品分類推薦相關商品\n5. 💎 為 {{customerTier}} 會員提供專屬優惠資訊\n6. ⏰ 預計準備時間：15-20分鐘\n7. 📍 包含店家資訊和聯絡方式\n8. � 溫暖專業的台灣用語風用格，體現享哥哥的親切服務\n9. 🍯 根據偏好 ({{icePreference}}/{{sugarPreference}}) 給予個性化建議\n\n=== 特殊指示 ===\n- 如果是VIP會員，強調專屬服務和優惠\n- 如果訂購多種分類，讚美客戶的多元品味\n- 根據冰塊和甜度偏好推薦應景商品\n- 使用訂單摘要 \"{{orderSummary}}\" 作為重點展示\n- 體現享哥哥手搖飲的品牌特色：親切、用心、品質\n\n，請直接回傳完整的 HTML 郵件內容，包含適當的 CSS 樣式，不要有其他文字或說明，前後也不要加任何東西，不要加上任何解釋或格式化符號（例如 ```），也不要換行。"
    }]
  }],
  "generationConfig": {
    "temperature": 0.8,
    "topK": 40,
    "topP": 0.95,
    "maxOutputTokens": 3000
  }
}
```

### 3. 優化的提示詞設定

**重要：** 為避免 AI 回應包含不必要的說明文字（如「好的，這就為您生成...」），請使用以下優化的提示詞：

```json
{
  "contents": [{
    "parts": [{
      "text": "IMPORTANT: Output ONLY HTML code. Do NOT include any explanations, comments, or markdown formatting. Start directly with <!DOCTYPE html>.\n\nGenerate HTML email for 享哥哥手搖飲:\n\nCustomer: {{customerName}} ({{customerTier}})\nOrder: {{orderId}}\nTime: {{orderTime}}\nPhone: {{phone}}\nSummary: {{orderSummary}}\nAvg Price: NT${{avgPrice}}\nItems: {{itemsDetail}}\nCategories: {{categoryList}}\nIce: {{icePreference}}\nSugar: {{sugarPreference}}\n\nRequirements:\n- Complete HTML with inline CSS\n- Colors: #74b9ff, #fdcb6e\n- Responsive design\n- Traditional Chinese\n- Personalized for {{customerTier}} member\n- Include prep time 15-20 min\n- Store contact info\n- Product recommendations based on preferences\n\nOutput format: Start immediately with <!DOCTYPE html> and end with </html>. No other text."
    }]
  }],
  "generationConfig": {
    "temperature": 0.7,
    "topK": 40,
    "topP": 0.95,
    "maxOutputTokens": 4000
  }
}
```

### 4. 處理 AI 回應
1. 新增 "JSON" 模組解析 Gemini 回應
2. 提取路徑：`candidates[].content.parts[].text`
3. 在 Gmail 模組中使用 AI 生成的內容

**優化重點：**
- ✅ 明確指令：只輸出 HTML 代碼
- ✅ 禁止說明：不包含任何前言或註解
- ✅ 直接開始：立即以 `<!DOCTYPE html>` 開頭
- ✅ 降低溫度：減少創意性回應，提高一致性

### 5. AI 生成郵件範例

以下是 Gemini 可能為多商品訂單生成的個性化郵件：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: 'Arial', sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #74b9ff, #0984e3); }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        .header { background: linear-gradient(135deg, #fdcb6e, #e17055); color: white; padding: 30px; text-align: center; }
        .vip-badge { background: #d63031; color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.9em; margin: 10px 0; }
        .content { padding: 30px; }
        .order-summary { background: #00b894; color: white; padding: 20px; text-align: center; border-radius: 10px; margin: 20px 0; }
        .items-detail { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .recommendation { background: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ffc107; }
        .footer { background: #2d3436; color: white; padding: 20px; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🥤 享哥哥手搖飲</h1>
            <div class="vip-badge">VIP 會員專屬服務</div>
            <h2>訂單確認通知</h2>
            <p>親愛的 {{customerName}}，感謝您的訂購！</p>
        </div>
        
        <div class="content">
            <p>🎉 您的訂單已成功送出！作為我們的 VIP 會員，您享有優先製作服務。我們注意到您偏好去冰和微糖的健康選擇，真是明智的決定！</p>
            
            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3>📋 訂單資訊</h3>
                <p><strong>訂單編號：</strong>{{orderId}}</p>
                <p><strong>訂購時間：</strong>{{orderTime}}</p>
                <p><strong>聯絡電話：</strong>{{phone}}</p>
            </div>
            
            <div class="items-detail">
                <h3>🧊 您的訂購明細</h3>
                <p>{{itemsDetail}}</p>
                <p><strong>商品分類：</strong>{{categoryList}}</p>
                <p><strong>您的偏好：</strong>{{icePreference}} / {{sugarPreference}}</p>
            </div>
            
            <div class="order-summary">
                <h3>{{orderSummary}}</h3>
                <p>平均每杯 NT$ {{avgPrice}}</p>
            </div>
            
            <div class="recommendation">
                <h4>💡 VIP 專屬推薦</h4>
                <p>根據您今天的選擇，我們推薦您下次試試「檸檬蜂蜜茶」，同樣清爽健康！</p>
                <p>🎁 VIP 專屬優惠：下次消費滿 300 元享 9 折優惠！</p>
            </div>
            
            <p>⏰ VIP 優先製作，預計準備時間：12-15 分鐘</p>
            <p>🌟 感謝您選擇享哥哥手搖飲！我們的調茶師正在用心為您準備每一杯飲料。</p>
        </div>
        
        <div class="footer">
            <p>📍 CoCo 都可茶飲 | 📞 02-1234-5678</p>
            <p>營業時間：10:00 - 22:00</p>
            <p style="font-size: 0.9em; opacity: 0.8;">此為系統自動發送郵件，請勿直接回覆</p>
        </div>
    </div>
</body>
</html>
```

### AI 個性化特色

- 🎯 **會員等級識別** - 根據 VIP/Gold/Regular 調整服務語調
- 🍯 **偏好分析** - 根據冰塊甜度偏好給予個性化建議
- 🛍️ **智能推薦** - 基於商品分類推薦相關商品
- 💎 **專屬優惠** - 為不同等級會員提供對應優惠
- ⏰ **差異化服務** - VIP 會員享有優先製作時間

## 🧪 測試步驟

1. 開啟網頁，填寫客戶資料
2. 選擇飲料類別和品項（尺寸、冰塊、甜度已有預設值）
3. 調整數量或客製化選項（可選）
4. 加入購物車，可重複選購
5. 點擊結帳
6. 檢查 Google Sheets 是否有新資料
7. 檢查是否收到確認郵件

**預設值說明：**
- 🥤 **尺寸**：中杯 (M)
- ❄️ **冰塊**：去冰
- 🍯 **甜度**：微糖
- 📊 **數量**：1杯

## ❓ 常見問題

**Q: 購物車按鈕無法點擊？**
A: 請確保所有必填欄位都已填寫（飲料、尺寸、冰塊、甜度）

**Q: 沒收到郵件？**
A: 檢查垃圾郵件匣，確認 Gmail 模組權限設定正確

**Q: Google Sheets 沒有資料？**
A: 確認 webhook URL 正確，檢查 Make.com scenario 是否啟用

**Q: 變數顯示錯誤？**
A: 確認使用 "Set Multiple Variables" 模組，變數名稱要與 webhook 一致

## 💰 成本估算

- **Make.com**: 免費版每月 1000 次操作
- **Google Sheets**: 免費
- **Gmail**: 免費（每日限制 500 封）
- **Gemini API**: 每次約 $0.001-0.002 USD（可選）

## 📞 技術支援

如有問題，請檢查：
1. Make.com scenario 是否正常運作
2. 所有 API 權限是否正確設定
3. Webhook URL 是否正確更新
4. 變數名稱是否與 webhook 一致

---

**簡單來說：客戶在網頁訂飲料 → Make.com 接收資料 → 存到 Google Sheets → 發確認郵件**