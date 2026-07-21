const { prisma } = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const { category, search, page = 1, limit = 10, all } = req.query;

  const where = {};
  if (all !== 'true') {
    where.is_published = true;
  }
  if (category) {
    where.category = category;
  }
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { excerpt: { contains: search } },
      { content: { contains: search } },
    ];
  }

  const offset = (parseInt(page) - 1) * parseInt(limit);
  const total = await prisma.blog.count({ where });

  const blogs = await prisma.blog.findMany({
    where,
    orderBy: { created_at: 'desc' },
    take: parseInt(limit),
    skip: offset,
  });

  res.json({
    success: true,
    data: blogs,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
    },
  });
});

// @desc    Get single blog by slug or ID
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  let blog = null;
  if (!isNaN(slug)) {
    blog = await prisma.blog.findUnique({ where: { id: parseInt(slug) } });
  } else {
    blog = await prisma.blog.findUnique({ where: { slug } });
  }

  if (!blog) {
    return res.status(404).json({ success: false, message: 'Blog post not found' });
  }

  res.json({ success: true, data: blog });
});

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  const { title, excerpt, content, image, category, author, read_time, is_published } = req.body;

  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Title and content are required' });
  }

  // Create slug from title
  let slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  // Ensure unique slug
  const existing = await prisma.blog.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now().toString().slice(-4)}`;
  }

  const blog = await prisma.blog.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      image: image || '/images/categories/walnuts.png',
      category: category || 'Health & Nutrition',
      author: author || 'Shreepad Team',
      read_time: read_time || '4 min read',
      is_published: is_published === undefined ? true : Boolean(is_published),
    },
  });

  res.status(201).json({ success: true, data: blog });
});

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const blogId = parseInt(req.params.id);

  const blog = await prisma.blog.findUnique({ where: { id: blogId } });
  if (!blog) {
    return res.status(404).json({ success: false, message: 'Blog post not found' });
  }

  const { title, excerpt, content, image, category, author, read_time, is_published } = req.body;

  const data = {};
  if (title) {
    data.title = title;
    data.slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  if (excerpt !== undefined) data.excerpt = excerpt;
  if (content !== undefined) data.content = content;
  if (image !== undefined) data.image = image;
  if (category !== undefined) data.category = category;
  if (author !== undefined) data.author = author;
  if (read_time !== undefined) data.read_time = read_time;
  if (is_published !== undefined) data.is_published = Boolean(is_published);

  const updatedBlog = await prisma.blog.update({
    where: { id: blogId },
    data,
  });

  res.json({ success: true, data: updatedBlog });
});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blogId = parseInt(req.params.id);

  const blog = await prisma.blog.findUnique({ where: { id: blogId } });
  if (!blog) {
    return res.status(404).json({ success: false, message: 'Blog post not found' });
  }

  await prisma.blog.delete({ where: { id: blogId } });

  res.json({ success: true, message: 'Blog post deleted successfully' });
});

module.exports = {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
};
