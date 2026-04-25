import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'

import HomePage from './HomePage'
import LoginPage from './LoginPage'
import CartPage from './CartPage'
import useCart from './hooks/useCart'
import cakeData from './data/CakeData'

const bannerImages = ["/image/strawberry-cake.jpg", "/image/chocolate-cake.jpg", "/image/strawberry-lemon-cake.jpg"];

// ===== 模擬 API fetch =====
const fetchCakes = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 測試 error 畫面時，將下方註解打開
      // return reject(new Error('伺服器連線失敗'));
      resolve(cakeData);
    }, 1000);
  });
};

// ===== Toast 通知元件：取代 alert / confirm =====
function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(onClose, 2500)
    return () => clearTimeout(timer)
  }, [message, onClose])

  if (!message) return null

  return (
    <div onClick={onClose} style={{
      position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)',
      background: 'rgba(30,30,30,0.92)', color: '#fff',
      padding: '12px 28px', borderRadius: '30px', fontSize: '15px',
      zIndex: 9999, cursor: 'pointer', backdropFilter: 'blur(8px)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      animation: 'fadeInDown 0.3s ease'
    }}>
      {message}
    </div>
  )
}

function Navbar({ user, cartTotal, searchTerm, setSearchTerm, handleClearCart }) {
  const navigate = useNavigate();

  return (
    <div className="welcome">
      {/* ✅ .left → .nav-left */}
      <div className="nav-left" onClick={() => { navigate('/'); setSearchTerm(''); }} style={{ cursor: 'pointer' }}>
        HARU蛋糕店
      </div>

      {/* ✅ .right → .nav-right */}
      <div className="nav-right">
        {/* ✅ 搜尋 bar：移除 inline style，改用 CSS class */}
        <div className="search-bar">
          <img src="/image/search.svg" className="nav-icon" alt="搜尋" />
          <input
            type="text"
            placeholder="搜尋蛋糕..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              navigate('/');
            }}
          />
        </div>

        <span className="nav-item-group" onClick={() => navigate('/login')}>
          <img src="/image/login.svg" className="nav-icon" alt="登入" />
          <span className="nav-text">{user ? `妳好，${user}` : "會員登入"}</span>
        </span>

        <span className="cart-info nav-item-group" onClick={() => navigate('/cart')}>
          <img src="/image/cart.svg" className="nav-icon" alt="購物車" />
          <span className="nav-text">購物車</span>($<span>{cartTotal}</span>)
        </span>

        <button onClick={handleClearCart} className="btn-clear">清空</button>
      </div>
    </div>
  );
}

function AppContent() {
  const navigate = useNavigate();

  // ===== 購物車邏輯由 useCart hook 統一管理，降低耦合 =====
  const { cartItems, stock, addToCart, updateQuantity, clearCart } = useCart()

  const [user, setUser] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);

  // ===== API 相關狀態 =====
  const [cakes, setCakes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ===== 用 async/await 重構非同步流程，統一 loading / error 控制 =====
  useEffect(() => {
    const loadCakes = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchCakes()
        setCakes(data)
      } catch (err) {
        setError(err.message || "載入失敗")
      } finally {
        setIsLoading(false)
      }
    }
    loadCakes()
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // 防呆：避免 cake.name 為 undefined 時 crash
  const filteredCakes = cakes.filter(cake =>
    cake.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ===== 加入購物車：用 state 管理 UI feedback，不使用 alert =====
  const handleAddToCart = (cakeObject, finalPrice, selectedOptions = []) => {
    const success = addToCart(cakeObject, finalPrice, selectedOptions)
    if (!success) setToast("抱歉，今日 10 組名額已滿！")
  };

  // ===== 更新數量：用 state 管理 UI feedback，不使用 alert =====
  const handleUpdateQuantity = (index, delta) => {
    const result = updateQuantity(index, delta)
    if (result === "sold_out") setToast("抱歉，今日名額已達上限 10 組！")
  }

  // ===== 清空購物車：用 state 管理 feedback，不使用 confirm =====
  const handleClearCart = () => {
    const success = clearCart()
    if (success) setToast("購物車已清空")
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="app-container">
      {/* Toast 通知：取代所有 alert / confirm */}
      <Toast message={toast} onClose={() => setToast(null)} />

      <Navbar
        user={user}
        cartTotal={cartTotal}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleClearCart={handleClearCart}
      />

      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <HomePage
              bannerImages={bannerImages}
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
              cakeData={filteredCakes}
              handleAddToCart={handleAddToCart}
              stock={stock}
              isLoading={isLoading}
              error={error}
              searchTerm={searchTerm}
            />
          } />
          <Route path="/login" element={
            <LoginPage
              onLogin={(name) => { setUser(name); navigate('/'); }}
              onBack={() => navigate('/')}
              setToast={setToast}
            />
          } />
          <Route path="/cart" element={
            <CartPage
              cartItems={cartItems}
              updateQuantity={handleUpdateQuantity}
              stock={stock}
              onBack={() => navigate('/')}
              onClear={handleClearCart}
              setToast={setToast}
            />
          } />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-logo">HARU蛋糕店</h4>
            <p>用心烘焙，傳遞每一份手作的溫度</p>
          </div>
          <div className="footer-section">
            <h4>聯絡我們</h4>
            <p>電話：02-1234-5678</p>
            <p>信箱：hello@harucake.com</p>
            <p>地址：台北市文山區甜點路 101 號</p>
          </div>
          <div className="footer-section">
            <h4>關注我們</h4>
            <div className="footer-links">
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">LINE 客服</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 HARU Cake Studio. Portfolio Project by 羅子晴</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
