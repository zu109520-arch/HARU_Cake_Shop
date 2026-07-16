# HARU 蛋糕店 (React 電商作品集)

一個以 React.js 建構的電商前端原型專案，模擬真實蛋糕店的完整購物流程。

**Live Demo：** [haru-cake-shop.vercel.app](https://haru-cake-shop.vercel.app)

[![HARU Cake Shop](https://github.com/user-attachments/assets/2a58c1ca-9688-437e-a783-762b58c05250)](https://haru-cake-shop.vercel.app)

---

## 專案特色

- 模擬商品 API 載入流程，實作 loading skeleton、error、empty state 三種狀態處理
- 以 Custom Hook（`useCart`）封裝購物車邏輯，降低元件耦合、提升可維護性
- 用 React state 管理 UI 通知（Toast），取代瀏覽器原生 `alert` / `confirm`
- 整合 localStorage 實現資料持久化，重新整理頁面後購物狀態不遺失
- 動態庫存機制：庫存 ≤ 3 自動顯示「即將售完」警示，歸零時禁止加購
- 商品搜尋即時過濾，含防呆處理避免 undefined crash
- 表單驗證使用正規表達式（Regex）檢查姓名、電話、地址格式
- 使用 Vitest 為核心邏輯撰寫 23 個單元測試，涵蓋表單驗證、金額計算、庫存狀態判斷等函式

---

## 技術亮點

**Custom Hook 封裝購物車邏輯**
- 將 `cartItems`、`stock` 狀態與 `addToCart`、`updateQuantity`、`clearCart` 等方法抽出至 `useCart`
- App.jsx 只負責 UI，邏輯與畫面分離，提升可測試性與可維護性

**非同步資料三態處理**
- Loading：使用 Skeleton Loading 動畫撐版面，避免畫面跳動
- Error：失敗時顯示錯誤訊息與「重新載入」按鈕
- Empty：搜尋無結果時顯示提示，引導使用者調整關鍵字

**Toast 通知系統**
- 用 React state 控制顯示，自動 2.5 秒消失，取代會中斷使用者操作的原生 `alert`
- 在加入購物車、庫存不足、表單驗證失敗等情境統一回饋使用者

**表單驗證**
- 姓名：`/^[a-zA-Z\u4e00-\u9fa5]{2,}$/` 至少兩個字、不含數字
- 電話：`/^09\d{8}$/` 台灣手機格式驗證
- 地址：基礎格式檢查（需包含「市」或「縣」關鍵字）

**單元測試（Vitest）**
- 將表單驗證、購物車金額計算、庫存判斷等核心邏輯抽離為獨立純函式，提升可測試性
- 撰寫 23 個單元測試，涵蓋正常情境與邊界情況（空值、格式錯誤、缺少欄位等）
- 測試涵蓋 8 個函式：email／姓名／電話／地址驗證、金額計算、庫存狀態判斷

---

## 開發挑戰

- 購物車數量與商品庫存需保持同步，避免超賣與狀態不一致
- 將購物邏輯抽離至 useCart 時，需設計清楚資料流，避免元件間耦合
- 模擬商品 API 載入流程時，完整處理 loading、error、empty 三種非同步狀態，提高使用體驗穩定性

---

## 技術架構

| 類別 | 技術 |
|------|------|
| 框架 | React |
| 路由 | React Router v6 |
| 狀態管理 | React Hooks / Custom Hook |
| 樣式系統 | CSS3 / Skeleton Loading | 
| UI 回饋 | Custom Toast Notification |
| 建置工具 | Vite |
| 部署 | Vercel |
| 資料儲存 | localStorage |
| 測試 | Vitest（單元測試） |

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

\`\`\`
src/
├── hooks/
│   └── useCart.js        # 購物車 Custom Hook
├── data/
│   └── CakeData.js       # 商品資料（模擬 API 來源）
├── utils/
│   ├── utils.js           # 核心邏輯純函式（驗證、計算）
│   └── utils.test.js      # 單元測試（Vitest）
├── App.jsx               # 主元件、路由、Toast 通知
├── HomePage.jsx          # 首頁（Banner、商品列表）
├── CakeCard.jsx          # 商品卡片元件
├── CartPage.jsx          # 購物車頁面
├── LoginPage.jsx         # 登入頁面
└── App.css               # 全域樣式
\`\`\`

---

## 本機執行

\`\`\`bash
git clone https://github.com/zu109520-arch/HARU_Cake_Shop.git
cd HARU_Cake_Shop
npm install
npm run dev
\`\`\`

## 執行測試

\`\`\`bash
npx vitest
\`\`\`

---

## 未來規劃

- 導入 React Testing Library，補齊元件層級的測試
- 優化庫存與購物車的即時同步機制