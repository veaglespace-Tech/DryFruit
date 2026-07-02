const jwt = require('jsonwebtoken');
const { prisma, hashPassword, matchPassword } = require('../config/db');
const asyncHandler = require('../middleware/async.middleware');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });

// @desc    Register a new user
// @route   POST /api/auth/user/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    return res.status(400).json({ success: false, message: 'User already exists with this email' });
  }

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    },
  });

  const token = generateToken(user.id);

  res.status(201).json({
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    },
    message: 'Registration successful 🌿',
  });
});

// @desc    User Login
// @route   POST /api/auth/user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.is_active) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const isMatch = await matchPassword(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const token = generateToken(user.id);

  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    },
  });
});

// @desc    Get logged in user profile
// @route   GET /api/auth/user/me
// @access  Private (User)
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      is_active: true,
      created_at: true,
      updated_at: true,
    },
  });

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.json({ success: true, user });
});

// @desc    Update user profile
// @route   PUT /api/auth/user/me
// @access  Private (User)
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const { name, phone, address, password } = req.body;
  const data = {};
  if (name) data.name = name;
  if (phone) data.phone = phone;
  if (address) data.address = address;
  if (password) data.password = await hashPassword(password);

  const updatedUser = await prisma.user.update({
    where: { id: req.user.id },
    data,
  });

  res.json({
    success: true,
    user: {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
    },
    message: 'Profile updated successfully 🌿',
  });
});

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };
