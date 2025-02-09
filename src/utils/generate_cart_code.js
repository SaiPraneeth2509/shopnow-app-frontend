// src/utils/generate_cart_code.js
const generateCartCode = () => {
  return `CART-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

export default generateCartCode;
