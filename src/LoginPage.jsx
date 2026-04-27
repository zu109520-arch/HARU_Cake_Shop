import React, { useState } from 'react';
function LoginPage({ onLogin, onBack, setToast }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email.split('@')[0]);  // ← 這行不能拿掉
    } else {
      setToast("請輸入帳號密碼")    // ← alert 改成這個
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        {/* 返回按鈕移到卡片內左上角，更精緻 */}
        <button className="btn-back-link" onClick={onBack}>← 返回商店</button>
        
        <div className="login-header">
          <div className="login-logo">🍰</div>
          <h2>會員登入</h2>
          <p>歡迎來到 HARU 蛋糕店</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>電子信箱</label>
            <input 
              type="email" 
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="input-group">
            <label>密碼</label>
            <input 
              type="password" 
              placeholder="請輸入密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <button type="submit" className="btn-login-submit">立即登入</button>
        </form>
        
        <div className="login-footer-text">
          <span>還不是會員？ <a href="#" onClick={(e) => e.preventDefault()}>立即註冊</a></span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;