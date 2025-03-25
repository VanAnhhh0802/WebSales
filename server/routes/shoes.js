const express = require('express');
const router = express.Router();
const { 
  getShoes, 
  getShoeById, 
  createShoe, 
  updateShoe, 
  deleteShoe 
} = require('../controllers/shoeController');

// @route   GET /api/shoes
// @desc    Lấy tất cả giày
router.get('/', getShoes);

// @route   GET /api/shoes/:id
// @desc    Lấy giày theo id
router.get('/:id', getShoeById);

// @route   POST /api/shoes
// @desc    Tạo giày mới
router.post('/', createShoe);

// @route   PUT /api/shoes/:id
// @desc    Cập nhật thông tin giày
router.put('/:id', updateShoe);

// @route   DELETE /api/shoes/:id
// @desc    Xóa giày
router.delete('/:id', deleteShoe);

module.exports = router;