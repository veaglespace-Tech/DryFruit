const express = require('express');
const router = express.Router();
const {
  getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct, uploadProductImage, getProductById
} = require('../controllers/product.controller');
const { protect } = require('../middleware/auth.middleware');
const { upload } = require('../middleware/upload.middleware');

// Public
router.get('/', getProducts);
router.get('/:slug', getProductBySlug);

// Admin Protected
router.get('/admin-detail/:id', protect, getProductById);
router.post('/', protect, upload.single('thumbnail'), createProduct);
router.put('/:id', protect, upload.single('thumbnail'), updateProduct);
router.delete('/:id', protect, deleteProduct);
router.post('/:id/images', protect, upload.single('image'), uploadProductImage);

module.exports = router;
