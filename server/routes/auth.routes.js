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
const { validateBody } = require('../middleware/validate.middleware');
const { registrationFormSchema, profileUpdateSchema } = require('../utils/validation');

router.post('/user/register', validateBody(registrationFormSchema), registerUser);
router.post('/user/login', loginUser);
router.get('/user/me', protectUser, getUserProfile);
router.put('/user/me', protectUser, validateBody(profileUpdateSchema), updateUserProfile);

module.exports = router;

