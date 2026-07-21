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
  console.log('✅ Categories created');

  // Create Products
  const products = [
    {
      category_id: createdCategories['almonds'],
      name: 'Premium California Almonds', slug: 'premium-california-almonds',
      short_description: 'Hand-selected California almonds, naturally rich and nutrient-dense',
      description: 'Our premium California almonds are sourced directly from sun-drenched orchards in the San Joaquin Valley. Each almond is carefully selected, cleaned, and packed to preserve its natural goodness. Rich in Vitamin E, magnesium, and healthy fats.',
      price: 599, original_price: 799, discount_percent: 25, weight: '500g',
      sku: 'ALM-CA-500', stock: 100, rating: 4.8, review_count: 247,
      is_featured: true, is_best_seller: true,
      benefits: ['Rich in Vitamin E', 'High in Protein', 'Boosts Heart Health', 'Great for Skin'],
      nutrition_facts: { calories: 579, protein: '21g', fat: '50g', carbs: '22g', fiber: '12g', sugar: '4g' },
      storage_instructions: 'Store in a cool, dry place. Refrigerate for extended shelf life.',
      meta_title: 'Buy Premium California Almonds Online | Shreepad Enterprises',
      meta_description: 'Premium hand-selected California almonds. Rich in Vitamin E, magnesium. Order online and get fresh delivery to your doorstep.',
    },
    {
      category_id: createdCategories['cashews'],
      name: 'Whole Cashews W240 Grade', slug: 'whole-cashews-w240',
      short_description: 'Premium W240 grade whole cashews - creamy, large, and perfectly roasted',
      description: 'Our W240 grade cashews are among the finest in the world. Sourced from the Konkan coast of India, these large whole cashews have a buttery, creamy flavor that is simply unmatched. Perfect for snacking, cooking, or gifting.',
      price: 799, original_price: 999, discount_percent: 20, weight: '500g',
      sku: 'CSH-W240-500', stock: 85, rating: 4.9, review_count: 189,
      is_featured: true, is_best_seller: true,
      benefits: ['Rich in Zinc', 'Boosts Immunity', 'Heart Healthy', 'High in Iron'],
      nutrition_facts: { calories: 553, protein: '18g', fat: '44g', carbs: '30g', fiber: '3g', sugar: '6g' },
      storage_instructions: 'Store in an airtight container. Best consumed within 6 months.',
      meta_title: 'Buy Premium W240 Cashews Online | Shreepad Enterprises',
      meta_description: 'W240 grade premium whole cashews from Konkan coast. Creamy, buttery flavor. Best quality at best price.',
    },
    {
      category_id: createdCategories['pistachios'],
      name: 'Iranian Roasted Pistachios', slug: 'iranian-roasted-pistachios',
      short_description: 'Naturally roasted Iranian pistachios with their signature vibrant green color',
      description: 'Our Iranian pistachios are grown in the Rafsanjan region, home to the world\'s finest pistachio orchards. Each pistachio is carefully roasted to bring out its natural flavors while preserving all nutrients.',
      price: 1199, original_price: 1499, discount_percent: 20, weight: '500g',
      sku: 'PST-IRN-500', stock: 60, rating: 4.7, review_count: 142,
      is_featured: true, is_best_seller: false,
      benefits: ['Rich in Antioxidants', 'Boosts Eye Health', 'Weight Management', 'High in Fiber'],
      nutrition_facts: { calories: 562, protein: '20g', fat: '45g', carbs: '28g', fiber: '10g', sugar: '8g' },
      storage_instructions: 'Keep in a sealed container away from direct sunlight.',
      meta_title: 'Buy Iranian Pistachios Online | Shreepad Enterprises',
      meta_description: 'Premium Iranian roasted pistachios from Rafsanjan. Naturally vibrant green, rich in antioxidants.',
    },
    {
      category_id: createdCategories['walnuts'],
      name: 'Kashmiri Walnuts Kernels', slug: 'kashmiri-walnut-kernels',
      short_description: 'Premium Kashmiri walnut kernels, omega-3 rich and brain-healthy',
      description: 'Sourced from the pristine valleys of Kashmir, these walnut kernels are harvested at peak ripeness. Their rich, buttery flavor and high Omega-3 content make them a superfood staple.',
      price: 699, original_price: 899, discount_percent: 22, weight: '500g',
      sku: 'WLN-KSH-500', stock: 75, rating: 4.8, review_count: 201,
      is_featured: true, is_best_seller: true,
      benefits: ['Brain Health', 'Rich in Omega-3', 'Anti-inflammatory', 'Heart Protective'],
      nutrition_facts: { calories: 654, protein: '15g', fat: '65g', carbs: '14g', fiber: '7g', sugar: '3g' },
      storage_instructions: 'Refrigerate in an airtight container. Consume within 3 months.',
      meta_title: 'Buy Kashmiri Walnut Kernels Online | Shreepad Enterprises',
      meta_description: 'Premium Kashmiri walnut kernels, rich in Omega-3. Sourced from pristine Kashmir valleys.',
    },
    {
      category_id: createdCategories['dates'],
      name: 'Medjool Dates Premium', slug: 'medjool-dates-premium',
      short_description: 'The King of Dates - plump, glossy, and irresistibly sweet Medjool dates',
      description: 'Known as the "King of Dates", our Medjool dates are prized for their large size, soft texture, and caramel-like sweetness. Sourced from premier date farms, they are a natural source of energy and minerals.',
      price: 899, original_price: 1099, discount_percent: 18, weight: '500g',
      sku: 'DTS-MDJ-500', stock: 90, rating: 4.9, review_count: 315,
      is_featured: false, is_best_seller: true,
      benefits: ['Instant Energy', 'Rich in Iron', 'Bone Health', 'Natural Sweetener'],
      nutrition_facts: { calories: 277, protein: '2g', fat: '0.2g', carbs: '75g', fiber: '7g', sugar: '66g' },
      storage_instructions: 'Store at room temperature or refrigerate. Best within 6 months.',
      meta_title: 'Buy Premium Medjool Dates Online | Shreepad Enterprises',
      meta_description: 'Premium Medjool dates, plump and naturally sweet. Rich in iron and minerals. Order fresh online.',
    },
    {
      category_id: createdCategories['raisins'],
      name: 'Golden Raisins Kishmish', slug: 'golden-raisins-kishmish',
      short_description: 'Sun-dried golden raisins with a natural sweetness and plump texture',
      description: 'Our golden raisins are made from premium Thompson Seedless grapes, naturally sun-dried to preserve their natural sweetness and nutrients. Perfect for baking, cooking, or as a healthy snack.',
      price: 349, original_price: 449, discount_percent: 22, weight: '500g',
      sku: 'RSN-GLD-500', stock: 120, rating: 4.6, review_count: 178,
      is_featured: false, is_best_seller: false,
      benefits: ['Rich in Iron', 'Natural Energy', 'Digestive Health', 'Bone Strength'],
      nutrition_facts: { calories: 299, protein: '3g', fat: '0.5g', carbs: '79g', fiber: '4g', sugar: '59g' },
      storage_instructions: 'Store in a cool, dry place. Refrigerate after opening.',
      meta_title: 'Buy Golden Raisins Online | Shreepad Enterprises',
      meta_description: 'Premium sun-dried golden raisins. Natural sweetness, rich in iron and energy.',
    },
    {
      category_id: createdCategories['mixed-nuts'],
      name: 'Royal Mixed Nuts Deluxe', slug: 'royal-mixed-nuts-deluxe',
      short_description: 'A luxurious blend of premium almonds, cashews, pistachios, and walnuts',
      description: 'Our Royal Mixed Nuts Deluxe is a carefully curated blend of our finest nuts. Each variety is sourced from its optimal growing region and blended in perfect proportion to create a premium snacking experience.',
      price: 999, original_price: 1299, discount_percent: 23, weight: '500g',
      sku: 'MXD-RYL-500', stock: 65, rating: 4.8, review_count: 256,
      is_featured: true, is_best_seller: true,
      benefits: ['Complete Nutrition', 'Heart Healthy', 'Brain Booster', 'Premium Quality'],
      nutrition_facts: { calories: 600, protein: '18g', fat: '52g', carbs: '25g', fiber: '7g', sugar: '5g' },
      storage_instructions: 'Store in an airtight container in a cool, dry place.',
      meta_title: 'Buy Royal Mixed Nuts Online | Shreepad Enterprises',
      meta_description: 'Luxurious blend of premium almonds, cashews, pistachios, and walnuts. Perfect gift option.',
    },
    {
      category_id: createdCategories['dried-berries'],
      name: 'Superberry Blend', slug: 'superberry-blend',
      short_description: 'Antioxidant powerhouse - cranberries, blueberries, and goji berries',
      description: 'Our Superberry Blend combines three of nature\'s most potent antioxidant sources. Cranberries, blueberries, and goji berries are individually sourced, dried at optimal temperatures, and blended to create a flavor-packed superfood.',
      price: 649, original_price: 849, discount_percent: 24, weight: '300g',
      sku: 'BRY-SUP-300', stock: 80, rating: 4.7, review_count: 134,
      is_featured: true, is_best_seller: false,
      benefits: ['Antioxidant Rich', 'Immune Booster', 'Vision Health', 'Anti-aging'],
      nutrition_facts: { calories: 308, protein: '4g', fat: '1g', carbs: '74g', fiber: '8g', sugar: '55g' },
      storage_instructions: 'Store in a sealed container away from moisture and heat.',
      meta_title: 'Buy Superberry Blend Online | Shreepad Enterprises',
      meta_description: 'Premium antioxidant-rich superberry blend. Cranberries, blueberries, and goji berries combined.',
    },
  ];

  for (const p of products) {
    const productExists = await prisma.product.findUnique({ where: { slug: p.slug } });
    if (!productExists) {
      await prisma.product.create({
        data: {
          category_id: p.category_id,
          name: p.name,
          slug: p.slug,
          short_description: p.short_description,
          description: p.description,
          price: p.price,
          original_price: p.original_price,
          discount_percent: p.discount_percent,
          weight: p.weight,
          sku: p.sku,
          stock: p.stock,
          rating: p.rating,
          review_count: p.review_count,
          is_featured: p.is_featured,
          is_best_seller: p.is_best_seller,
          benefits: p.benefits,
          nutrition_facts: p.nutrition_facts,
          storage_instructions: p.storage_instructions,
          meta_title: p.meta_title,
          meta_description: p.meta_description,
        },
      });
    }
  }
  console.log('✅ Products created');

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
    { key: 'email', value: 'hello@shreepadenterprises.com', label: 'Email Address' },
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

  console.log('\n🎉 Database seeded successfully!');
  console.log('Admin Login: shreepadenterprises.tech@gmail.com / Admin@123');
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
