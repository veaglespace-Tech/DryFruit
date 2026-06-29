const { Banner, Testimonial, FAQ, Contact, Setting } = require('../models');

// =========== BANNERS ===========
const getBanners = async (req, res) => {
  try {
    const where = { is_active: true };
    if (req.query.position) where.position = req.query.position;
    const banners = await Banner.findAll({ where, order: [['sort_order', 'ASC']] });
    res.json({ success: true, data: banners });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
const createBanner = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = `/uploads/${req.file.filename}`;
    const banner = await Banner.create(data);
    res.status(201).json({ success: true, data: banner });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);
    if (!banner) return res.status(404).json({ success: false, message: 'Banner not found' });
    const updates = { ...req.body };
    if (req.file) updates.image = `/uploads/${req.file.filename}`;
    await banner.update(updates);
    res.json({ success: true, data: banner });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);
    if (!banner) return res.status(404).json({ success: false, message: 'Banner not found' });
    await banner.destroy();
    res.json({ success: true, message: 'Banner deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

// =========== TESTIMONIALS ===========
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      where: { is_active: true },
      order: [['sort_order', 'ASC']],
    });
    res.json({ success: true, data: testimonials });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
const createTestimonial = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.avatar = `/uploads/${req.file.filename}`;
    const t = await Testimonial.create(data);
    res.status(201).json({ success: true, data: t });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
const updateTestimonial = async (req, res) => {
  try {
    const t = await Testimonial.findByPk(req.params.id);
    if (!t) return res.status(404).json({ success: false, message: 'Not found' });
    const updates = { ...req.body };
    if (req.file) updates.avatar = `/uploads/${req.file.filename}`;
    await t.update(updates);
    res.json({ success: true, data: t });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
const deleteTestimonial = async (req, res) => {
  try {
    const t = await Testimonial.findByPk(req.params.id);
    if (!t) return res.status(404).json({ success: false, message: 'Not found' });
    await t.destroy();
    res.json({ success: true, message: 'Deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

// =========== FAQs ===========
const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.findAll({ where: { is_active: true }, order: [['sort_order', 'ASC']] });
    res.json({ success: true, data: faqs });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
const createFAQ = async (req, res) => {
  try {
    const faq = await FAQ.create(req.body);
    res.status(201).json({ success: true, data: faq });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
const updateFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByPk(req.params.id);
    if (!faq) return res.status(404).json({ success: false, message: 'Not found' });
    await faq.update(req.body);
    res.json({ success: true, data: faq });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
const deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByPk(req.params.id);
    if (!faq) return res.status(404).json({ success: false, message: 'Not found' });
    await faq.destroy();
    res.json({ success: true, message: 'Deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

// =========== CONTACTS ===========
const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const contact = await Contact.create({
      name, email, phone, subject, message,
      ip_address: req.ip,
    });
    res.status(201).json({ success: true, message: 'Your message has been received. We will get back to you soon!' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
const getContacts = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const where = {};
    if (status) where.status = status;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const { count, rows } = await Contact.findAndCountAll({ where, order: [['created_at', 'DESC']], limit: parseInt(limit), offset });
    res.json({ success: true, data: rows, pagination: { total: count, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(count / parseInt(limit)) } });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
const updateContactStatus = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Not found' });
    await contact.update({ status: req.body.status, admin_notes: req.body.admin_notes });
    res.json({ success: true, data: contact });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

// =========== SETTINGS ===========
const getSettings = async (req, res) => {
  try {
    const settings = await Setting.findAll();
    const settingsMap = {};
    settings.forEach(s => { settingsMap[s.key] = s.value; });
    res.json({ success: true, data: settingsMap });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};
const updateSettings = async (req, res) => {
  try {
    const updates = req.body; // { key: value, ... }
    for (const [key, value] of Object.entries(updates)) {
      await Setting.upsert({ key, value });
    }
    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

module.exports = {
  getBanners, createBanner, updateBanner, deleteBanner,
  getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  getFAQs, createFAQ, updateFAQ, deleteFAQ,
  submitContact, getContacts, updateContactStatus,
  getSettings, updateSettings,
};
