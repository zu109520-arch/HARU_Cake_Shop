import { calculatePrice, getToppings } from './lib.js';
import { saveCartTotal, getCartTotal, clearStorage } from './storage.js';

const AppController = {
    currentAmount: getCartTotal(),
    bannerIndex: 0,
    stockCount: 15,
    isPromoVisible: false,

    init: function() {
        console.log("🍰 HARU 蛋糕店系統啟動中...");
        this.updateCartUI();
        this.loadCakes();
        this.startBanner();
        this.startStockTimer();
        this.startPromoTimer();
    },

    updateCartUI: function() {
        const cartTotalEl = document.querySelector("#cart-total");
        if (cartTotalEl) cartTotalEl.innerText = this.currentAmount;
    },

    addPrice: function(baseProduct, ...toppingPrices) {
        const finalPrice = calculatePrice(baseProduct.price, ...toppingPrices);
        this.currentAmount += finalPrice;
        saveCartTotal(this.currentAmount);
        this.updateCartUI();
        alert(`【${baseProduct.name}】已加入！`);
    },

    clearCart: function() {
        this.currentAmount = 0;
        clearStorage();
        this.updateCartUI();
        alert("購物車已清空囉！🍰");
    },

    // --- 輪播與計時器 (維持原樣) ---
    startBanner: function() {
        setInterval(() => {
            const banners = document.querySelectorAll('.banner-img');
            if (banners.length > 0) {
                this.bannerIndex = (this.bannerIndex + 1) % banners.length;
                this.updateBannerUI();
            }
        }, 4000);
    },

    updateBannerUI: function() {
        const banners = document.querySelectorAll('.banner-img');
        const dots = document.querySelectorAll('.dot');
        banners.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        if (banners[this.bannerIndex]) banners[this.bannerIndex].classList.add('active');
        if (dots[this.bannerIndex]) dots[this.bannerIndex].classList.add('active');
    },

    move: function(dir) {
        const banners = document.querySelectorAll('.banner-img');
        this.bannerIndex = (this.bannerIndex + dir + banners.length) % banners.length;
        this.updateBannerUI();
    },

    startStockTimer: function() {
        const updateStock = () => {
            if (this.stockCount > 3) {
                this.stockCount -= 1;
                const stockEl = document.querySelector("#stock-num");
                if (stockEl) stockEl.innerText = this.stockCount;
                setTimeout(updateStock, Math.random() * 7000 + 8000);
            }
        };
        updateStock();
    },

    startPromoTimer: function() {
        setTimeout(() => {
            this.isPromoVisible = true;
            this.renderPromo();
        }, 5000);
    },

    renderPromo: function() {
        if (!this.isPromoVisible) return;
        const modal = document.createElement("div");
        modal.className = "promo-modal";
        modal.innerHTML = `
            <div class="modal-content">
                <h3>🍰 HARU 限時驚喜</h3>
                <p>現在下單，輸入折扣碼 <strong>HARU88</strong> 現折 50 元！</p>
                <button id="close-promo">太棒了，收下！</button>
            </div>
        `;
        document.body.appendChild(modal);
        document.querySelector("#close-promo").onclick = () => {
            modal.remove();
            this.isPromoVisible = false;
        };
    },

    // --- 【重點】修正後的資料渲染 ---
    loadCakes: function() {
        fetch("cakes.json")
            .then(response => response.json())
            .then(data => {
                const productList = document.querySelector("#product-list");
                if (!productList) return;

                let htmlContent = ""; 
                data.forEach(product => {
                    const { name, price, image, status = "販售中", options = [] } = product;
                    const isSoldOut = status === "已售完";
                    const safeName = name.replace(/\s/g, '');

                    let optionsHTML = '<div class="options-group" style="margin: 10px 0;">';
                    options.forEach(opt => {
                        optionsHTML += `
                            <label style="display: block; font-size: 13px;">
                                <input type="checkbox" class="opt-${safeName}" value="${opt.price}" ${isSoldOut ? 'disabled' : ''}> 
                                ${opt.label} (+$${opt.price})
                            </label>`;
                    });
                    optionsHTML += '</div>';

// 在 main.js 的 loadCakes 函式裡
htmlContent += `
    <div class="cake-card" style="border: 1px solid #eee; border-radius: 12px; padding: 20px; margin: 1%; width: 30%; display: inline-block; vertical-align: top; box-shadow: 0 4px 10px rgba(0,0,0,0.05); text-align: left; box-sizing: border-box;">
        <img src="image/${image}" style="width: 100%; border-radius: 8px; margin-bottom: 15px;" alt="${name}">
        <div class="status-tag" style="color: ${status === '即將售完' ? '#ff9800' : '#4caf50'}; font-size: 12px; font-weight: bold;">
            ● ${status}
        </div>
        <h3 style="margin: 8px 0; font-size: 1.2rem;">${name}</h3>
        ${optionsHTML}
        <div style="font-size: 18px; font-weight: bold; color: #d32f2f; margin-bottom: 15px;">
            $${price}
        </div>
        <button class="btn" 
            style="width: 100%; padding: 10px; border-radius: 5px; border: none; color: white; cursor: ${isSoldOut ? 'not-allowed' : 'pointer'}; background: ${isSoldOut ? '#ccc' : '#ff4d4f'};"
            onclick="${isSoldOut ? '' : `window.addPrice({name: '${name}', price: ${price}}, ...window.getToppings('${safeName}'))`}">
            ${isSoldOut ? '已售完' : '加入購物車'}
        </button>
    </div>
`;
                });
                productList.innerHTML = htmlContent;
            })
            .catch(err => console.error("載入失敗:", err));
    }
};

// --- 3. 橋接區 ---
window.addPrice = (p, ...t) => AppController.addPrice(p, ...t);
window.clearCart = () => AppController.clearCart();
window.moveBanner = (dir) => AppController.move(dir);
window.currentSlide = (n) => {
    AppController.bannerIndex = n;
    AppController.updateBannerUI();
};
window.getToppings = getToppings;

// 4. 正式啟動
AppController.init();