const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getOrderById, 
  updateOrderToPaid, 
  updateOrderToDelivered, 
  updateOrderStatus,
  getUserOrders, 
  getAllOrders 
} = require('../controllers/orderController');

// @route   POST /api/orders
// @desc    Tạo đơn hàng mới
router.post('/', createOrder);

// @route   GET /api/orders
// @desc    Lấy tất cả đơn hàng (chỉ admin)
router.get('/', getAllOrders);

// @route   GET /api/orders/:id
// @desc    Lấy đơn hàng theo id
router.get('/:id', getOrderById);

// @route   PUT /api/orders/:id/pay
// @desc    Cập nhật đơn hàng thành đã thanh toán
router.put('/:id/pay', updateOrderToPaid);

// @route   PUT /api/orders/:id/deliver
// @desc    Cập nhật đơn hàng thành đã giao hàng
router.put('/:id/deliver', updateOrderToDelivered);

// @route   PUT /api/orders/:id/status
// @desc    Cập nhật trạng thái đơn hàng
router.put('/:id/status', updateOrderStatus);

// @route   GET /api/orders/user/:userId
// @desc    Lấy tất cả đơn hàng của người dùng
router.get('/user/:userId', getUserOrders);

module.exports = router;