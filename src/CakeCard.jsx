import React, { useState } from 'react';

function CakeCard({ cake, onAddToCart, stock }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (option) => {
    setSelectedOptions(prev => {
      const exists = prev.find(o => o.label === option.label);
      if (exists) {
        return prev.filter(o => o.label !== option.label);
      } else {
        return [...prev, option];
      }
    });
  };

  const optionsTotal = selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
  const currentPrice = cake.price + optionsTotal;
  const isSoldOut = stock <= 0;

  let displayStatus = "販售中"; 
  let badgeColor = '#52c41a'; 

  if (isSoldOut) {
    displayStatus = '已售完';
    badgeColor = '#999'; 
  } else if (stock <= 3) {
    displayStatus = '即將售完';
    badgeColor = '#ff4d4f'; 
  }

  return (
    <div className="cake-card" style={{ 
      padding: '20px', 
      background: '#fff', 
      borderRadius: '15px', 
      margin: '15px', 
      width: '220px', 
      textAlign: 'center', 
      opacity: isSoldOut ? 0.6 : 1, 
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', 
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease'
    }}>
      <div className="cake-image-container" style={{ position: 'relative' }}>
        <img src={`/image/${cake.image}`} alt={cake.name} style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', height: '160px' }} />
        
        <span style={{
          position: 'absolute', top: '10px', right: '10px', padding: '5px 10px', borderRadius: '20px', fontSize: '11px', color: '#fff',
          backgroundColor: badgeColor,
          zIndex: 5,
          fontWeight: 'bold',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
          {displayStatus}
        </span>

        {!isSoldOut && cake.options && (
          <div className="options-bubble">
            <p style={{ fontSize: '12px', margin: '5px 0', fontWeight: 'bold', color: '#4a4a4a' }}>客製化加購：</p>
            {cake.options.map((opt, i) => (
              <label key={i} style={{ display: 'flex', alignItems: 'center', fontSize: '11px', gap: '5px', margin: '3px 0', cursor: 'pointer', color: '#666' }}>
                <input 
                  type="checkbox" 
                  checked={selectedOptions.some(o => o.label === opt.label)}
                  onChange={() => handleOptionChange(opt)} 
                />
                {opt.label} (+${opt.price})
              </label>
            ))}
          </div>
        )}
      </div>

      <h4 style={{ 
        margin: '15px 0 5px', 
        fontSize: '1.1rem',
        color: '#333',
        height: '3rem', 
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center', 
        lineHeight: '1.3'
      }}>
        {cake.name}
      </h4>

      <p style={{ color: '#ff4d4f', fontWeight: 'bold', fontSize: '1.2rem', margin: '5px 0' }}>
        ${currentPrice}
      </p>
      
      <button 
        className="btn" 
        disabled={isSoldOut}
        onClick={() => onAddToCart(cake, currentPrice, selectedOptions)} 
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #4a4a4a',
          background: isSoldOut ? '#eee' : '#fff',
          color: isSoldOut ? '#999' : '#4a4a4a',
          cursor: isSoldOut ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s',
          fontWeight: 'bold'
        }}
      >
        {isSoldOut ? '今日已售罄' : '加入購物車'}
      </button>
    </div>
  );
}

export default CakeCard;