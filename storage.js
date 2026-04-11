// storage.js
const STORAGE_KEY = "haru_cake_cart_total";

// 1. 儲存金額到瀏覽器
export const saveCartTotal = (amount) => {
    localStorage.setItem(STORAGE_KEY, amount);
};

// 2. 從瀏覽器讀取金額
export const getCartTotal = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? Number(saved) : 0; // 如果沒資料就回傳 0
};

// 3. 清空紀錄
export const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
};