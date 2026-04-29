# HARU 蛋糕店 

一個以 React.js 建構的電商前端原型專案，模擬真實蛋糕店的完整購物流程。

**Live Demo：** [haru-cake-shop.vercel.app](https://haru-cake-shop.vercel.app)

[![HARU Cake Shop](https://github.com/user-attachments/assets/2a58c1ca-9688-437e-a783-762b58c05250)](https://haru-cake-shop.vercel.app)
---

## 專案特色

- 模擬非同步 API 資料請求，實作 loading skeleton、error、empty state 三種狀態處理
- 以 Custom Hook（`useCart`）封裝購物車邏輯，降低元件耦合、提升可維護性
- 用 React state 管理 UI 通知（Toast），取代瀏覽器原生 `alert` / `confirm`
- 整合 localStorage 實現資料持久化，重新整理頁面後購物狀態不遺失
- 動態庫存機制：庫存 ≤ 3 自動顯示「即將售完」警示，歸零時禁止加購
- 商品搜尋即時過濾，含防呆處理避免 undefined crash
- 表單驗證使用正規表達式（Regex）檢查姓名、電話、地址格式

---

## 技術架構

| 類別 | 技術 |
|------|------|
| 框架 | React.js 18 |
| 路由 | React Router v6 |
| 狀態管理 | React Hooks（useState、useEffect、Custom Hook） |
| 建置工具 | Vite |
| 部署 | Vercel |
| 資料儲存 | localStorage |

---

## 主要功能

**商品頁**
- 自動輪播 Banner（3 秒切換）
- 商品列表載入骨架屏動畫
- 即時搜尋過濾 + 無結果 empty state
- 客製化加購選項，動態計算商品總價
- 動態庫存狀態標籤（販售中 / 即將售完 / 已售完）

**購物車**
- 商品數量增減、刪除、清空
- 庫存上限控制，超量時顯示 Toast 提示
- 結帳表單驗證（姓名、電話、地址）

**其他**
- 會員登入頁（含 Email 格式驗證）
- RWD 響應式設計，支援手機版
- 頁面切換 SPA 無重整體驗

---

## 專案結構

```
src/
├── hooks/
│   └── useCart.js        # 購物車 Custom Hook
├── data/
│   └── CakeData.js       # 商品資料（模擬 API 來源）
├── App.jsx               # 主元件、路由、Toast 通知
├── HomePage.jsx          # 首頁（Banner、商品列表）
├── CakeCard.jsx          # 商品卡片元件
├── CartPage.jsx          # 購物車頁面
├── LoginPage.jsx         # 登入頁面
└── App.css               # 全域樣式
```

---

## 本機執行

```bash
git clone https://github.com/zu109520-arch/HARU_Cake_Shop.git
cd HARU_Cake_Shop
npm install
npm run dev
```

