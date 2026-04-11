// lib.js

// 計算總價：基礎價 + 所有配料價
export const calculatePrice = (basePrice, ...toppings) => {
    // toppings 會是一個陣列，例如 [10, 20]
    const toppingsTotal = toppings.reduce((sum, price) => sum + Number(price), 0);
    return basePrice + toppingsTotal;
};

// 抓取畫面上勾選的配料價格
export const getToppings = (safeName) => {
    const checkboxes = document.querySelectorAll(`.opt-${safeName}:checked`);
    // 將所有勾選的 value (價格) 轉成數字陣列回傳
    return Array.from(checkboxes).map(cb => Number(cb.value));
};