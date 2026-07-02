const jwt = require('jsonwebtoken');
const { prisma, matchPassword, hashPassword } = require('../config/db');
const asyncHandler = require('../middleware/async.middleware');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });

// @desc    Admin Login
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin || !admin.is_active) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const isMatch = await matchPassword(password, admin.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = generateToken(admin.id);

  res.json({
    success: true,
    token,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
});

// @desc    Get logged in admin
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, admin: req.admin });
});

// @desc    Update password
// @route   PUT /api/auth/password
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const admin = await prisma.admin.findUnique({ where: { id: req.admin.id } });

  if (!admin) {
    return res.status(404).json({ success: false, message: 'Admin not found' });
  }

  const isMatch = await matchPassword(currentPassword, admin.password);
  if (!isMatch) {
    return res.status(400).json({ success: false, message: 'Current password is incorrect' });
  }

  const hashedPassword = await hashPassword(newPassword);
  await prisma.admin.update({
    where: { id: admin.id },
    data: { password: hashedPassword },
  });

  res.json({ success: true, message: 'Password updated successfully' });
});

module.exports = { login, getMe, updatePassword };
