const User = require('../models/User');

// @desc    Đăng ký người dùng mới
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { username, email, password, fullName, address, phone } = req.body;

    // Kiểm tra nếu người dùng đã tồn tại
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Người dùng đã tồn tại' });
    }

    // Tạo người dùng mới
    const user = new User({
      username,
      email,
      password, // Trong thực tế cần mã hóa password trước khi lưu vào DB
      fullName,
      address,
      phone,
      role: 'customer'
    });

    const createdUser = await user.save();

    if (createdUser) {
      res.status(201).json({
        _id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
        fullName: createdUser.fullName,
        role: createdUser.role,
        // Gửi token JWT trong một triển khai thực tế
      });
    } else {
      res.status(400).json({ message: 'Dữ liệu người dùng không hợp lệ' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Xác thực người dùng & lấy token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm kiếm người dùng bằng email
    const user = await User.findOne({ email });

    // Trong một ứng dụng thực tế, bạn sẽ so sánh mật khẩu đã mã hóa
    if (user && password === user.password) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        // Gửi token JWT trong một triển khai thực tế
      });
    } else {
      res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy thông tin người dùng
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    // Trong ứng dụng thực tế, id của người dùng sẽ được lấy từ token JWT
    // Ở đây chúng ta giả định req.user.id đã được đặt bởi middleware xác thực
    const userId = req.params.id; // Tạm thời lấy từ params

    const user = await User.findById(userId);

    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        address: user.address,
        phone: user.phone,
        role: user.role
      });
    } else {
      res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cập nhật thông tin người dùng
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    // Trong ứng dụng thực tế, id của người dùng sẽ được lấy từ token JWT
    const userId = req.params.id; // Tạm thời lấy từ params

    const user = await User.findById(userId);

    if (user) {
      user.username = req.body.username || user.username;
      user.fullName = req.body.fullName || user.fullName;
      user.email = req.body.email || user.email;
      
      if (req.body.password) {
        user.password = req.body.password; // Trong thực tế cần mã hóa password
      }
      
      if (req.body.address) {
        user.address = req.body.address;
      }
      
      if (req.body.phone) {
        user.phone = req.body.phone;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        role: updatedUser.role,
        // Gửi token JWT mới trong triển khai thực tế
      });
    } else {
      res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy tất cả người dùng
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Xóa người dùng
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.deleteOne();
      res.json({ message: 'Người dùng đã được xóa' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser
};