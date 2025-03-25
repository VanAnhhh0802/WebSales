const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./server/config/db');
require('dotenv').config();

// Kết nối đến database
connectDB();

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

// Đăng ký API routes
app.use('/api/shoes', require('./server/routes/shoes'));
app.use('/api/users', require('./server/routes/users'));
app.use('/api/cart', require('./server/routes/cart'));
app.use('/api/orders', require('./server/routes/orders'));

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