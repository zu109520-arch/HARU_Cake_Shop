import { useState, useEffect } from 'react'
// 1. 導入 Router 工具
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import './App.css'

import HomePage from './HomePage'
import LoginPage from './LoginPage'
import CartPage from './CartPage' 

const cakeData = [
  { 
    "name": "草莓戚風蛋糕", 
    "price": 500, 
    "image": "strawberry-cake.jpg", 
    // 這裡的 status 拿掉，因為 CakeCard 會自己算
    "options": [{ "label": "加蠟燭", "price": 10 }, { "label": "加鮮奶油", "price": 30 }] 
  },
  { 
    "name": "巧克力蛋糕", 
    "price": 600, 
    "image": "chocolate-cake.jpg", 
    "options": [{ "label": "加蠟燭", "price": 10 }, { "label": "加鮮奶油", "price": 30 }] 
  },
  { 
    "name": "草莓檸檬威風蛋糕", 
    "price": 580, 
    "image": "strawberry-lemon-cake.jpg", 
    "options": [{ "label": "加蠟燭", "price": 10 }, { "label": "加鮮奶油", "price": 30 }] 
  }
];

const bannerImages = ["/image/strawberry-cake.jpg", "/image/chocolate-cake.jpg", "/image/strawberry-lemon-cake.jpg"];

// 我們把導覽列拆出來，這樣邏輯比較乾淨
function Navbar({ user, cartTotal, searchTerm, setSearchTerm, handleClearCart }) {
  const navigate = useNavigate(); // 用來跳轉網址的工具
  
  return (
    <div className="welcome">
      <div className="left" onClick={() => { navigate('/'); setSearchTerm(''); }} style={{cursor:'pointer'}}>HARU蛋糕店</div>
      <div className="right">
        <div className="search-bar" style={{ display: 'flex', alignItems: 'center', background: '#f5f5f5', padding: '5px 15px', borderRadius: '20px', marginRight: '15px' }}>
          <img src="/image/search.svg" className="nav-icon" alt="搜尋" style={{ width: '18px', marginRight: '8px' }} />
          <input 
            type="text" 
            placeholder="搜尋蛋糕..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              navigate('/'); // 搜尋時跳回首頁
            }}
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '14px', width: '120px' }}
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

function App() {
  // 2. 初始化時從 localStorage 讀取資料
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('haru-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [stock, setStock] = useState(() => {
    const savedStock = localStorage.getItem('haru-stock');
    return savedStock ? parseInt(savedStock) : 10;
  });

  const [user, setUser] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // 3. 當購物車或庫存變動時，自動存進 localStorage
  useEffect(() => {
    localStorage.setItem('haru-cart', JSON.stringify(cartItems));
    localStorage.setItem('haru-stock', stock.toString());
  }, [cartItems, stock]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const filteredCakes = cakeData.filter(cake => 
    cake.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- 妳原本優秀的邏輯保留區 ---
  const handleAddToCart = (cakeObject, finalPrice, selectedOptions = []) => {
    if (stock <= 0) {
      alert("抱歉，今日 10 組名額已滿！");
      return;
    }
    setStock(prev => prev - 1);
    const currentOptionsStr = selectedOptions.map(o => o.label).sort().join(',');
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => {
        const itemOptionsStr = item.selectedOptions ? item.selectedOptions.map(o => o.label).sort().join(',') : '';
        return item.name === cakeObject.name && itemOptionsStr === currentOptionsStr;
      });
      if (existingIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingIndex] = { ...newItems[existingIndex], quantity: newItems[existingIndex].quantity + 1 };
        return newItems;
      }
      return [...prevItems, { ...cakeObject, price: finalPrice, quantity: 1, selectedOptions }];
    });
  };

  const updateQuantity = (index, delta) => {
    const itemToUpdate = cartItems[index];
    if (!itemToUpdate) return;
    if (delta > 0 && stock <= 0) {
      alert("抱歉，今日名額已達上限 10 組！");
      return;
    }
    const isDeleting = (itemToUpdate.quantity + delta <= 0);
    if (isDeleting) {
      setStock(prev => prev + itemToUpdate.quantity);
      setCartItems(prev => prev.filter((_, i) => i !== index));
    } else {
      setStock(prev => prev - delta);
      setCartItems(prev => prev.map((item, i) => i === index ? { ...item, quantity: item.quantity + delta } : item));
    }
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) return;
    if (window.confirm("確定要清空購物車內的所有商品嗎？")) {
      const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      setStock(prev => prev + totalQty);
      setCartItems([]);
      alert("購物車已清空");
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // 4. 使用 Router 結構包裹
  return (
    <Router>
      <div className="app-container">
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
              />
            } />
            <Route path="/login" element={
              <LoginPage 
                onLogin={(name) => { setUser(name); }} 
                onBack={() => {}} // Router 環境下建議直接按 Navbar 返回
              />
            } />
            <Route path="/cart" element={
              <CartPage 
                cartItems={cartItems} 
                updateQuantity={updateQuantity} 
                stock={stock} 
                onBack={() => {}} 
                onClear={handleClearCart} 
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
            <p>© 2026 HARU Cake Studio. Portfolio Project by 羅子晴 </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
export default App;