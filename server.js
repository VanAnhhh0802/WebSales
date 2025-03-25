const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./server/config/db');
require('dotenv').config();

// Cờ để kiểm tra tình trạng kết nối database
let isDBConnected = false;

// Kết nối đến database
(async () => {
  try {
    await connectDB();
    isDBConnected = true;
  } catch (error) {
    console.error('Failed to connect to database:', error);
    console.log('App will run with limited functionality');
  }
})();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve các tập tin static từ thư mục dist (sau khi build)
app.use(express.static(path.join(__dirname, 'dist')));

// Định nghĩa API routes
app.get('/api', (req, res) => {
  res.send('API đang chạy');
});

// API middleware để kiểm tra kết nối database
app.use('/api', (req, res, next) => {
  if (req.path === '/' || req.path === '') {
    return next(); // Cho phép API status check
  }
  
  if (!isDBConnected) {
    // Trả về lỗi khi database không kết nối được
    const mockResponse = {
      success: false,
      message: 'Database connection unavailable. Please try again later.',
      isDemo: true
    };
    
    // Nếu route là /api/shoes, trả về một số dữ liệu mẫu
    if (req.path.startsWith('/shoes')) {
      return res.json({
        success: true,
        isDemo: true,
        message: 'Demo data - database is not connected',
        data: [
          {
            id: 1,
            name: 'Air Max 90',
            brand: 'Nike',
            price: 2500000,
            category: 'running',
            imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e6da41fa-1be4-4ce5-b89c-22be4f1f02d4/air-force-1-07-shoes-WrLlWX.png'
          },
          {
            id: 2,
            name: 'Superstar',
            brand: 'Adidas',
            price: 1800000,
            category: 'casual',
            imageUrl: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ed0855435194229a525aad6009a0497_9366/SUPERSTAR_SHOES_White_EG4958_01_standard.jpg'
          }
        ]
      });
    }
    
    return res.status(503).json(mockResponse);
  }
  
  next();
});

// Đăng ký API routes
app.use('/api/shoes', require('./server/routes/shoes'));
app.use('/api/users', require('./server/routes/users'));
app.use('/api/cart', require('./server/routes/cart'));
app.use('/api/orders', require('./server/routes/orders'));

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Đã xảy ra lỗi trên server',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Phục vụ ứng dụng Vue cho tất cả các routes khác
app.get('*', (req, res) => {
  // Chỉ phục vụ ứng dụng Vue khi không phải là API route
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server đang chạy tại cổng ${PORT}`);
});