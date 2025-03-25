const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    
    // Kết nối với MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout sau 5 giây nếu không kết nối được
      socketTimeoutMS: 45000, // Timeout cho operation
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    
    // Dùng mock data nếu không kết nối được MongoDB Atlas
    console.log('Falling back to mock data mode...');
    // Ném lỗi để báo với caller rằng kết nối đã thất bại
    throw error;
  }
};

module.exports = connectDB;