const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile, 
  getUsers, 
  deleteUser 
} = require('../controllers/userController');

// @route   POST /api/users
// @desc    Đăng ký người dùng mới
router.post('/', registerUser);

// @route   POST /api/users/login
// @desc    Xác thực người dùng & lấy token
router.post('/login', loginUser);

// @route   GET /api/users/profile/:id
// @desc    Lấy thông tin người dùng
router.get('/profile/:id', getUserProfile);

// @route   PUT /api/users/profile/:id
// @desc    Cập nhật thông tin người dùng
router.put('/profile/:id', updateUserProfile);

// @route   GET /api/users
// @desc    Lấy tất cả người dùng (chỉ admin)
router.get('/', getUsers);

// @route   DELETE /api/users/:id
// @desc    Xóa người dùng (chỉ admin)
router.delete('/:id', deleteUser);

module.exports = router;