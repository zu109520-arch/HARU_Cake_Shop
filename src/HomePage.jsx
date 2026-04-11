import React from 'react';
import CakeCard from './CakeCard';

function HomePage({ bannerImages, currentSlide, setCurrentSlide, cakeData, handleAddToCart, stock }) {
  return (
    <>
      {/* 1. Banner 輪播區塊 */}
      <div className="main-banner">
        <div className="banner-wrapper">
          {bannerImages.map((img, index) => (
            <img 
              key={index}
              src={img} 
              className={`banner-img ${index === currentSlide ? 'active' : ''}`} 
              alt="Banner" 
            />
          ))}
        </div>
        <div className="banner-dots">
          {bannerImages.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* 2. 庫存公告 */}
      <div className="stock-alert">
        🔥 全店熱銷中！今日剩餘名額：<span>{stock}</span> 組
      </div>

      {/* 3. 商品列表區塊 */}
      <div className="text">所有商品</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px' }}>


{cakeData.map((cake, index) => (
  <CakeCard 
    key={index} 
    cake={cake} 
    onAddToCart={handleAddToCart} 
    stock={stock}  // <--- 這行沒加的話，按鈕就不會自動鎖死喔！
  />
))}
      </div>
    </>
  );
}

export default HomePage;