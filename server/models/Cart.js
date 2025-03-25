const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  shoe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shoe',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  size: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  }
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  items: [cartItemSchema],
  totalAmount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cart', cartSchema);