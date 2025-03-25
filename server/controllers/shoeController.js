const Shoe = require('../models/Shoe');

// @desc    Lấy tất cả giày
// @route   GET /api/shoes
// @access  Public
const getShoes = async (req, res) => {
  try {
    const shoes = await Shoe.find({});
    res.json(shoes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy giày theo id
// @route   GET /api/shoes/:id
// @access  Public
const getShoeById = async (req, res) => {
  try {
    const shoe = await Shoe.findById(req.params.id);
    
    if (shoe) {
      res.json(shoe);
    } else {
      res.status(404).json({ message: 'Không tìm thấy giày' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Tạo giày mới
// @route   POST /api/shoes
// @access  Private/Admin
const createShoe = async (req, res) => {
  try {
    const { 
      name, 
      brand, 
      price, 
      sizes, 
      colors, 
      description, 
      imageUrl, 
      category 
    } = req.body;

    const shoe = new Shoe({
      name,
      brand,
      price,
      sizes,
      colors,
      description,
      imageUrl,
      category,
      inStock: true
    });

    const createdShoe = await shoe.save();
    res.status(201).json(createdShoe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Cập nhật thông tin giày
// @route   PUT /api/shoes/:id
// @access  Private/Admin
const updateShoe = async (req, res) => {
  try {
    const { 
      name, 
      brand, 
      price, 
      sizes, 
      colors, 
      description, 
      imageUrl, 
      category,
      inStock,
      rating
    } = req.body;

    const shoe = await Shoe.findById(req.params.id);

    if (shoe) {
      shoe.name = name || shoe.name;
      shoe.brand = brand || shoe.brand;
      shoe.price = price || shoe.price;
      shoe.sizes = sizes || shoe.sizes;
      shoe.colors = colors || shoe.colors;
      shoe.description = description || shoe.description;
      shoe.imageUrl = imageUrl || shoe.imageUrl;
      shoe.category = category || shoe.category;
      shoe.inStock = inStock !== undefined ? inStock : shoe.inStock;
      shoe.rating = rating || shoe.rating;

      const updatedShoe = await shoe.save();
      res.json(updatedShoe);
    } else {
      res.status(404).json({ message: 'Không tìm thấy giày' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Xóa giày
// @route   DELETE /api/shoes/:id
// @access  Private/Admin
const deleteShoe = async (req, res) => {
  try {
    const shoe = await Shoe.findById(req.params.id);

    if (shoe) {
      await shoe.deleteOne();
      res.json({ message: 'Đã xóa giày thành công' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy giày' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getShoes,
  getShoeById,
  createShoe,
  updateShoe,
  deleteShoe
};