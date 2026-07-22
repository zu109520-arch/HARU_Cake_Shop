export function getUsernameFromEmail(email) {
  return email.split('@')[0];
}

export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function calculateTotal(cartItems) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );
  return total;
}

export function isStockAvailable(stock) {
  return stock > 0;
}

export function getStockStatus(stock) {
  if (stock <= 0) {
    return '已售完';
  } else if (stock <= 3) {
    return '即將售完';
  }
  return '販售中';
}

export function isValidPhone(phone) {
  const regex = /^09\d{8}$/;
  return regex.test(phone);
}

export function isValidName(name) {
  const regex = /^[a-zA-Z\u4e00-\u9fa5]{2,}$/;
  return regex.test(name);
}

export function isValidAddress(address) {
  return address.includes('市') || address.includes('縣');
}
