const Cart = require('../models/Cart');
const Shoe = require('../models/Shoe');

// @desc    Lấy giỏ hàng của người dùng
// @route   GET /api/cart/:userId
// @access  Private
const getCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    let cart = await Cart.findOne({ userId }).populate('items.shoe', 'name price imageUrl');

    if (cart) {
      res.json(cart);
    } else {
      // Nếu giỏ hàng không tồn tại, tạo giỏ hàng mới cho người dùng
      cart = new Cart({
        userId,
        items: [],
        totalAmount: 0
      });
      await cart.save();
      res.json(cart);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Thêm sản phẩm vào giỏ hàng
// @route   POST /api/cart/:userId
// @access  Private
const addToCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { shoeId, quantity, size, color } = req.body;

    // Kiểm tra xem giày có tồn tại không
    const shoe = await Shoe.findById(shoeId);
    if (!shoe) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm giày' });
    }

    // Tìm giỏ hàng của người dùng
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Nếu giỏ hàng không tồn tại, tạo giỏ hàng mới
      cart = new Cart({
        userId,
        items: [],
        totalAmount: 0
      });
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const itemIndex = cart.items.findIndex(item => 
      item.shoe.toString() === shoeId && 
      item.size === size && 
      item.color === color
    );

    if (itemIndex > -1) {
      // Nếu sản phẩm đã tồn tại, cập nhật số lượng
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Thêm sản phẩm mới vào giỏ hàng
      cart.items.push({
        shoe: shoeId,
        quantity,
        size,
        color
      });
    }

    // Tính lại tổng tiền
    let totalAmount = 0;
    for (const item of cart.items) {
      const shoeItem = await Shoe.findById(item.shoe);
      totalAmount += shoeItem.price * item.quantity;
    }
    cart.totalAmount = totalAmount;
    cart.updatedAt = Date.now();

    const updatedCart = await cart.save();
    
    // Trả về giỏ hàng đã cập nhật với thông tin sản phẩm
    const populatedCart = await Cart.findById(updatedCart._id).populate('items.shoe', 'name price imageUrl');
    
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cập nhật số lượng sản phẩm trong giỏ hàng
// @route   PUT /api/cart/:userId/:itemId
// @access  Private
const updateCartItem = async (req, res) => {
  try {
    const userId = req.params.userId;
    const itemId = req.params.itemId;
    const { quantity } = req.body;

    // Tìm giỏ hàng của người dùng
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });
    }

    // Tìm kiếm sản phẩm trong giỏ hàng
    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong giỏ hàng' });
    }

    // Cập nhật số lượng
    if (quantity <= 0) {
      // Nếu số lượng <= 0, xóa sản phẩm khỏi giỏ hàng
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    // Tính lại tổng tiền
    let totalAmount = 0;
    for (const item of cart.items) {
      const shoe = await Shoe.findById(item.shoe);
      totalAmount += shoe.price * item.quantity;
    }
    cart.totalAmount = totalAmount;
    cart.updatedAt = Date.now();

    const updatedCart = await cart.save();
    
    // Trả về giỏ hàng đã cập nhật với thông tin sản phẩm
    const populatedCart = await Cart.findById(updatedCart._id).populate('items.shoe', 'name price imageUrl');
    
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Xóa sản phẩm khỏi giỏ hàng
// @route   DELETE /api/cart/:userId/:itemId
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const itemId = req.params.itemId;

    // Tìm giỏ hàng của người dùng
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });
    }

    // Tìm kiếm sản phẩm trong giỏ hàng
    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong giỏ hàng' });
    }

    // Xóa sản phẩm khỏi giỏ hàng
    cart.items.splice(itemIndex, 1);

    // Tính lại tổng tiền
    let totalAmount = 0;
    for (const item of cart.items) {
      const shoe = await Shoe.findById(item.shoe);
      totalAmount += shoe.price * item.quantity;
    }
    cart.totalAmount = totalAmount;
    cart.updatedAt = Date.now();

    const updatedCart = await cart.save();
    
    // Trả về giỏ hàng đã cập nhật với thông tin sản phẩm
    const populatedCart = await Cart.findById(updatedCart._id).populate('items.shoe', 'name price imageUrl');
    
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Xóa toàn bộ giỏ hàng
// @route   DELETE /api/cart/:userId
// @access  Private
const clearCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Tìm giỏ hàng của người dùng
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });
    }

    // Xóa tất cả sản phẩm trong giỏ hàng
    cart.items = [];
    cart.totalAmount = 0;
    cart.updatedAt = Date.now();

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};