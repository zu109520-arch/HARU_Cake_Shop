// src/data/cakeData.js
// 把商品資料獨立出來，App.jsx 就不會那麼雜亂
 
const CakeData = [
  { 
    name: "草莓戚風蛋糕", 
    price: 500, 
    image: "strawberry-cake.jpg", 
    options: [
      { label: "加蠟燭", price: 10 }, 
      { label: "加鮮奶油", price: 30 }
    ] 
  },
  { 
    name: "巧克力蛋糕", 
    price: 600, 
    image: "chocolate-cake.jpg", 
    options: [
      { label: "加蠟燭", price: 10 }, 
      { label: "加鮮奶油", price: 30 }
    ] 
  },
  { 
    name: "草莓檸檬威風蛋糕", 
    price: 580, 
    image: "strawberry-lemon-cake.jpg", 
    options: [
      { label: "加蠟燭", price: 10 }, 
      { label: "加鮮奶油", price: 30 }
    ] 
  }
];
 
export default CakeData;