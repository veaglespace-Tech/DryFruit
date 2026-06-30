const { Product, Category, ProductImage } = require('../models');
const { Op } = require('sequelize');

// @desc    Get all products (public, with filters)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const {
      page = 1, limit = 12, category, search, sort = 'created_at', order = 'DESC',
      featured, best_seller, min_price, max_price, all = 'false'
    } = req.query;

    const where = {};
    if (all !== 'true') where.is_active = true;
    if (category) where['$category.slug$'] = category;
    if (featured !== undefined) where.is_featured = featured === 'true';
    if (best_seller !== undefined) where.is_best_seller = best_seller === 'true';
    if (search) where.name = { [Op.like]: `%${search}%` };
    if (min_price || max_price) {
      where.price = {};
      if (min_price) where.price[Op.gte] = parseFloat(min_price);
      if (max_price) where.price[Op.lte] = parseFloat(max_price);
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows: products } = await Product.findAndCountAll({
      where,
      include: [
        { model: Category, as: 'category', attributes: ['id', 'name', 'slug'] },
        { model: ProductImage, as: 'images', attributes: ['image_url', 'alt_text', 'is_primary'] },
      ],
      order: [[sort, order.toUpperCase()]],
      limit: parseInt(limit),
      offset,
      distinct: true,
    });

    res.json({
      success: true,
      data: products,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Get single product by slug
// @route   GET /api/products/:slug
// @access  Public
const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { slug: req.params.slug, is_active: true },
      include: [
        { model: Category, as: 'category', attributes: ['id', 'name', 'slug'] },
        { model: ProductImage, as: 'images', order: [['sort_order', 'ASC']] },
      ],
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Get related products
    const related = await Product.findAll({
      where: { category_id: product.category_id, id: { [Op.ne]: product.id }, is_active: true },
      include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'slug'] }],
      limit: 4,
      order: [['created_at', 'DESC']],
    });

    res.json({ success: true, data: product, related });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Create product
// @route   POST /api/admin/products
// @access  Private
const createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      thumbnail: req.file ? `/uploads/${req.file.filename}` : null,
      benefits: req.body.benefits ? JSON.parse(req.body.benefits) : null,
      nutrition_facts: req.body.nutrition_facts ? JSON.parse(req.body.nutrition_facts) : null,
    };

    const product = await Product.create(productData);
    res.status(201).json({ success: true, data: product, message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/admin/products/:id
// @access  Private
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const updates = { ...req.body };
    if (req.file) updates.thumbnail = `/uploads/${req.file.filename}`;
    if (updates.benefits && typeof updates.benefits === 'string') updates.benefits = JSON.parse(updates.benefits);
    if (updates.nutrition_facts && typeof updates.nutrition_facts === 'string') updates.nutrition_facts = JSON.parse(updates.nutrition_facts);

    await product.update(updates);
    res.json({ success: true, data: product, message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    await product.destroy();
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Upload product image
// @route   POST /api/admin/products/:id/images
// @access  Private
const uploadProductImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No image provided' });

    const { ProductImage } = require('../models');
    const { alt_text, is_primary, sort_order } = req.body;

    const image = await ProductImage.create({
      product_id: req.params.id,
      image_url: `/uploads/${req.file.filename}`,
      alt_text,
      is_primary: is_primary === 'true',
      sort_order: parseInt(sort_order) || 0,
    });

    res.status(201).json({ success: true, data: image, message: 'Image uploaded successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Get single product by ID (Admin)
// @route   GET /api/admin/products/:id
// @access  Private
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category, as: 'category', attributes: ['id', 'name', 'slug'] }
      ]
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = { getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct, uploadProductImage, getProductById };
