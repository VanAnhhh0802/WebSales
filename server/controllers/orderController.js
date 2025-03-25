const Order = require('../models/Order');
const Shoe = require('../models/Shoe');
const Cart = require('../models/Cart');

// @desc    Tạo đơn hàng mới
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const {
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice
    } = req.body;

    // Kiểm tra nếu không có sản phẩm
    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'Không có sản phẩm trong đơn hàng' });
    }

    // Tạo đơn hàng mới
    const order = new Order({
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice
    });

    const createdOrder = await order.save();

    // Xóa sản phẩm khỏi giỏ hàng sau khi đặt hàng thành công
    await Cart.findOneAndUpdate(
      { userId: user },
      { $set: { items: [], totalAmount: 0 } }
    );

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy đơn hàng theo id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'username email');

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cập nhật đơn hàng thành đã thanh toán
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address
      };
      order.status = 'processing';

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cập nhật đơn hàng thành đã giao hàng
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      order.status = 'delivered';

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cập nhật trạng thái đơn hàng
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = status;

      // Cập nhật các trường khác tùy thuộc vào trạng thái
      if (status === 'delivered') {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      } else if (status === 'cancelled') {
        // Có thể thêm logic khác ở đây, ví dụ như hoàn lại hàng tồn kho
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy tất cả đơn hàng của người dùng
// @route   GET /api/orders/user/:userId
// @access  Private
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy tất cả đơn hàng
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'username email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderStatus,
  getUserOrders,
  getAllOrders
};