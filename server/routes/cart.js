const express = require('express');
const router = express.Router();
const { 
  getCart, 
  addToCart, 
  updateCartItem, 
  removeFromCart, 
  clearCart 
} = require('../controllers/cartController');

// @route   GET /api/cart/:userId
// @desc    Lấy giỏ hàng của người dùng
router.get('/:userId', getCart);

// @route   POST /api/cart/:userId
// @desc    Thêm sản phẩm vào giỏ hàng
router.post('/:userId', addToCart);

// @route   PUT /api/cart/:userId/:itemId
// @desc    Cập nhật số lượng sản phẩm trong giỏ hàng
router.put('/:userId/:itemId', updateCartItem);

// @route   DELETE /api/cart/:userId/:itemId
// @desc    Xóa sản phẩm khỏi giỏ hàng
router.delete('/:userId/:itemId', removeFromCart);

// @route   DELETE /api/cart/:userId
// @desc    Xóa toàn bộ giỏ hàng
router.delete('/:userId', clearCart);

module.exports = router;