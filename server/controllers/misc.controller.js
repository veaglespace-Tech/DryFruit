const { prisma } = require('../config/db');
const asyncHandler = require('../middleware/async.middleware');
const sendEmail = require('../utils/sendEmail');

// =========== BANNERS ===========
const getBanners = asyncHandler(async (req, res) => {
  const where = { is_active: true };
  if (req.query.position) where.position = req.query.position;
  const banners = await prisma.banner.findMany({
    where,
    orderBy: { sort_order: 'asc' },
  });
  res.json({ success: true, data: banners });
});

const createBanner = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.image = `/uploads/${req.file.filename}`;
  if (data.sort_order !== undefined) data.sort_order = parseInt(data.sort_order);
  if (data.is_active !== undefined) data.is_active = data.is_active === 'true' || data.is_active === true;
  
  const banner = await prisma.banner.create({ data });
  res.status(201).json({ success: true, data: banner });
});

const updateBanner = asyncHandler(async (req, res) => {
  const bannerId = parseInt(req.params.id);
  const banner = await prisma.banner.findUnique({ where: { id: bannerId } });
  if (!banner) return res.status(404).json({ success: false, message: 'Banner not found' });
  
  const updates = { ...req.body };
  if (req.file) updates.image = `/uploads/${req.file.filename}`;
  if (updates.sort_order !== undefined) updates.sort_order = parseInt(updates.sort_order);
  if (updates.is_active !== undefined) updates.is_active = updates.is_active === 'true' || updates.is_active === true;
  
  const updatedBanner = await prisma.banner.update({
    where: { id: bannerId },
    data: updates,
  });
  res.json({ success: true, data: updatedBanner });
});

const deleteBanner = asyncHandler(async (req, res) => {
  const bannerId = parseInt(req.params.id);
  const banner = await prisma.banner.findUnique({ where: { id: bannerId } });
  if (!banner) return res.status(404).json({ success: false, message: 'Banner not found' });
  
  await prisma.banner.delete({ where: { id: bannerId } });
  res.json({ success: true, message: 'Banner deleted' });
});

// =========== TESTIMONIALS ===========
const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await prisma.testimonial.findMany({
    where: { is_active: true },
    orderBy: { sort_order: 'asc' },
  });
  res.json({ success: true, data: testimonials });
});

const createTestimonial = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.avatar = `/uploads/${req.file.filename}`;
  if (data.rating !== undefined) data.rating = parseInt(data.rating);
  if (data.sort_order !== undefined) data.sort_order = parseInt(data.sort_order);
  if (data.is_active !== undefined) data.is_active = data.is_active === 'true' || data.is_active === true;

  const t = await prisma.testimonial.create({ data });
  res.status(201).json({ success: true, data: t });
});

const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonialId = parseInt(req.params.id);
  const t = await prisma.testimonial.findUnique({ where: { id: testimonialId } });
  if (!t) return res.status(404).json({ success: false, message: 'Not found' });
  
  const updates = { ...req.body };
  if (req.file) updates.avatar = `/uploads/${req.file.filename}`;
  if (updates.rating !== undefined) updates.rating = parseInt(updates.rating);
  if (updates.sort_order !== undefined) updates.sort_order = parseInt(updates.sort_order);
  if (updates.is_active !== undefined) updates.is_active = updates.is_active === 'true' || updates.is_active === true;

  const updated = await prisma.testimonial.update({
    where: { id: testimonialId },
    data: updates,
  });
  res.json({ success: true, data: updated });
});

const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonialId = parseInt(req.params.id);
  const t = await prisma.testimonial.findUnique({ where: { id: testimonialId } });
  if (!t) return res.status(404).json({ success: false, message: 'Not found' });
  
  await prisma.testimonial.delete({ where: { id: testimonialId } });
  res.json({ success: true, message: 'Deleted' });
});

// =========== FAQs ===========
const getFAQs = asyncHandler(async (req, res) => {
  const faqs = await prisma.fAQ.findMany({
    where: { is_active: true },
    orderBy: { sort_order: 'asc' },
  });
  res.json({ success: true, data: faqs });
});

const createFAQ = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (data.sort_order !== undefined) data.sort_order = parseInt(data.sort_order);
  if (data.is_active !== undefined) data.is_active = data.is_active === 'true' || data.is_active === true;

  const faq = await prisma.fAQ.create({ data });
  res.status(201).json({ success: true, data: faq });
});

const updateFAQ = asyncHandler(async (req, res) => {
  const faqId = parseInt(req.params.id);
  const faq = await prisma.fAQ.findUnique({ where: { id: faqId } });
  if (!faq) return res.status(404).json({ success: false, message: 'Not found' });
  
  const data = { ...req.body };
  if (data.sort_order !== undefined) data.sort_order = parseInt(data.sort_order);
  if (data.is_active !== undefined) data.is_active = data.is_active === 'true' || data.is_active === true;

  const updated = await prisma.fAQ.update({
    where: { id: faqId },
    data,
  });
  res.json({ success: true, data: updated });
});

const deleteFAQ = asyncHandler(async (req, res) => {
  const faqId = parseInt(req.params.id);
  const faq = await prisma.fAQ.findUnique({ where: { id: faqId } });
  if (!faq) return res.status(404).json({ success: false, message: 'Not found' });
  
  await prisma.fAQ.delete({ where: { id: faqId } });
  res.json({ success: true, message: 'Deleted' });
});

// =========== CONTACTS ===========
const submitContact = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  const contact = await prisma.contact.create({
    data: {
      name,
      email,
      phone,
      subject,
      message,
      ip_address: req.ip,
    },
  });

  // Send emails in the background (don't block the API response)
  const isOrder = (subject && subject.includes('Pre-Order')) || req.body.type === 'order';
  const targetAdminEmail = isOrder
    ? (process.env.ORDER_EMAIL || process.env.SMTP_USER || 'shreepadenterprises.tech@gmail.com')
    : (process.env.ADMIN_EMAIL || 'Info@shreepadenterprisespune.com');

  // Email to Admin / Shop Owner
  const adminSubject = isOrder ? `🚨 New Pre-Order Request from ${name}` : `📧 New Contact Inquiry from ${name}`;
  const adminHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9e9e9; border-radius: 12px; background-color: #FFFDF8;">
      <div style="background-color: #6B3E26; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h2 style="color: #ffffff; margin: 0; font-family: serif;">${isOrder ? 'New Pre-Order Alert' : 'New Web Inquiry'}</h2>
        <p style="color: #D4A95A; margin: 5px 0 0 0; font-size: 14px;">Shreepad Enterprises Administration</p>
      </div>
      <div style="padding: 20px; color: #333333; line-height: 1.6;">
        <p>Hello Admin,</p>
        <p>You have received a new ${isOrder ? 'pre-order inquiry' : 'message'} from the website.</p>
        <div style="background-color: #f7f3ed; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="margin: 0 0 10px 0; color: #3D1F0E;">Details:</h4>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${email || 'Not provided'}</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
          <p style="margin: 5px 0;"><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
        </div>
      </div>
    </div>
  `;

  sendEmail({
    to: targetAdminEmail,
    subject: adminSubject,
    html: adminHtml,
  }).catch(err => console.error('Error sending email to Admin:', err));

  // Email to User (if email is provided)
  if (email) {
    const userSubject = isOrder ? `🛒 Pre-Order Received - Shreepad Enterprises` : `🌿 Message Received - Shreepad Enterprises`;
    const userHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9e9e9; border-radius: 12px; background-color: #FFFDF8;">
        <div style="background-color: #3D1F0E; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="color: #D4A95A; margin: 0; font-family: serif;">Shreepad Enterprises</h2>
          <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 14px;">Premium Dry Fruits & Nuts</p>
        </div>
        <div style="padding: 20px; color: #333333; line-height: 1.6;">
          <p>Dear <strong>${name}</strong>,</p>
          <p>Thank you for reaching out to Shreepad Enterprises. We have received your ${isOrder ? 'pre-order inquiry' : 'message'} and are currently processing it.</p>
          <div style="background-color: #f7f3ed; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin: 0 0 10px 0; color: #6B3E26;">Your Request Details:</h4>
            <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin: 5px 0;"><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p>Our sales representative will get in touch with you shortly (usually within 24 hours) via phone or email to confirm your order details and delivery schedule.</p>
          <p>Best regards,<br><strong>Shreepad Enterprises Team</strong></p>
        </div>
      </div>
    `;

    sendEmail({
      to: email,
      subject: userSubject,
      html: userHtml,
    }).catch(err => console.error('Error sending email to User:', err));
  }

  res.status(201).json({ success: true, message: 'Your message has been received. We will get back to you soon!' });
});

const getContacts = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const where = {};
  if (status) where.status = status;
  
  const offset = (parseInt(page) - 1) * parseInt(limit);
  
  const count = await prisma.contact.count({ where });
  const rows = await prisma.contact.findMany({
    where,
    orderBy: { created_at: 'desc' },
    take: parseInt(limit),
    skip: offset,
  });
  
  res.json({
    success: true,
    data: rows,
    pagination: {
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(count / parseInt(limit)),
    },
  });
});

const updateContactStatus = asyncHandler(async (req, res) => {
  const contactId = parseInt(req.params.id);
  const contact = await prisma.contact.findUnique({ where: { id: contactId } });
  if (!contact) return res.status(404).json({ success: false, message: 'Not found' });
  
  const updated = await prisma.contact.update({
    where: { id: contactId },
    data: {
      status: req.body.status,
      admin_notes: req.body.admin_notes,
    },
  });
  res.json({ success: true, data: updated });
});

// =========== SETTINGS ===========
const getSettings = asyncHandler(async (req, res) => {
  const settings = await prisma.setting.findMany();
  const settingsMap = {};
  settings.forEach(s => { settingsMap[s.key] = s.value; });
  res.json({ success: true, data: settingsMap });
});

const updateSettings = asyncHandler(async (req, res) => {
  const updates = req.body; // { key: value, ... }
  for (const [key, value] of Object.entries(updates)) {
    await prisma.setting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) },
    });
  }
  res.json({ success: true, message: 'Settings updated successfully' });
});

module.exports = {
  getBanners, createBanner, updateBanner, deleteBanner,
  getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  getFAQs, createFAQ, updateFAQ, deleteFAQ,
  submitContact, getContacts, updateContactStatus,
  getSettings, updateSettings,
};
