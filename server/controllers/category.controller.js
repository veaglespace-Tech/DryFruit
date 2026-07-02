const { prisma } = require('../config/db');
const asyncHandler = require('../middleware/async.middleware');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const { active } = req.query;
  const where = {};
  if (active !== undefined) {
    where.is_active = active === 'true';
  }

  const categories = await prisma.category.findMany({
    where,
    orderBy: [
      { sort_order: 'asc' },
      { name: 'asc' },
    ],
  });

  res.json({ success: true, data: categories });
});

// @desc    Get single category
// @route   GET /api/categories/:slug
// @access  Public
const getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await prisma.category.findUnique({
    where: { slug: req.params.slug },
    include: {
      products: {
        where: { is_active: true },
      },
    },
  });

  if (!category) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }

  res.json({ success: true, data: category });
});

// @desc    Create category
// @route   POST /api/admin/categories
// @access  Private
const createCategory = asyncHandler(async (req, res) => {
  const { name, slug, description, sort_order, is_active } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const sortOrderInt = sort_order !== undefined ? parseInt(sort_order) : 0;
  const isActiveBool = is_active === undefined ? true : (is_active === 'true' || is_active === true);

  try {
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        image,
        sort_order: sortOrderInt,
        is_active: isActiveBool,
      },
    });

    res.status(201).json({ success: true, data: category, message: 'Category created successfully' });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ success: false, message: 'Category slug already exists' });
    }
    throw error;
  }
});

// @desc    Update category
// @route   PUT /api/admin/categories/:id
// @access  Private
const updateCategory = asyncHandler(async (req, res) => {
  const categoryId = parseInt(req.params.id);
  const category = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!category) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }

  const { name, slug, description, sort_order, is_active } = req.body;
  const data = {};
  if (name !== undefined) data.name = name;
  if (slug !== undefined) data.slug = slug;
  if (description !== undefined) data.description = description;
  if (req.file) data.image = `/uploads/${req.file.filename}`;
  if (sort_order !== undefined) data.sort_order = parseInt(sort_order);
  if (is_active !== undefined) data.is_active = is_active === 'true' || is_active === true;

  try {
    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data,
    });

    res.json({ success: true, data: updatedCategory, message: 'Category updated successfully' });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ success: false, message: 'Category slug already exists' });
    }
    throw error;
  }
});

// @desc    Delete category
// @route   DELETE /api/admin/categories/:id
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {
  const categoryId = parseInt(req.params.id);
  const category = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!category) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }

  await prisma.category.delete({ where: { id: categoryId } });
  res.json({ success: true, message: 'Category deleted successfully' });
});

module.exports = { getCategories, getCategoryBySlug, createCategory, updateCategory, deleteCategory };
