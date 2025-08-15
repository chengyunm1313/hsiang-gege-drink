// 飲料菜單資料 - 根據 CoCo 菜單更新
const drinkMenu = {
    "旺情鳳梨": {
        "HPP鮮榨梨可樂達": { M: 70, L: 80 },
        "HPP鮮榨梨奶茶": { M: 65, L: 75 }
    },
    "經典綠茶": {
        "茉莉綠茶": { M: 30, L: 35 },
        "四季春青茶": { M: 30, L: 35 },
        "手採紅茶2.0": { M: 30, L: 35 },
        "四季冷泡茶": { M: 40, L: 45 },
        "蜜香茶": { M: 40, L: 45 },
        "仙草蜜": { M: 35, L: 40 }
    },
    "激推水果茶": {
        "百香雙響炮": { M: 65, L: 75 },
        "胖胖/海鹽檸檬甘茶": { M: 70, L: 90 },
        "百香青茶": { M: 40, L: 45 },
        "芒果青茶": { M: 40, L: 45 },
        "檸檬蜂蜜/蜜茶": { M: 40, L: 45 },
        "檸檬冬瓜蜜": { M: 40, L: 45 },
        "蜜香檸檬": { M: 50, L: 55 },
        "金桔檸檬": { M: 55, L: 60 },
        "檸檬奇亞籽": { M: 50, L: 60 },
        "檸檬蜜": { M: 60, L: 70 },
        "蜜茶冬瓜蜜": { M: 40, L: 45 },
        "給茶香蜜多": { M: 60, L: 70 }
    },
    "秋冬暖胃茶": {
        "奶茶三兄弟": { M: 65, L: 75 },
        "阿薩姆奶茶": { M: 40, L: 50 },
        "珍珠奶茶": { M: 45, L: 55 },
        "百香奶茶": { M: 45, L: 55 },
        "布丁奶茶": { M: 45, L: 55 },
        "雲朵奶蓋/蜜茶": { M: 45, L: 55 }
    },
    "獨門強沙冰": {
        "皇室奶昔": { M: 80, L: 90 },
        "仙草凍": { M: 50, L: 60 },
        "巧克力冰": { M: 60, L: 75 },
        "綠豆沙": { M: 50, L: 60 },
        "綠豆沙牛奶": { M: 60, L: 75 }
    },
    "茶奶雙響炮": {
        "芋頭百合牛奶": { M: 75, L: 85 },
        "英式鮮奶茶": { M: 55, L: 70 },
        "珍珠鮮奶茶": { M: 60, L: 70 },
        "芋頭牛奶": { M: 70, L: 80 }
    },
    "品味咖啡紅茶": {
        "21香草拿鐵": { M: 45, L: 55 },
        "21香草瑪奇朵": { M: 50, L: 60 }
    }
};

// Make.com Webhook URL - 請替換為您的實際 webhook URL
const WEBHOOK_URL = 'https://hook.us2.make.com/aiz0pn8rk5k48j3qf93fq74oh3qv3lcl';

// 購物車資料
let cart = [];
let customerInfo = {};

// DOM 元素
const categorySelect = document.getElementById('drinkCategory');
const drinkSelect = document.getElementById('drinkName');
const sizeSelect = document.getElementById('size');
const quantityInput = document.getElementById('quantity');
const unitPriceSpan = document.getElementById('unitPrice');
const itemTotalSpan = document.getElementById('itemTotal');
const loadingDiv = document.getElementById('loading');
const successDiv = document.getElementById('success');

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateCartDisplay();
    renderCartItems();
    
    // 設定預設值
    document.getElementById('size').value = 'M';
    document.getElementById('ice').value = '去冰';
    document.getElementById('sugar').value = '微糖';
    
    updatePrice();
    checkAddToCartButton();
});

function setupEventListeners() {
    // 商品選擇區
    categorySelect.addEventListener('change', updateDrinkOptions);
    drinkSelect.addEventListener('change', updatePrice);
    sizeSelect.addEventListener('change', updatePrice);
    quantityInput.addEventListener('input', updatePrice);
    document.getElementById('ice').addEventListener('change', updatePrice);
    document.getElementById('sugar').addEventListener('change', updatePrice);
    document.getElementById('addToCart').addEventListener('click', addToCart);
    document.getElementById('clearItem').addEventListener('click', clearCurrentItem);
    
    // 購物車區
    document.getElementById('clearCart').addEventListener('click', clearCart);
    document.getElementById('checkout').addEventListener('click', handleCheckout);
}

function updateDrinkOptions() {
    const category = categorySelect.value;
    drinkSelect.innerHTML = '<option value="">請選擇飲料</option>';
    
    if (category && drinkMenu[category]) {
        Object.keys(drinkMenu[category]).forEach(drink => {
            const option = document.createElement('option');
            option.value = drink;
            option.textContent = drink;
            drinkSelect.appendChild(option);
        });
    }
    
    updatePrice();
}

function updatePrice() {
    const category = categorySelect.value;
    const drink = drinkSelect.value;
    const size = sizeSelect.value;
    const quantity = parseInt(quantityInput.value) || 1;
    
    let unitPrice = 0;
    
    if (category && drink && size && drinkMenu[category] && drinkMenu[category][drink]) {
        unitPrice = drinkMenu[category][drink][size] || 0;
    }
    
    const itemTotal = unitPrice * quantity;
    
    unitPriceSpan.textContent = unitPrice;
    itemTotalSpan.textContent = itemTotal;
    
    // 檢查是否可以加入購物車 - 修復邏輯
    checkAddToCartButton();
}

function checkAddToCartButton() {
    const addToCartBtn = document.getElementById('addToCart');
    const category = categorySelect.value;
    const drink = drinkSelect.value;
    const size = sizeSelect.value;
    const ice = document.getElementById('ice').value;
    const sugar = document.getElementById('sugar').value;
    
    // 所有必填欄位都有值才能加入購物車
    const canAdd = category && drink && size && ice && sugar;
    
    addToCartBtn.disabled = !canAdd;
    
    if (canAdd) {
        addToCartBtn.style.opacity = '1';
        addToCartBtn.style.cursor = 'pointer';
    } else {
        addToCartBtn.style.opacity = '0.6';
        addToCartBtn.style.cursor = 'not-allowed';
    }
}

function validateCustomerInfo() {
    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    if (!name || !email || !phone) {
        return false;
    }
    
    // 儲存客戶資料
    customerInfo = { name, email, phone };
    return true;
}

function addToCart() {
    const category = categorySelect.value;
    const drink = drinkSelect.value;
    const size = sizeSelect.value;
    const ice = document.getElementById('ice').value;
    const sugar = document.getElementById('sugar').value;
    const quantity = parseInt(quantityInput.value) || 1;
    const notes = document.getElementById('notes').value.trim();
    
    if (!category || !drink || !size || !ice || !sugar) {
        alert('請填寫完整的飲料資訊');
        return;
    }
    
    const unitPrice = drinkMenu[category][drink][size];
    const itemTotal = unitPrice * quantity;
    
    const cartItem = {
        id: Date.now() + Math.random(),
        category,
        drink,
        size,
        ice,
        sugar,
        quantity,
        notes,
        unitPrice,
        itemTotal
    };
    
    cart.push(cartItem);
    updateCartDisplay();
    renderCartItems();
    clearCurrentItem();
    
    // 顯示成功訊息
    showNotification('✅ 已加入購物車！');
}

function clearCurrentItem() {
    categorySelect.value = '';
    drinkSelect.innerHTML = '<option value="">請先選擇類別</option>';
    
    // 設定預設值
    sizeSelect.value = 'M';  // 預設中杯
    document.getElementById('ice').value = '去冰';  // 預設去冰
    document.getElementById('sugar').value = '微糖';  // 預設微糖
    quantityInput.value = 1;
    document.getElementById('notes').value = '';
    
    updatePrice();
    checkAddToCartButton();
}

// 移除這些函數，因為現在是一頁式設計

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartTotalHeader = document.getElementById('cartTotalHeader');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cart.reduce((sum, item) => sum + item.itemTotal, 0);
    
    cartCount.textContent = totalItems;
    cartTotalHeader.textContent = totalAmount;
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart"><p>購物車是空的，快去選購飲料吧！</p></div>';
        cartSummary.classList.add('hidden');
        return;
    }
    
    let html = '';
    let subtotal = 0;
    
    cart.forEach((item, index) => {
        subtotal += item.itemTotal;
        html += `
            <div class="cart-item">
                <div class="item-header">
                    <div class="item-name">${item.drink}</div>
                    <div class="item-price">NT$ ${item.itemTotal}</div>
                </div>
                <div class="item-details">
                    <span>🏷️ ${item.category}</span>
                    <span>📏 ${item.size}</span>
                    <span>${item.ice}</span>
                    <span>${item.sugar}</span>
                </div>
                ${item.notes ? `<div class="item-notes">備註: ${item.notes}</div>` : ''}
                <div class="item-actions">
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity(${index}, -1)" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                        <span>數量: ${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${index}, 1)" ${item.quantity >= 10 ? 'disabled' : ''}>+</button>
                    </div>
                    <button class="remove-item" onclick="removeItem(${index})">🗑️ 移除</button>
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = html;
    
    // 更新總計
    document.getElementById('cartSubtotal').textContent = subtotal;
    document.getElementById('cartTotal').textContent = subtotal;
    cartSummary.classList.remove('hidden');
}

function updateQuantity(index, change) {
    const item = cart[index];
    const newQuantity = item.quantity + change;
    
    if (newQuantity >= 1 && newQuantity <= 10) {
        item.quantity = newQuantity;
        item.itemTotal = item.unitPrice * newQuantity;
        updateCartDisplay();
        renderCartItems();
    }
}

function removeItem(index) {
    if (confirm('確定要移除這個商品嗎？')) {
        cart.splice(index, 1);
        updateCartDisplay();
        renderCartItems();
        showNotification('🗑️ 商品已移除');
    }
}

function clearCart() {
    if (confirm('確定要清空購物車嗎？')) {
        cart = [];
        updateCartDisplay();
        renderCartItems();
        showNotification('🗑️ 購物車已清空');
    }
}

function showNotification(message) {
    // 簡單的通知功能
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #00b894;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

async function handleCheckout() {
    if (cart.length === 0) {
        alert('購物車是空的，請先選購商品');
        return;
    }
    
    // 驗證客戶資料
    if (!validateCustomerInfo()) {
        alert('請填寫完整的基本資料（姓名、電話、郵件）');
        document.getElementById('customerName').focus();
        return;
    }
    
    // 顯示載入狀態
    document.querySelector('.main-content').style.display = 'none';
    loadingDiv.classList.remove('hidden');
    
    // 計算總金額
    const totalAmount = cart.reduce((sum, item) => sum + item.itemTotal, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // 資料預處理
    const avgPrice = Math.round(totalAmount / totalItems);
    const itemTypes = cart.length;
    
    // 客戶分級
    let customerTier = "Regular";
    if (totalAmount >= 500) customerTier = "VIP";
    else if (totalAmount >= 200) customerTier = "Gold";
    
    // 格式化商品明細
    const itemsDetail = cart.map(item => 
        `${item.drink}(${item.size}杯)x${item.quantity}杯=NT$${item.itemTotal}`
    ).join(' | ');
    
    // 簡化商品摘要
    const itemsSummary = cart.map(item => 
        `${item.drink}(${item.size})x${item.quantity}`
    ).join(', ');
    
    // 分類列表
    const categoryList = [...new Set(cart.map(item => item.category))].join(', ');
    
    // 偏好統計
    const icePreference = cart.map(item => item.ice).join(', ');
    const sugarPreference = cart.map(item => item.sugar).join(', ');
    
    // 訂單摘要
    const orderSummary = `${itemTypes}種商品，共${totalItems}杯，總計NT$${totalAmount}`;
    
    // 第一個商品資訊
    const firstDrink = cart[0].drink;
    const firstCategory = cart[0].category;
    
    // 準備訂單資料
    const orderData = {
        // 基本資訊
        orderId: generateOrderId(),
        orderTime: new Date().toLocaleString('zh-TW', {
            timeZone: 'Asia/Taipei',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }),
        customerName: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        
        // 商品資訊
        items: cart,
        totalItems: totalItems,
        totalAmount: totalAmount,
        
        // 預處理資料
        customerTier: customerTier,
        avgPrice: avgPrice,
        itemTypes: itemTypes,
        itemsDetail: itemsDetail,
        itemsSummary: itemsSummary,
        categoryList: categoryList,
        icePreference: icePreference,
        sugarPreference: sugarPreference,
        orderSummary: orderSummary,
        firstDrink: firstDrink,
        firstCategory: firstCategory,
        
        // 為了相容性，也包含第一個商品的資訊
        drinkCategory: cart[0].category,
        drinkName: cart[0].drink,
        size: cart[0].size,
        ice: cart[0].ice,
        sugar: cart[0].sugar,
        quantity: totalItems,
        notes: cart.map(item => item.notes).filter(note => note).join('; '),
        unitPrice: avgPrice,
        totalPrice: totalAmount
    };
    
    try {
        // 發送到 Make.com webhook
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        
        if (response.ok) {
            // 成功
            loadingDiv.classList.add('hidden');
            successDiv.classList.remove('hidden');
            
            // 清空購物車
            cart = [];
            updateCartDisplay();
        } else {
            throw new Error('訂單提交失敗');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('訂單提交失敗，請稍後再試或聯繫客服。');
        loadingDiv.classList.add('hidden');
        document.querySelector('.main-content').style.display = 'block';
    }
}

function generateOrderId() {
    const now = new Date();
    const timestamp = now.getTime().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `CO${timestamp}${random}`;
}

function resetForm() {
    // 重置所有資料
    cart = [];
    customerInfo = {};
    
    // 重置表單
    document.getElementById('customerName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    
    // 重置商品選擇並設定預設值
    clearCurrentItem();
    
    // 重置顯示
    updateCartDisplay();
    renderCartItems();
    successDiv.classList.add('hidden');
    document.querySelector('.main-content').style.display = 'block';
}

// 表單驗證
function validateForm() {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}