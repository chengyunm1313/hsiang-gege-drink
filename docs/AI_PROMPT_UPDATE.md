## 🤖 優化後的 AI 提示詞

**重要修正：** 為了避免 AI 回應包含不必要的說明文字，使用以下優化的提示詞：

**Body：**
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

### 關鍵優化點：

1. **明確指令** - "IMPORTANT: Output ONLY HTML code"
2. **禁止說明** - "Do NOT include any explanations, comments, or markdown formatting"
3. **直接開始** - "Start directly with <!DOCTYPE html>"
4. **格式要求** - "Start immediately with <!DOCTYPE html> and end with </html>. No other text"
5. **降低溫度** - temperature 從 0.8 降到 0.7，減少創意性回應
6. **增加輸出長度** - maxOutputTokens 增加到 4000

這樣設定後，AI 應該會直接輸出純 HTML 代碼，不會包含任何前言或說明文字。