import React from 'react';
import CakeCard from './CakeCard';

function SkeletonCard() {
  return (
    <div style={{
      padding: '20px',
      background: '#fff',
      borderRadius: '15px',
      margin: '15px',
      width: '220px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    }}>

      <div style={{
        width: '100%', height: '160px', borderRadius: '12px',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }} />

      <div style={{
        margin: '15px auto 8px', height: '16px', width: '70%', borderRadius: '8px',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }} />

      <div style={{
        margin: '8px auto', height: '14px', width: '40%', borderRadius: '8px',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }} />

      <div style={{
        marginTop: '12px', height: '38px', borderRadius: '5px',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }} />
    </div>
  );
}

function HomePage({ bannerImages, currentSlide, setCurrentSlide, cakeData, handleAddToCart, stock, isLoading, error, searchTerm }) {

  const renderCakeSection = () => {

    if (isLoading) {
      return (
        <>
          <style>{`
            @keyframes shimmer {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}</style>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px' }}>
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </>
      );
    }

    if (error) {
      return (
        <div style={{
          textAlign: 'center', padding: '60px 20px', margin: '20px auto', maxWidth: '400px',
          background: '#fff2f0', borderRadius: '16px', border: '1px solid #ffccc7'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <p style={{ fontSize: '16px', color: '#ff4d4f', fontWeight: 'bold', marginBottom: '8px' }}>
            商品載入失敗
          </p>
          <p style={{ fontSize: '14px', color: '#999', marginBottom: '20px' }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 28px', borderRadius: '20px', border: 'none',
              background: '#ff4d4f', color: '#fff', cursor: 'pointer', fontSize: '14px'
            }}
          >
            重新載入
          </button>
        </div>
      );
    }

    if (cakeData.length === 0) {
      return (
        <div style={{
          textAlign: 'center', padding: '60px 20px', margin: '20px auto', maxWidth: '400px',
        }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>🔍</div>
          <p style={{ fontSize: '18px', color: '#555', fontWeight: 'bold', marginBottom: '8px' }}>
            找不到「{searchTerm}」相關的蛋糕
          </p>
          <p style={{ fontSize: '14px', color: '#aaa' }}>
            試試其他關鍵字，或瀏覽全部商品吧！
          </p>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px' }}>
        {cakeData.map((cake) => (
          <CakeCard
            key={cake.name}
            cake={cake}
            onAddToCart={handleAddToCart}
            stock={stock}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="main-banner">
        <div className="banner-wrapper">
          {bannerImages.map((img, index) => (
            <img
              key={index}
              src={img}
              className={`banner-img ${index === currentSlide ? 'active' : ''}`}
              alt="Banner"
              style={index === 2
                ? { objectPosition: 'center center' }
                : { objectPosition: 'center top' }
              }
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

      <div className="stock-alert">
        🔥 全店熱銷中！今日剩餘名額：<span>{stock}</span> 組
      </div>

      <div className="text">所有商品</div>
      {renderCakeSection()}
    </>
  );
}

export default HomePage;
