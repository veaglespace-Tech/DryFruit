require('dotenv').config();
const { connectDB, prisma, hashPassword } = require('../config/db');

const seed = async () => {
  await connectDB();

  console.log('🌱 Starting database seed...');

  // Create Admin
  const adminExists = await prisma.admin.findUnique({
    where: { email: 'shreepadenterprises.tech@gmail.com' },
  });
  if (!adminExists) {
    const hashedPassword = await hashPassword('Admin@123');
    await prisma.admin.create({
      data: {
        name: 'Super Admin',
        email: 'shreepadenterprises.tech@gmail.com',
        password: hashedPassword,
        role: 'super_admin',
      },
    });
  }
  console.log('✅ Admin created: shreepadenterprises.tech@gmail.com / Admin@123');

  // Create Categories
  const categories = [
    { name: 'Almonds', slug: 'almonds', description: 'Premium California and Indian almonds, packed with nutrients', sort_order: 1 },
    { name: 'Cashews', slug: 'cashews', description: 'Creamy, buttery cashews from the finest orchards', sort_order: 2 },
    { name: 'Pistachios', slug: 'pistachios', description: 'Vibrant green pistachios, naturally shelled and roasted', sort_order: 3 },
    { name: 'Walnuts', slug: 'walnuts', description: 'Brain-healthy walnuts, rich in Omega-3 fatty acids', sort_order: 4 },
    { name: 'Dates', slug: 'dates', description: 'Premium Medjool and Ajwa dates, nature\'s candy', sort_order: 5 },
    { name: 'Raisins', slug: 'raisins', description: 'Golden and black raisins, naturally sun-dried', sort_order: 6 },
    { name: 'Mixed Nuts', slug: 'mixed-nuts', description: 'Curated premium nut blends for every occasion', sort_order: 7 },
    { name: 'Dried Berries', slug: 'dried-berries', description: 'Antioxidant-rich dried cranberries, blueberries, and goji berries', sort_order: 8 },
  ];

  const createdCategories = {};
  for (const cat of categories) {
    let c = await prisma.category.findUnique({ where: { slug: cat.slug } });
    if (!c) {
      c = await prisma.category.create({ data: cat });
    }
    createdCategories[cat.slug] = c.id;
  }
  console.log('✅ Categories created (No products seeded - admin manages products)');

  // Create FAQs
  const faqs = [
    { question: 'Are your dry fruits 100% natural?', answer: 'Yes! All our dry fruits are 100% natural with no artificial preservatives, colors, or flavors. We source directly from farms and orchards that follow natural farming practices.', sort_order: 1 },
    { question: 'How should I store dry fruits?', answer: 'Most dry fruits should be stored in airtight containers at room temperature. For longer shelf life, refrigeration is recommended. Specific storage instructions are provided with each product.', sort_order: 2 },
    { question: 'What is the shelf life of your products?', answer: 'Our dry fruits typically have a shelf life of 6-12 months when stored properly. Each product package is labeled with the best before date. We recommend consuming within 3 months of opening for best quality.', sort_order: 3 },
    { question: 'Do you offer gift packaging?', answer: 'Yes! We offer beautiful premium gift packaging for all our products. Perfect for festivals, corporate gifts, and special occasions. Contact us on WhatsApp for custom gift hampers.', sort_order: 4 },
    { question: 'How do I place a bulk order?', answer: 'For bulk orders (10kg+), please contact us via WhatsApp or email. We offer special pricing for bulk purchases and corporate orders. Our team will get back to you within 24 hours.', sort_order: 5 },
    { question: 'Do you deliver across India?', answer: 'Yes, we deliver pan-India through trusted logistics partners. Standard delivery takes 3-5 business days. Expedited shipping options are available at checkout.', sort_order: 6 },
    { question: 'What payment methods do you accept?', answer: 'We accept all major payment methods including UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery (in select areas). All online transactions are 100% secure.', sort_order: 7 },
    { question: 'Are your products suitable for people with diabetes?', answer: 'Many of our nuts like almonds, walnuts, and pistachios are suitable for diabetics due to their low glycemic index. However, we recommend consulting your doctor for specific dietary advice.', sort_order: 8 },
  ];

  for (const faq of faqs) {
    const faqExists = await prisma.fAQ.findFirst({ where: { question: faq.question } });
    if (!faqExists) {
      await prisma.fAQ.create({ data: faq });
    }
  }
  console.log('✅ FAQs created');

  // Create Testimonials
  const testimonials = [
    { name: 'Priya Sharma', designation: 'Health & Wellness Coach', location: 'Mumbai', review: 'Shreepad Enterprises has completely transformed my snacking habits! The quality of their almonds and cashews is simply unmatched. I can taste the freshness in every bite. Highly recommend to everyone!', rating: 5, sort_order: 1 },
    { name: 'Rajesh Mehta', designation: 'Fitness Entrepreneur', location: 'Pune', review: 'As a fitness enthusiast, I am very particular about the quality of nuts I consume. Shreepad Enterprises consistently delivers the best quality. The Kashmiri walnuts are absolutely premium!', rating: 5, sort_order: 2 },
    { name: 'Anita Desai', designation: 'Homemaker & Food Blogger', location: 'Ahmedabad', review: 'The Medjool dates from Shreepad Enterprises are absolutely divine! So plump, sweet, and fresh. I have been ordering for 6 months and the quality never disappoints. Perfect for my whole family!', rating: 5, sort_order: 3 },
  ];

  for (const t of testimonials) {
    const testExists = await prisma.testimonial.findFirst({ where: { name: t.name } });
    if (!testExists) {
      await prisma.testimonial.create({ data: t });
    }
  }
  console.log('✅ Testimonials created');

  // Create Settings
  const settings = [
    { key: 'site_name', value: 'Shreepad Enterprises', label: 'Site Name' },
    { key: 'site_tagline', value: 'Nature\'s Premium Dry Fruits & Nuts', label: 'Site Tagline' },
    { key: 'phone', value: '+91 98609 41171', label: 'Phone Number' },
    { key: 'whatsapp', value: '+91 77097 47803', label: 'WhatsApp Number' },
    { key: 'email', value: 'shreepadenterprises.tech@gmail.com', label: 'Email Address' },
    { key: 'address', value: '123, Green Valley Road, Pune, Maharashtra 411001', label: 'Address' },
    { key: 'map_embed', value: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.654!2d73.856!3d18.520!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMxJzEzLjMiTiA3M8KwNTEnMjEuNiJF!5e0!3m2!1sen!2sin!4v1234567890', label: 'Google Maps Embed URL' },
    { key: 'instagram', value: 'https://instagram.com/shreepadenterprises', label: 'Instagram URL' },
    { key: 'facebook', value: 'https://facebook.com/shreepadenterprises', label: 'Facebook URL' },
    { key: 'twitter', value: 'https://twitter.com/shreepadenterprises', label: 'Twitter URL' },
    { key: 'announcement', value: '🌿 Free delivery on orders above ₹999 | Use code FIRST10 for 10% off your first order!', label: 'Announcement Bar Text' },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value, label: s.label },
      create: { key: s.key, value: s.value, label: s.label },
    });
  }
  console.log('✅ Settings seeded');

  // Seed Blogs
  const blogs = [
    {
      title: "Top 5 Health Benefits of Kashmiri Walnuts",
      slug: "top-5-health-benefits-of-kashmiri-walnuts",
      excerpt: "Discover why Kashmir walnuts are regarded as brain superfoods, packed with rich Omega-3 fatty acids and heart-protective anti-oxidants.",
      content: "Kashmiri walnuts are known world over for their exceptional taste, crunch, and nutritional density. Rich in alpha-linolenic acid (ALA), an essential omega-3 fatty acid, eating a handful of raw walnuts daily promotes cardiovascular health, supports cognitive focus, and improves gut microflora.",
      image: "/images/categories/walnuts.png",
      category: "Health & Nutrition",
      author: "Shreepad Nutritionist",
      read_time: "4 min read",
      is_published: true,
    },
    {
      title: "How to Store Your Dry Fruits to Maintain Crunch",
      slug: "how-to-store-your-dry-fruits-to-maintain-crunch",
      excerpt: "Crunchiness matters. Learn the best moisture-proofing storage secrets to preserve raw nuts quality for more than 12 months.",
      content: "Moisture and warmth are the primary enemies of nut freshness. Always store raw almonds, cashews, and walnuts in glass airtight containers inside a cool pantry or refrigerator. For long term storage exceeding 6 months, freezing nuts in sealed freezer bags preserves their natural essential oils completely.",
      image: "/images/categories/cashews.png",
      category: "Storage & Care",
      author: "Shreepad Team",
      read_time: "3 min read",
      is_published: true,
    },
    {
      title: "Dates: The Perfect Natural Alternative to Sugar",
      slug: "dates-the-perfect-natural-alternative-to-sugar",
      excerpt: "Break your sweet tooth addiction. Find out how Medjool dates satisfy dessert cravings naturally while providing high potassium and iron.",
      content: "Medjool dates are nature's candy. Unlike refined white sugar which causes sharp blood insulin spikes, dates provide complex carbohydrates accompanied by dietary fiber, potassium, magnesium, and vitamin B6.",
      image: "/images/categories/dates.png",
      category: "Recipes & Food",
      author: "Dr. Ananya Sharma",
      read_time: "5 min read",
      is_published: true,
    },
  ];

  for (const b of blogs) {
    const blogExists = await prisma.blog.findUnique({ where: { slug: b.slug } });
    if (!blogExists) {
      await prisma.blog.create({ data: b });
    }
  }
  console.log('✅ Blogs seeded');

  console.log('\n🎉 Database seeded successfully!');
  console.log('Admin Login: shreepadenterprises.tech@gmail.com / Admin@123');
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
