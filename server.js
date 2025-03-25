const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./server/config/db');
require('dotenv').config();

// Kết nối đến database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Định nghĩa routes
app.get('/api', (req, res) => {
  res.send('API đang chạy');
});

// Đăng ký routes
app.use('/api/shoes', require('./server/routes/shoes'));
app.use('/api/users', require('./server/routes/users'));
app.use('/api/cart', require('./server/routes/cart'));
app.use('/api/orders', require('./server/routes/orders'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server đang chạy tại cổng ${PORT}`);
});