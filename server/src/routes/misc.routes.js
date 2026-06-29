const express = require('express');
const router = express.Router();
const {
  getBanners, createBanner, updateBanner, deleteBanner,
  getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  getFAQs, createFAQ, updateFAQ, deleteFAQ,
  submitContact, getContacts, updateContactStatus,
  getSettings, updateSettings,
} = require('../controllers/misc.controller');
const { protect } = require('../middleware/auth.middleware');
const { upload } = require('../middleware/upload.middleware');

// Banners
router.get('/banners', getBanners);
router.post('/banners', protect, upload.single('image'), createBanner);
router.put('/banners/:id', protect, upload.single('image'), updateBanner);
router.delete('/banners/:id', protect, deleteBanner);

// Testimonials
router.get('/testimonials', getTestimonials);
router.post('/testimonials', protect, upload.single('avatar'), createTestimonial);
router.put('/testimonials/:id', protect, upload.single('avatar'), updateTestimonial);
router.delete('/testimonials/:id', protect, deleteTestimonial);

// FAQs
router.get('/faqs', getFAQs);
router.post('/faqs', protect, createFAQ);
router.put('/faqs/:id', protect, updateFAQ);
router.delete('/faqs/:id', protect, deleteFAQ);

// Contacts
router.post('/contact', submitContact);
router.get('/contacts', protect, getContacts);
router.put('/contacts/:id', protect, updateContactStatus);

// Settings
router.get('/settings', getSettings);
router.put('/settings', protect, updateSettings);

module.exports = router;
