const { prisma } = require('../config/db');
const asyncHandler = require('../middleware/async.middleware');

// @desc    Get all products (public, with filters)
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const {
    page = 1, limit = 12, category, search, sort = 'created_at', order = 'DESC',
    featured, best_seller, min_price, max_price,
  } = req.query;

  const where = { is_active: true };

  if (category) {
    where.category = { slug: category };
  }

  if (featured !== undefined) {
    where.is_featured = featured === 'true';
  }

  if (best_seller !== undefined) {
    where.is_best_seller = best_seller === 'true';
  }

  if (search) {
    where.name = { contains: search };
  }

  if (min_price || max_price) {
    where.price = {};
    if (min_price) where.price.gte = parseFloat(min_price);
    if (max_price) where.price.lte = parseFloat(max_price);
  }

  const offset = (parseInt(page) - 1) * parseInt(limit);

  let orderBy = { created_at: 'desc' };
  if (sort === 'price') {
    orderBy = { price: 'asc' };
  } else if (sort === '-price') {
    orderBy = { price: 'desc' };
  } else if (sort === '-rating' || sort === 'rating') {
    orderBy = { rating: 'desc' };
  } else if (sort === '-popularity' || sort === 'popularity') {
    orderBy = { review_count: 'desc' };
  } else if (sort && sort !== 'created_at') {
    orderBy = { [sort]: order.toLowerCase() === 'asc' ? 'asc' : 'desc' };
  }

  const count = await prisma.product.count({ where });
  const products = await prisma.product.findMany({
    where,
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      images: {
        select: {
          image_url: true,
          alt_text: true,
          is_primary: true,
        },
      },
    },
    orderBy,
    take: parseInt(limit),
    skip: offset,
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
});

// @desc    Get single product by slug
// @route   GET /api/products/:slug
// @access  Public
const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await prisma.product.findFirst({
    where: { slug: req.params.slug, is_active: true },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      images: {
        orderBy: { sort_order: 'asc' },
      },
    },
  });

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  // Get related products
  const related = await prisma.product.findMany({
    where: {
      category_id: product.category_id,
      id: { not: product.id },
      is_active: true,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
    take: 4,
    orderBy: { created_at: 'desc' },
  });

  res.json({ success: true, data: product, related });
});

// @desc    Create product
// @route   POST /api/admin/products
// @access  Private
const createProduct = asyncHandler(async (req, res) => {
  const {
    category_id, name, slug, description, short_description, price, original_price,
    discount_percent, weight, sku, stock, rating, review_count, benefits,
    nutrition_facts, storage_instructions, is_featured, is_best_seller, is_active,
    meta_title, meta_description,
  } = req.body;

  if (!name || !price) {
    return res.status(400).json({ success: false, message: 'Name and Price are required' });
  }

  const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;

  // Safe JSON parsing for benefits
  let parsedBenefits = null;
  if (benefits) {
    if (typeof benefits === 'string') {
      try {
        parsedBenefits = JSON.parse(benefits);
      } catch (err) {
        parsedBenefits = [benefits];
      }
    } else {
      parsedBenefits = benefits;
    }
  }

  // Safe JSON parsing for nutrition_facts
  let parsedNutrition = null;
  if (nutrition_facts) {
    if (typeof nutrition_facts === 'string') {
      try {
        parsedNutrition = JSON.parse(nutrition_facts);
      } catch (err) {
        parsedNutrition = null;
      }
    } else {
      parsedNutrition = nutrition_facts;
    }
  }

  // Auto-generate slug if not provided or empty
  let productSlug = slug ? slug.trim() : '';
  if (!productSlug && name) {
    productSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  if (!productSlug) {
    productSlug = `product-${Date.now()}`;
  }

  // Ensure unique SKU
  const productSku = sku && sku.trim() !== '' ? sku.trim() : `SKU-${Date.now()}`;

  const numPrice = parseFloat(price);
  const numOriginalPrice = original_price ? parseFloat(original_price) : null;
  let calcDiscount = 0;
  if (numOriginalPrice && numOriginalPrice > numPrice) {
    calcDiscount = Math.round(((numOriginalPrice - numPrice) / numOriginalPrice) * 100);
  } else if (discount_percent) {
    calcDiscount = parseInt(discount_percent) || 0;
  }

  const product = await prisma.product.create({
    data: {
      category_id: category_id ? parseInt(category_id) : null,
      name,
      slug: productSlug,
      description: description || null,
      short_description: short_description || null,
      price: numPrice,
      original_price: numOriginalPrice,
      discount_percent: calcDiscount,
      weight: weight || null,
      sku: productSku,
      stock: stock ? parseInt(stock) : 0,
      rating: rating ? parseFloat(rating) : 5.0,
      review_count: review_count ? parseInt(review_count) : 0,
      thumbnail,
      benefits: parsedBenefits,
      nutrition_facts: parsedNutrition,
      storage_instructions: storage_instructions || null,
      is_featured: is_featured === 'true' || is_featured === true,
      is_best_seller: is_best_seller === 'true' || is_best_seller === true,
      is_active: is_active === undefined ? true : (is_active === 'true' || is_active === true),
      meta_title: meta_title || null,
      meta_description: meta_description || null,
    },
  });

  res.status(201).json({ success: true, data: product, message: 'Product created successfully' });
});

// @desc    Update product
// @route   PUT /api/admin/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
  const productId = parseInt(req.params.id);
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

  const updates = { ...req.body };
  const data = {};

  if (updates.category_id !== undefined) data.category_id = updates.category_id ? parseInt(updates.category_id) : null;
  if (updates.name !== undefined) data.name = updates.name;
  if (updates.slug !== undefined) data.slug = updates.slug;
  if (updates.description !== undefined) data.description = updates.description || null;
  if (updates.short_description !== undefined) data.short_description = updates.short_description || null;
  if (updates.price !== undefined) data.price = parseFloat(updates.price);
  if (updates.original_price !== undefined) data.original_price = updates.original_price ? parseFloat(updates.original_price) : null;
  
  // Auto calculate discount percent if price or original_price changed
  const effectivePrice = data.price !== undefined ? data.price : Number(product.price);
  const effectiveOriginal = data.original_price !== undefined ? data.original_price : (product.original_price ? Number(product.original_price) : null);
  if (effectiveOriginal && effectiveOriginal > effectivePrice) {
    data.discount_percent = Math.round(((effectiveOriginal - effectivePrice) / effectiveOriginal) * 100);
  } else if (updates.discount_percent !== undefined) {
    data.discount_percent = parseInt(updates.discount_percent) || 0;
  }

  if (updates.weight !== undefined) data.weight = updates.weight || null;
  if (updates.sku !== undefined) data.sku = updates.sku || null;
  if (updates.stock !== undefined) data.stock = parseInt(updates.stock);
  if (updates.rating !== undefined) data.rating = parseFloat(updates.rating);
  if (updates.review_count !== undefined) data.review_count = parseInt(updates.review_count);
  if (req.file) data.thumbnail = `/uploads/${req.file.filename}`;
  
  if (updates.benefits !== undefined) {
    if (typeof updates.benefits === 'string') {
      try { data.benefits = JSON.parse(updates.benefits); } catch { data.benefits = [updates.benefits]; }
    } else {
      data.benefits = updates.benefits;
    }
  }

  if (updates.nutrition_facts !== undefined) {
    if (typeof updates.nutrition_facts === 'string') {
      try { data.nutrition_facts = JSON.parse(updates.nutrition_facts); } catch { data.nutrition_facts = null; }
    } else {
      data.nutrition_facts = updates.nutrition_facts;
    }
  }

  if (updates.storage_instructions !== undefined) data.storage_instructions = updates.storage_instructions || null;
  if (updates.is_featured !== undefined) data.is_featured = updates.is_featured === 'true' || updates.is_featured === true;
  if (updates.is_best_seller !== undefined) data.is_best_seller = updates.is_best_seller === 'true' || updates.is_best_seller === true;
  if (updates.is_active !== undefined) data.is_active = updates.is_active === 'true' || updates.is_active === true;
  if (updates.meta_title !== undefined) data.meta_title = updates.meta_title || null;
  if (updates.meta_description !== undefined) data.meta_description = updates.meta_description || null;

  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data,
  });

  res.json({ success: true, data: updatedProduct, message: 'Product updated successfully' });
});

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const productId = parseInt(req.params.id);
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

  await prisma.product.delete({ where: { id: productId } });
  res.json({ success: true, message: 'Product deleted successfully' });
});

// @desc    Upload product image
// @route   POST /api/admin/products/:id/images
// @access  Private
const uploadProductImage = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No image provided' });

  const productId = parseInt(req.params.id);
  const { alt_text, is_primary, sort_order } = req.body;

  const image = await prisma.productImage.create({
    data: {
      product_id: productId,
      image_url: `/uploads/${req.file.filename}`,
      alt_text,
      is_primary: is_primary === 'true' || is_primary === true,
      sort_order: parseInt(sort_order) || 0,
    },
  });

  res.status(201).json({ success: true, data: image, message: 'Image uploaded successfully' });
});

module.exports = { getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct, uploadProductImage };
