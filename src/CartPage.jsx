import React, { useState } from 'react';
// 1. 引入 Link 讓「繼續購物」和「去逛逛吧」可以跳轉
import { Link } from 'react-router-dom';

function CartPage({ cartItems, onClear, updateQuantity, stock }) {
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  
  // 計算總金額 (單價 x 數量)
  const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) return alert("購物車是空的喔！");

    const nameRule = /^[a-zA-Z\u4e00-\u9fa5]{2,}$/;
    if (!nameRule.test(formData.name)) {
      return alert("請輸入正確的姓名（至少兩個字，且不含數字）");
    }

    const phoneRule = /^09\d{8}$/;
    if (!phoneRule.test(formData.phone)) {
      return alert("請輸入正確的手機號碼（範例：0912345678）");
    }

    if (!formData.address.includes('市') && !formData.address.includes('縣')) {
      return alert("地址請包含縣市名稱，以便外送員尋找喔！");
    }

    alert(`🎉 訂購成功！\n------------------\n收件人：${formData.name}\n總金額：$${total}\n------------------\n感謝您的訂購，蛋糕準備中！`);
    onClear(); 
    // 下單後會自動因為 onClear 變回空購物車狀態，不需要手動跳轉
  };

  return (
    <div className="cart-page-container" style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div className="cart-box">
        {/* --- 修改點：更換現代感回首頁連結 --- */}
        <Link to="/" className="back-link-modern" style={{ textDecoration: 'none', color: '#666', fontSize: '14px', display: 'inline-block', marginBottom: '20px' }}>
          ← 繼續選購蛋糕
        </Link>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ margin: 0, fontSize: '24px', color: '#333' }}>您的購物清單</h2>
          {cartItems.length > 0 && (
            <button 
              onClick={onClear}
              className="btn-clear-all"
            >
              🗑️ 清空購物車
            </button>
          )}
        </div>
        
        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f9f9f9', borderRadius: '15px' }}>
            <p style={{ fontSize: '18px', color: '#888', marginBottom: '20px' }}>購物車目前是空的喔！</p>
            {/* --- 修改點：修正無反應問題 --- */}
            <Link to="/" className="btn-checkout-final" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto', padding: '12px 40px' }}>
              去挑選好吃的蛋糕吧
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item-modern" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '20px 0', 
                  borderBottom: '1px solid #eee',
                  gap: '20px' 
                }}>
                  <img src={`/image/${item.image}`} className="cart-item-img" alt={item.name} style={{ width: '80px', height: '80px', borderRadius: '10px', objectFit: 'cover' }} />
                  
                  <div className="cart-item-info" style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>{item.name}</h4>
                    
                    {item.selectedOptions && item.selectedOptions.length > 0 && (
                      <div className="cart-item-custom" style={{ marginBottom: '10px' }}>
                        {item.selectedOptions.map((opt, i) => (
                          <span key={i} className="custom-tag" style={{ background: '#fff0f0', color: '#ff4d4f', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', marginRight: '5px' }}>
                            +{opt.label}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ margin: 0, fontWeight: 'bold', color: '#ff4d4f' }}>${item.price}</p>
                      
                      {/* --- 修改點：調整按鈕間距與外觀 --- */}
                      <div className="qty-controls" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <button 
                          className="qty-btn"
                          onClick={() => updateQuantity(index, -1)}
                          style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}
                        >-</button>
                        
                        <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 'bold' }}>{item.quantity || 1}</span>
                        
                        <button 
                          className="qty-btn"
                          onClick={() => updateQuantity(index, 1)}
                          disabled={stock <= 0}
                          style={{ 
                            width: '28px', 
                            height: '28px', 
                            borderRadius: '50%', 
                            border: '1px solid #ddd', 
                            background: stock <= 0 ? '#f5f5f5' : '#fff',
                            cursor: stock <= 0 ? 'not-allowed' : 'pointer'
                          }}
                        >+</button>

                        <button 
                          onClick={() => updateQuantity(index, -(item.quantity || 1))}
                          style={{ background: 'none', border: 'none', color: '#bbb', cursor: 'pointer', fontSize: '13px', marginLeft: '10px' }}
                        > 刪除 </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="shipping-form" style={{ marginTop: '40px', background: '#fff8f8', padding: '30px', borderRadius: '15px' }}>
              <h3 className="form-title" style={{ marginTop: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>🍰 配送資訊</h3>
              <form onSubmit={handleCheckout} className="checkout-form">
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>收件人姓名</label>
                    <input 
                      type="text" 
                      name="name" 
                      className="modern-input"
                      placeholder="請輸入真實姓名" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>聯絡電話</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      className="modern-input"
                      placeholder="0912345678" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '30px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>外送地址</label>
                  <input 
                    type="text" 
                    name="address" 
                    className="modern-input"
                    placeholder="請輸入包含縣市的完整地址" 
                    value={formData.address} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                
                <div className="cart-summary-box" style={{ borderTop: '2px dashed #ffcccc', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="total-price">
                    <span style={{ color: '#666', marginRight: '10px' }}>應付總額</span>
                    <span className="price-amount" style={{ fontSize: '28px', fontWeight: 'bold', color: '#ff4d4f' }}>${total}</span>
                  </div>
                  <button type="submit" className="btn-checkout-final">確認下單 ➔</button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;