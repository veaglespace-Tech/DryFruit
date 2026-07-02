const express = require('express');
const router = express.Router();
const { login, getMe, updatePassword } = require('../controllers/auth.controller');
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/user.controller');
const { protect, protectUser } = require('../middleware/auth.middleware');

// Admin Auth
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/password', protect, updatePassword);

// User Auth
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.get('/user/me', protectUser, getUserProfile);
router.put('/user/me', protectUser, updateUserProfile);

module.exports = router;

