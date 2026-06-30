require('dotenv').config();
const { connectDB, sequelize } = require('../config/db');
const { Admin, Category, Product, Banner, Testimonial, FAQ, Setting } = require('../models');

const seed = async () => {
  await connectDB();

  console.log('🌱 Starting database seed...');

  console.log('🧹 Cleaning existing tables...');
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  await Product.destroy({ where: {}, truncate: true });
  await Category.destroy({ where: {}, truncate: true });
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

  // Create Admin
  await Admin.findOrCreate({
    where: { email: 'admin@nutriroots.com' },
    defaults: { name: 'Super Admin', email: 'admin@nutriroots.com', password: 'Admin@123', role: 'super_admin' },
  });
  console.log('✅ Admin created: admin@nutriroots.com / Admin@123');

  // Create Categories (matching Tata NutriKorner high-level structure)
  const categories = [
    { name: 'Dry Fruits & Seeds', slug: 'dry-fruits-seeds', description: 'Premium handpicked dry fruits, nuts, and nutrient-dense healthy seeds', image: '/images/categories/dry-fruits-seeds.png', sort_order: 1 },
    { name: 'Oils & Ghee', slug: 'oils-ghee', description: 'Cold-pressed oils and pure cow ghee for healthy cooking', image: '/images/categories/oils-ghee.png', sort_order: 2 },
    { name: 'Tea, Coffee & Beverages', slug: 'tea-coffee-beverages', description: 'Refreshing premium leaf teas and gourmet instant coffees', image: '/images/categories/tea-coffee-beverages.png', sort_order: 3 },
    { name: 'Atta, Rice & Dal', slug: 'atta-rice-dal', description: 'Organic unpolished flours, basmati rice, and protein-rich pulses', image: '/images/categories/atta-rice-dal.png', sort_order: 4 },
    { name: 'Masala, Spices & Salt', slug: 'masala-spices-salt', description: 'Pure, authentic spice powders, whole spices, and low sodium salts', image: '/images/categories/masala-spices-salt.png', sort_order: 5 },
    { name: 'Breakfast Essentials', slug: 'breakfast-essentials', description: 'Healthy millet muesli, ragi bites, and instant oats for a nutritious morning', image: '/images/categories/breakfast-essentials.png', sort_order: 6 },
    { name: 'Sauces & Spreads', slug: 'sauces-instant-foods', description: 'Premium ready-to-eat meals, spreads, and authentic cooking pastes', image: '/images/categories/sauces-instant-foods.png', sort_order: 7 }
  ];

  const createdCategories = {};
  for (const cat of categories) {
    const [c] = await Category.findOrCreate({ where: { slug: cat.slug }, defaults: cat });
    c.image = cat.image;
    c.description = cat.description;
    await c.save();
    createdCategories[cat.slug] = c.id;
  }
  console.log('✅ Categories created');

  // Create Products
  const products = [
    // --- Dry Fruits & Seeds ---
    {
      category_id: createdCategories['dry-fruits-seeds'],
      name: 'Premium California Almonds', slug: 'premium-california-almonds',
      short_description: 'Hand-selected California almonds, naturally rich and nutrient-dense',
      description: 'Our premium California almonds are sourced directly from sun-drenched orchards in the San Joaquin Valley. Each almond is carefully selected, cleaned, and packed to preserve its natural goodness. Rich in Vitamin E, magnesium, and healthy fats.',
      price: 599, original_price: 799, discount_percent: 25, weight: '500g',
      sku: 'ALM-CA-500', stock: 100, rating: 4.8, review_count: 247,
      thumbnail: '/images/categories/almonds.png',
      is_featured: true, is_best_seller: true,
      benefits: ['Rich in Vitamin E', 'High in Protein', 'Boosts Heart Health', 'Great for Skin'],
      nutrition_facts: { calories: 579, protein: '21g', fat: '50g', carbs: '22g', fiber: '12g', sugar: '4g' },
      storage_instructions: 'Store in a cool, dry place. Refrigerate for extended shelf life.',
      meta_title: 'Buy Premium California Almonds Online | NutriRoots',
      meta_description: 'Premium hand-selected California almonds. Rich in Vitamin E, magnesium. Order online and get fresh delivery to your doorstep.',
    },
    {
      category_id: createdCategories['dry-fruits-seeds'],
      name: 'Whole Cashews W240 Grade', slug: 'whole-cashews-w240',
      short_description: 'Premium W240 grade whole cashews - creamy, large, and perfectly roasted',
      description: 'Our W240 grade cashews are among the finest in the world. Sourced from the Konkan coast of India, these large whole cashews have a buttery, creamy flavor that is simply unmatched. Perfect for snacking, cooking, or gifting.',
      price: 799, original_price: 999, discount_percent: 20, weight: '500g',
      sku: 'CSH-W240-500', stock: 85, rating: 4.9, review_count: 189,
      thumbnail: '/images/categories/cashews.png',
      is_featured: true, is_best_seller: true,
      benefits: ['Rich in Zinc', 'Boosts Immunity', 'Heart Healthy', 'High in Iron'],
      nutrition_facts: { calories: 553, protein: '18g', fat: '44g', carbs: '30g', fiber: '3g', sugar: '6g' },
      storage_instructions: 'Store in an airtight container. Best consumed within 6 months.',
      meta_title: 'Buy Premium W240 Cashews Online | NutriRoots',
      meta_description: 'W240 grade premium whole cashews from Konkan coast. Creamy, buttery flavor. Best quality at best price.',
    },
    {
      category_id: createdCategories['dry-fruits-seeds'],
      name: 'Iranian Roasted Pistachios', slug: 'iranian-roasted-pistachios',
      short_description: 'Naturally roasted Iranian pistachios with their signature vibrant green color',
      description: 'Our Iranian pistachios are grown in the Rafsanjan region, home to the world\'s finest pistachio orchards. Each pistachio is carefully roasted to bring out its natural flavors while preserving all nutrients.',
      price: 1199, original_price: 1499, discount_percent: 20, weight: '500g',
      sku: 'PST-IRN-500', stock: 60, rating: 4.7, review_count: 142,
      thumbnail: '/images/categories/pistachios.png',
      is_featured: true, is_best_seller: false,
      benefits: ['Rich in Antioxidants', 'Boosts Eye Health', 'Weight Management', 'High in Fiber'],
      nutrition_facts: { calories: 562, protein: '20g', fat: '45g', carbs: '28g', fiber: '10g', sugar: '8g' },
      storage_instructions: 'Keep in a sealed container away from direct sunlight.',
      meta_title: 'Buy Iranian Pistachios Online | NutriRoots',
      meta_description: 'Premium Iranian roasted pistachios from Rafsanjan. Naturally vibrant green, rich in antioxidants.',
    },
    {
      category_id: createdCategories['dry-fruits-seeds'],
      name: 'Kashmiri Walnuts Kernels', slug: 'kashmiri-walnut-kernels',
      short_description: 'Premium Kashmiri walnut kernels, omega-3 rich and brain-healthy',
      description: 'Sourced from the pristine valleys of Kashmir, these walnut kernels are harvested at peak ripeness. Their rich, buttery flavor and high Omega-3 content make them a superfood staple.',
      price: 699, original_price: 899, discount_percent: 22, weight: '500g',
      sku: 'WLN-KSH-500', stock: 75, rating: 4.8, review_count: 201,
      thumbnail: '/images/categories/walnuts.png',
      is_featured: true, is_best_seller: true,
      benefits: ['Brain Health', 'Rich in Omega-3', 'Anti-inflammatory', 'Heart Protective'],
      nutrition_facts: { calories: 654, protein: '15g', fat: '65g', carbs: '14g', fiber: '7g', sugar: '3g' },
      storage_instructions: 'Refrigerate in an airtight container. Consume within 3 months.',
      meta_title: 'Buy Kashmiri Walnut Kernels Online | NutriRoots',
      meta_description: 'Premium Kashmiri walnut kernels, rich in Omega-3. Sourced from pristine Kashmir valleys.',
    },
    {
      category_id: createdCategories['dry-fruits-seeds'],
      name: 'Medjool Dates Premium', slug: 'medjool-dates-premium',
      short_description: 'The King of Dates - plump, glossy, and irresistibly sweet Medjool dates',
      description: 'Known as the "King of Dates", our Medjool dates are prized for their large size, soft texture, and caramel-like sweetness. Sourced from premier date farms, they are a natural source of energy and minerals.',
      price: 899, original_price: 1099, discount_percent: 18, weight: '500g',
      sku: 'DTS-MDJ-500', stock: 90, rating: 4.9, review_count: 315,
      thumbnail: '/images/categories/dates.png',
      is_featured: false, is_best_seller: true,
      benefits: ['Instant Energy', 'Rich in Iron', 'Bone Health', 'Natural Sweetener'],
      nutrition_facts: { calories: 277, protein: '2g', fat: '0.2g', carbs: '75g', fiber: '7g', sugar: '66g' },
      storage_instructions: 'Store at room temperature or refrigerate. Best within 6 months.',
      meta_title: 'Buy Premium Medjool Dates Online | NutriRoots',
      meta_description: 'Premium Medjool dates, plump and naturally sweet. Rich in iron and minerals. Order fresh online.',
    },
    {
      category_id: createdCategories['dry-fruits-seeds'],
      name: 'Golden Raisins Kishmish', slug: 'golden-raisins-kishmish',
      short_description: 'Sun-dried golden raisins with a natural sweetness and plump texture',
      description: 'Our golden raisins are made from premium Thompson Seedless grapes, naturally sun-dried to preserve their natural sweetness and nutrients. Perfect for baking, cooking, or as a healthy snack.',
      price: 349, original_price: 449, discount_percent: 22, weight: '500g',
      sku: 'RSN-GLD-500', stock: 120, rating: 4.6, review_count: 178,
      thumbnail: '/images/categories/raisins.png',
      is_featured: false, is_best_seller: false,
      benefits: ['Rich in Iron', 'Natural Energy', 'Digestive Health', 'Bone Strength'],
      nutrition_facts: { calories: 299, protein: '3g', fat: '0.5g', carbs: '79g', fiber: '4g', sugar: '59g' },
      storage_instructions: 'Store in a cool, dry place. Refrigerate after opening.',
      meta_title: 'Buy Golden Raisins Online | NutriRoots',
      meta_description: 'Premium sun-dried golden raisins. Natural sweetness, rich in iron and energy.',
    },
    {
      category_id: createdCategories['dry-fruits-seeds'],
      name: 'Tata Sampann Premium California Almonds 200g', slug: 'tata-sampann-almonds-200g',
      short_description: 'Handpicked, premium quality California almonds, rich in protein and Vitamin E',
      description: 'Tata Sampann California Almonds are premium quality nuts that are handpicked to ensure uniform size, texture, and natural crunch. Packed with protein, magnesium, and dietary fiber, they make a wholesome everyday snack.',
      price: 269, original_price: 320, discount_percent: 15, weight: '200g',
      sku: 'TATA-ALM-200', stock: 150, rating: 4.8, review_count: 312,
      thumbnail: '/images/categories/almonds.png',
      is_featured: true, is_best_seller: true,
      benefits: ['Good source of Vitamin E', 'High in Dietary Fiber', 'Rich in Protein', '100% Handpicked'],
      nutrition_facts: { calories: 579, protein: '21g', fat: '50g', carbs: '22g', fiber: '12g', sugar: '4g' },
      storage_instructions: 'Store in a cool, dry place. Keep in an airtight container once opened.',
      meta_title: 'Tata Sampann Premium California Almonds 200g | NutriRoots',
      meta_description: 'Buy Tata Sampann Premium California Almonds 200g. Handpicked, crunch and nutritious almonds at best prices.',
    },
    {
      category_id: createdCategories['dry-fruits-seeds'],
      name: 'Tata Sampann Premium Cashews 200g', slug: 'tata-sampann-cashews-200g',
      short_description: 'Crisp, creamy and delicious whole cashews of premium quality',
      description: 'Tata Sampann Cashews are handpicked premium grade nuts, naturally rich in minerals and healthy fats. Their sweet creamy taste and uniform size make them the perfect healthy addition to your daily diet.',
      price: 329, original_price: 390, discount_percent: 15, weight: '200g',
      sku: 'TATA-CSH-200', stock: 120, rating: 4.9, review_count: 198,
      thumbnail: '/images/categories/cashews.png',
      is_featured: true, is_best_seller: true,
      benefits: ['Creamy and delicious', 'Rich in Zinc and Iron', 'Heart Healthy Fats', 'Premium Grade'],
      nutrition_facts: { calories: 553, protein: '18g', fat: '44g', carbs: '30g', fiber: '3g', sugar: '6g' },
      storage_instructions: 'Keep in an airtight container in a dry environment.',
      meta_title: 'Tata Sampann Premium Cashews 200g | NutriRoots',
      meta_description: 'Buy premium Tata Sampann Cashews 200g. Creamy, delicious whole cashew nuts for your health.',
    },
    {
      category_id: createdCategories['dry-fruits-seeds'],
      name: 'Tata Sampann Roasted & Salted Pistachios 200g', slug: 'tata-sampann-pistachios-200g',
      short_description: 'Perfectly roasted and lightly salted premium inshell pistachios',
      description: 'Tata Sampann Pistachios are premium roasted and lightly salted in-shell nuts. Selected carefully for high opening rate, they are highly nutritious, containing protein, fiber, and iron. Ideal for guilt-free snacking.',
      price: 349, original_price: 420, discount_percent: 16, weight: '200g',
      sku: 'TATA-PST-200', stock: 95, rating: 4.7, review_count: 147,
      thumbnail: '/images/categories/pistachios.png',
      is_featured: false, is_best_seller: true,
      benefits: ['Roasted and salted', 'Good source of protein', 'Antioxidant rich', 'Guilt-free snacking'],
      nutrition_facts: { calories: 562, protein: '20g', fat: '45g', carbs: '28g', fiber: '10g', sugar: '8g' },
      storage_instructions: 'Store in a cool dry place. Keep container tightly closed.',
      meta_title: 'Tata Sampann Roasted & Salted Pistachios 200g | NutriRoots',
      meta_description: 'Shop Tata Sampann Roasted & Salted Pistachios 200g. Nutrient-dense, delicious inshell pistas.',
    },
    {
      category_id: createdCategories['dry-fruits-seeds'],
      name: 'Tata Sampann Walnut Kernels 200g', slug: 'tata-sampann-walnuts-200g',
      short_description: 'Premium quality walnut halves, rich in Omega-3 and brain-boosting nutrients',
      description: 'Tata Sampann Walnut Kernels are sourced from premium orchards. Naturally rich in Omega-3 fatty acids (Alpha-Linolenic Acid) which help maintain normal cholesterol levels, these premium halves are crunchy and highly nutritious.',
      price: 369, original_price: 450, discount_percent: 18, weight: '200g',
      sku: 'TATA-WLN-200', stock: 80, rating: 4.8, review_count: 165,
      thumbnail: '/images/categories/walnuts.png',
      is_featured: true, is_best_seller: false,
      benefits: ['Rich in Omega-3 (ALA)', 'Brain-boosting superfood', 'Great source of fiber', 'No added preservatives'],
      nutrition_facts: { calories: 654, protein: '15g', fat: '65g', carbs: '14g', fiber: '7g', sugar: '3g' },
      storage_instructions: 'For optimal freshness, keep refrigerated in an airtight container.',
      meta_title: 'Tata Sampann Walnut Kernels 200g halves | NutriRoots',
      meta_description: 'Buy premium Tata Sampann Walnut Kernels 200g halves online. Rich in Omega-3, great for health.',
    },
    {
      category_id: createdCategories['dry-fruits-seeds'],
      name: 'Tata Sampann Arabian Dates 500g', slug: 'tata-sampann-arabian-dates-500g',
      short_description: 'Deliciously soft and naturally sweet Arabian dates, rich in iron',
      description: 'Tata Sampann Arabian Dates are handpicked, soft, and premium quality dates. Naturally rich in dietary fiber and essential minerals, they serve as a wonderful natural sweetener and instant energy booster.',
      price: 249, original_price: 299, discount_percent: 16, weight: '500g',
      sku: 'TATA-DTS-500', stock: 110, rating: 4.6, review_count: 188,
      thumbnail: '/images/categories/dates.png',
      is_featured: false, is_best_seller: false,
      benefits: ['Soft and naturally sweet', 'Rich in iron', 'Excellent energy booster', 'Wholesome nutrition'],
      nutrition_facts: { calories: 277, protein: '2g', fat: '0.2g', carbs: '75g', fiber: '7g', sugar: '66g' },
      storage_instructions: 'Keep in a cool dry place or refrigerate for maximum softness.',
      meta_title: 'Tata Sampann Arabian Dates 500g | NutriRoots',
      meta_description: 'Shop soft and sweet Tata Sampann Arabian Dates 500g. Pure, natural energy booster.',
    },
    {
      category_id: createdCategories['dry-fruits-seeds'],
      name: 'Tata Sampann Seedless Black Raisins 200g', slug: 'tata-sampann-black-raisins-200g',
      short_description: 'Premium quality seedless black raisins, naturally sweet and chewy',
      description: 'Tata Sampann Black Raisins are sun-dried, plump, and packed with antioxidants. These seedless black raisins are a natural source of iron and potassium, making them a fantastic addition to cereals, desserts, or direct snacking.',
      price: 189, original_price: 230, discount_percent: 17, weight: '200g',
      sku: 'TATA-RSN-BLK-200', stock: 130, rating: 4.7, review_count: 122,
      thumbnail: '/images/categories/raisins.png',
      is_featured: false, is_best_seller: true,
      benefits: ['High in antioxidants', 'Rich source of iron', '100% Seedless', 'Sweet and delicious'],
      nutrition_facts: { calories: 299, protein: '3g', fat: '0.5g', carbs: '79g', fiber: '4g', sugar: '59g' },
      storage_instructions: 'Store in a cool, dry place. Seal tightly after opening.',
      meta_title: 'Tata Sampann Seedless Black Raisins 200g | NutriRoots',
      meta_description: 'Buy premium Tata Sampann Seedless Black Raisins 200g. Sun-dried, rich in antioxidants and iron.',
    },
    {
      category_id: createdCategories['dry-fruits-seeds'],
      name: 'Tata Sampann Premium Green Raisins 200g', slug: 'tata-sampann-green-raisins-200g',
      short_description: 'Sweet and tangy green raisins, naturally dried and hand-selected',
      description: 'Tata Sampann Green Raisins (Kishmish) are sourced from optimal regions, naturally sun-dried and hand-sorted. They are naturally sweet, plump, and rich in potassium, iron, and dietary fiber.',
      price: 149, original_price: 180, discount_percent: 17, weight: '200g',
      sku: 'TATA-RSN-GRN-200', stock: 140, rating: 4.6, review_count: 143,
      thumbnail: '/images/categories/raisins.png',
      is_featured: false, is_best_seller: false,
      benefits: ['Sweet and tangy flavor', 'Rich in iron and potassium', 'Sun-dried grapes', 'Great for snacking'],
      nutrition_facts: { calories: 299, protein: '3g', fat: '0.5g', carbs: '79g', fiber: '4g', sugar: '59g' },
      storage_instructions: 'Keep in an airtight box in a cool dark pantry.',
      meta_title: 'Tata Sampann Premium Green Raisins 200g | NutriRoots',
      meta_description: 'Buy online Tata Sampann Premium Green Raisins 200g. Sweet, chewy, high-quality kishmish.',
    },
    {
      category_id: createdCategories['dry-fruits-seeds'],
      name: 'Tata Sampann Premium Dried Figs (Anjeer) 200g', slug: 'tata-sampann-dried-figs-200g',
      short_description: 'Sweet, chewy, and highly nutritious dried figs rich in dietary fiber',
      description: 'Tata Sampann Dried Figs (Anjeer) are hand-sorted premium figs, sun-dried to keep their flavor and nutritional profile intact. Anjeer is exceptionally rich in fiber, calcium, and iron, promoting digestive health.',
      price: 399, original_price: 499, discount_percent: 20, weight: '200g',
      sku: 'TATA-FIG-200', stock: 75, rating: 4.8, review_count: 112,
      thumbnail: '/images/categories/figs.png',
      is_featured: true, is_best_seller: true,
      benefits: ['Excellent source of fiber', 'Rich in Calcium and Iron', 'Sun-dried premium figs', 'Supports digestion'],
      nutrition_facts: { calories: 249, protein: '3.3g', fat: '0.9g', carbs: '63g', fiber: '9.8g', sugar: '47g' },
      storage_instructions: 'Keep refrigerated in a sealed container once opened.',
      meta_title: 'Tata Sampann Premium Dried Figs (Anjeer) 200g | NutriRoots',
      meta_description: 'Order Tata Sampann Premium Dried Figs 200g (Anjeer). Soft, chewy, fiber-rich premium figs.',
    },
    {
      category_id: createdCategories['dry-fruits-seeds'],
      name: 'Tata Sampann Premium Chia Seeds 200g', slug: 'tata-sampann-chia-seeds-200g',
      short_description: 'Raw, organic premium chia seeds packed with Omega-3 and fiber',
      description: 'Tata Sampann Chia Seeds are 100% natural, raw, and organic seeds. Sourced from the finest growers, they are an excellent vegan source of Omega-3 fatty acids, dietary fiber, and proteins. Great for smoothies, puddings, or oatmeal.',
      price: 149, original_price: 199, discount_percent: 25, weight: '200g',
      sku: 'TATA-SED-CHI-200', stock: 100, rating: 4.7, review_count: 89,
      thumbnail: '/images/categories/seeds.png',
      is_featured: false, is_best_seller: false,
      benefits: ['Superfood rich in Omega-3', 'High in Dietary Fiber', 'Loaded with Antioxidants', 'Wholesome raw seeds'],
      nutrition_facts: { calories: 486, protein: '17g', fat: '31g', carbs: '42g', fiber: '34g', sugar: '0g' },
      storage_instructions: 'Store in an airtight jar in a cool, dry cabinet.',
      meta_title: 'Tata Sampann Premium Chia Seeds 200g | NutriRoots',
      meta_description: 'Buy organic Tata Sampann Chia Seeds 200g. Wholesome raw superfood rich in fiber & Omega-3.',
    },
    {
      category_id: createdCategories['dry-fruits-seeds'],
      name: 'Tata Sampann Premium Pumpkin Seeds 200g', slug: 'tata-sampann-pumpkin-seeds-200g',
      short_description: 'Nutritious raw pumpkin seeds, rich in zinc and plant-based protein',
      description: 'Tata Sampann Pumpkin Seeds are premium quality seeds, raw, unsalted and shelled. Known as a powerhouse of zinc, magnesium, and antioxidants, these seeds are fantastic for cardiovascular health and immunity.',
      price: 249, original_price: 299, discount_percent: 16, weight: '200g',
      sku: 'TATA-SED-PUM-200', stock: 90, rating: 4.8, review_count: 106,
      thumbnail: '/images/categories/seeds.png',
      is_featured: false, is_best_seller: true,
      benefits: ['Excellent source of Zinc', 'Rich in plant protein', 'High in Magnesium', 'Perfect for salads & baking'],
      nutrition_facts: { calories: 559, protein: '30g', fat: '49g', carbs: '10g', fiber: '6g', sugar: '1g' },
      storage_instructions: 'Keep in a cool dry place, sealed away from moisture.',
      meta_title: 'Tata Sampann Premium Pumpkin Seeds 200g | NutriRoots',
      meta_description: 'Buy raw shelled Tata Sampann Pumpkin Seeds 200g. Rich in zinc, magnesium, and plant protein.',
    },
    {
      category_id: createdCategories['dry-fruits-seeds'],
      name: 'Tata Sampann Premium Flax Seeds 200g', slug: 'tata-sampann-flax-seeds-200g',
      short_description: 'Raw flax seeds, a rich vegetarian source of Omega-3 and lignans',
      description: 'Tata Sampann Flax Seeds are premium-grade raw seeds. Highly valued for their high concentration of Alpha-Linolenic Acid (plant Omega-3) and dietary fiber, they are perfect for roasting, baking, or adding to smoothies.',
      price: 99, original_price: 129, discount_percent: 23, weight: '200g',
      sku: 'TATA-SED-FLX-200', stock: 150, rating: 4.6, review_count: 132,
      thumbnail: '/images/categories/seeds.png',
      is_featured: false, is_best_seller: false,
      benefits: ['Excellent plant Omega-3', 'Rich in dietary fiber', 'Contains protective Lignans', '100% natural raw seeds'],
      nutrition_facts: { calories: 534, protein: '18g', fat: '42g', carbs: '29g', fiber: '27g', sugar: '1g' },
      storage_instructions: 'Store in an airtight bottle. Grind fresh as needed for best absorption.',
      meta_title: 'Tata Sampann Premium Flax Seeds 200g | NutriRoots',
      meta_description: 'Buy premium raw Tata Sampann Flax Seeds 200g. High-quality natural flax seeds rich in Omega-3.',
    },
    {
      category_id: createdCategories['dry-fruits-seeds'],
      name: 'Tata Sampann Sunflower Seeds 200g', slug: 'tata-sampann-sunflower-seeds-200g',
      short_description: 'Premium raw, shelled sunflower seeds, rich in Vitamin E and selenium',
      description: 'Tata Sampann Sunflower Seeds are carefully selected shelled raw kernels. Known for their high Vitamin E content and healthy fats, these crunchy seeds are a great addition to your breakfast bowls, trail mixes, or home-baked bread.',
      price: 129, original_price: 159, discount_percent: 18, weight: '200g',
      sku: 'TATA-SED-SUN-200', stock: 110, rating: 4.7, review_count: 75,
      thumbnail: '/images/categories/seeds.png',
      is_featured: false, is_best_seller: false,
      benefits: ['High in Vitamin E', 'Rich in Selenium and Zinc', 'Heart healthy fats', 'Crisp and nutritious'],
      nutrition_facts: { calories: 584, protein: '21g', fat: '51g', carbs: '20g', fiber: '9g', sugar: '2g' },
      storage_instructions: 'Keep in an airtight jar in a cool dry pantry cupboard.',
      meta_title: 'Tata Sampann Sunflower Seeds 200g | NutriRoots',
      meta_description: 'Order premium shelled Tata Sampann Sunflower Seeds 200g. Wholesome raw kernels rich in Vitamin E.',
    },
    {
      category_id: createdCategories['dry-fruits-seeds'],
      name: 'Tata Sampann Truly Premium Dry Fruits & Nuts Mix 200g', slug: 'tata-sampann-premium-mix-200g',
      short_description: 'A premium roasted mix of crunchy almonds, whole cashews, pistas, and raisins',
      description: 'Tata Sampann Truly Premium Mix is a rich, handpicked assortment of crunchy almonds, whole cashews, salted pistachios, and sweet raisins. A luxurious healthy snack full of nutrients, ideal for everyday vitality.',
      price: 499, original_price: 599, discount_percent: 16, weight: '200g',
      sku: 'TATA-MIX-PRM-200', stock: 85, rating: 4.9, review_count: 221,
      thumbnail: '/images/categories/mixed-nuts.png',
      is_featured: true, is_best_seller: true,
      benefits: ['Premium multi-nut mix', 'Great daily vitality snack', 'Rich in iron and magnesium', 'Perfect festive gifting'],
      nutrition_facts: { calories: 590, protein: '18g', fat: '48g', carbs: '26g', fiber: '6g', sugar: '12g' },
      storage_instructions: 'Store in a cool, dark, dry place in an airtight jar.',
      meta_title: 'Tata Sampann Truly Premium Dry Fruits & Nuts Mix | NutriRoots',
      meta_description: 'Buy Tata Sampann Truly Premium Dry Fruits & Nuts Mix 200g. A healthy deluxe blend of almonds, cashews, pistas.',
    },
    {
      category_id: createdCategories['dry-fruits-seeds'],
      name: 'Tata Sampann Roasted Protein 7-in-1 Seed & Trail Mix 250g', slug: 'tata-sampann-7in1-trail-mix-250g',
      short_description: 'High-protein trail mix with 7 healthy seeds and nuts, lightly roasted',
      description: 'Tata Sampann Roasted Protein 7-in-1 Seed & Trail Mix is a delicious high-protein combination of pumpkin seeds, flax seeds, sunflower seeds, chia seeds, watermelon seeds, almonds, and soy nuts. Lightly roasted for a satisfying crunch.',
      price: 349, original_price: 399, discount_percent: 12, weight: '250g',
      sku: 'TATA-MIX-7IN1-250', stock: 95, rating: 4.8, review_count: 143,
      thumbnail: '/images/categories/mixed-nuts.png',
      is_featured: true, is_best_seller: false,
      benefits: ['7-in-1 roasted superfood mix', 'High plant-based protein', 'Rich in fiber and minerals', 'No added colors or artificial flavors'],
      nutrition_facts: { calories: 512, protein: '24g', fat: '38g', carbs: '22g', fiber: '11g', sugar: '3g' },
      storage_instructions: 'Keep in an airtight zip bag in a dry environment.',
      meta_title: 'Tata Sampann Roasted Protein 7-in-1 Seed & Trail Mix | NutriRoots',
      meta_description: 'Shop Tata Sampann Roasted Protein 7-in-1 Seed & Trail Mix 250g. High-protein super seeds and nut mix.',
    },

    // --- Oils & Ghee ---
    {
      category_id: createdCategories['oils-ghee'],
      name: 'Tata Sampann Cold Pressed Mustard Oil 1L', slug: 'tata-sampann-mustard-oil-1l',
      short_description: '100% pure cold pressed mustard oil, extracted from premium mustard seeds',
      description: 'Tata Sampann Cold Pressed Mustard Oil is extracted using traditional wooden press methods to keep the original aroma, flavor and nutritional values intact. Rich in MUFA and natural antioxidants.',
      price: 199, original_price: 245, discount_percent: 18, weight: '1L',
      sku: 'TATA-OIL-MST-1L', stock: 110, rating: 4.7, review_count: 154,
      thumbnail: '/images/categories/oils-ghee.png',
      is_featured: true, is_best_seller: true,
      benefits: ['100% Pure and Cold Pressed', 'Extracted from premium seeds', 'Rich in MUFA & Vitamin E', 'Authentic pungent flavor'],
      nutrition_facts: { calories: 898, protein: '0g', fat: '100g', carbs: '0g', fiber: '0g', sugar: '0g' },
      storage_instructions: 'Store in a cool dry place away from direct sunlight.',
      meta_title: 'Tata Sampann Cold Pressed Mustard Oil 1L | NutriRoots',
      meta_description: 'Buy cold pressed premium mustard oil online. 100% pure and nutritious oil for everyday healthy cooking.',
    },
    {
      category_id: createdCategories['oils-ghee'],
      name: 'Tata Sampann Virgin Coconut Oil 500ml', slug: 'tata-sampann-coconut-oil-500ml',
      short_description: '100% organic cold pressed virgin coconut oil, ideal for cooking and hair care',
      description: 'Extracted from fresh, high-grade coconuts without any heat treatment. Tata Sampann Virgin Coconut Oil is unrefined, unbleached, and preserves all the natural goodness of coconuts, rich in medium chain triglycerides (MCTs).',
      price: 299, original_price: 360, discount_percent: 16, weight: '500ml',
      sku: 'TATA-OIL-CCN-500', stock: 85, rating: 4.8, review_count: 98,
      thumbnail: '/images/categories/oils-ghee.png',
      is_featured: false, is_best_seller: false,
      benefits: ['Preserves natural nutrients', 'Rich in MCTs for easy metabolism', 'Unrefined and 100% organic', 'Delightful coconut aroma'],
      nutrition_facts: { calories: 899, protein: '0g', fat: '100g', carbs: '0g', fiber: '0g', sugar: '0g' },
      storage_instructions: 'Store at room temperature. Solidifies naturally below 24°C.',
      meta_title: 'Tata Sampann Virgin Coconut Oil 500ml | NutriRoots',
      meta_description: 'Buy organic unrefined cold pressed virgin coconut oil online. Perfect for cooking and wellness.',
    },
    {
      category_id: createdCategories['oils-ghee'],
      name: 'Tata Sampann Premium Pure Cow Ghee 1L', slug: 'tata-sampann-cow-ghee-1l',
      short_description: 'Traditional granular pure cow ghee with rich aroma and delicious taste',
      description: 'Tata Sampann Pure Cow Ghee is made from fresh cow milk cream using traditional boiling methods to yield a rich granular texture and mouth-watering aroma. Free of artificial colors and preservatives.',
      price: 649, original_price: 720, discount_percent: 10, weight: '1L',
      sku: 'TATA-GHE-COW-1L', stock: 60, rating: 4.9, review_count: 231,
      thumbnail: '/images/categories/oils-ghee.png',
      is_featured: true, is_best_seller: true,
      benefits: ['Rich granular texture', 'Highly aromatic and flavorful', 'Source of fat-soluble vitamins', 'Great for digestion and immunity'],
      nutrition_facts: { calories: 897, protein: '0g', fat: '99.7g', carbs: '0g', fiber: '0g', sugar: '0g' },
      storage_instructions: 'Store in a dark, dry cupboard. No refrigeration required.',
      meta_title: 'Tata Sampann Pure Cow Ghee 1L | NutriRoots',
      meta_description: 'Buy premium pure cow ghee online. Rich granular texture, pure ghee with delicious aroma.',
    },

    // --- Tea, Coffee & Beverages ---
    {
      category_id: createdCategories['tea-coffee-beverages'],
      name: 'Tata Tea Gold Premium Leaf Tea 1kg', slug: 'tata-tea-gold-1kg',
      short_description: 'A premium blend of Assam teas with 15% long leaves for rich aroma',
      description: 'Tata Tea Gold is a unique blend of fine Assam tea leaves along with long orthodox leaves. When brewed, the long leaves gently unfurl in boiling water, releasing an alluring aroma that makes every sip pure luxury.',
      price: 449, original_price: 520, discount_percent: 13, weight: '1kg',
      sku: 'TATA-TEA-GLD-1K', stock: 120, rating: 4.8, review_count: 312,
      thumbnail: '/images/categories/tea-coffee-beverages.png',
      is_featured: true, is_best_seller: true,
      benefits: ['Unique blend with 15% long leaves', 'Exquisite aroma and color', 'Rich taste from Assam valleys', 'Perfect morning refresher'],
      nutrition_facts: { calories: 0, protein: '0g', fat: '0g', carbs: '0g', fiber: '0g', sugar: '0g' },
      storage_instructions: 'Transfer to an airtight container once opened. Keep away from moisture.',
      meta_title: 'Tata Tea Gold Premium Leaf Tea 1kg | NutriRoots',
      meta_description: 'Shop Tata Tea Gold 1kg online. A premium blend of fine teas and orthodox long leaves.',
    },
    {
      category_id: createdCategories['tea-coffee-beverages'],
      name: 'Tata Tea Premium Desh Ki Chai 1kg', slug: 'tata-tea-premium-1kg',
      short_description: 'The iconic national blend of large and small CTC tea grains',
      description: 'Tata Tea Premium is formulated to match the diverse tea preferences across India. A blend of large tea grains for strong taste and small grains for beautiful color, it offers the perfect balance for your daily cup.',
      price: 389, original_price: 440, discount_percent: 11, weight: '1kg',
      sku: 'TATA-TEA-PRM-1K', stock: 140, rating: 4.7, review_count: 418,
      thumbnail: '/images/categories/tea-coffee-beverages.png',
      is_featured: false, is_best_seller: true,
      benefits: ['Perfect blend of large and small grains', 'Strong taste and bright color', '100% natural Indian tea', 'Exceptional value pack'],
      nutrition_facts: { calories: 0, protein: '0g', fat: '0g', carbs: '0g', fiber: '0g', sugar: '0g' },
      storage_instructions: 'Keep in an airtight jar in a dry, cool pantry.',
      meta_title: 'Tata Tea Premium Desh Ki Chai 1kg | NutriRoots',
      meta_description: 'Buy Tata Tea Premium 1kg online. The national blend offering perfect flavor, taste, and color.',
    },
    {
      category_id: createdCategories['tea-coffee-beverages'],
      name: 'Tata Coffee Grand Premium Instant Coffee 50g', slug: 'tata-coffee-grand-50g',
      short_description: 'Premium instant coffee powder with flavor-locked decoction crystals',
      description: 'Tata Coffee Grand Premium Instant Coffee blends fine coffee powder with flavor-locked decoction crystals. It delivers an intense coffee taste, strong aroma, and rich color for an outstanding coffee experience.',
      price: 149, original_price: 180, discount_percent: 17, weight: '50g',
      sku: 'TATA-COF-GRD-50', stock: 95, rating: 4.6, review_count: 87,
      thumbnail: '/images/categories/tea-coffee-beverages.png',
      is_featured: false, is_best_seller: false,
      benefits: ['Contains flavor-locked crystals', 'Rich aroma and taste', 'Smooth and easy to dissolve', '100% pure instant coffee blend'],
      nutrition_facts: { calories: 5, protein: '0.4g', fat: '0g', carbs: '0.9g', fiber: '0g', sugar: '0g' },
      storage_instructions: 'Keep the jar tightly closed in a cool, dry place.',
      meta_title: 'Tata Coffee Grand Premium Instant Coffee 50g | NutriRoots',
      meta_description: 'Buy Tata Coffee Grand 50g instant coffee. Rich flavor crystals for a cafe-like coffee at home.',
    },

    // --- Atta, Rice & Dal ---
    {
      category_id: createdCategories['atta-rice-dal'],
      name: 'Tata Sampann Organic Unpolished Atta 5kg', slug: 'tata-sampann-organic-atta-5kg',
      short_description: '100% organic, stone-ground unpolished whole wheat atta',
      description: 'Tata Sampann Organic Atta is sourced from certified organic wheat fields and stone-ground to preserve the wheat bran, fiber and essential nutrients. Yields soft, delicious, and highly nutritious rotis.',
      price: 289, original_price: 340, discount_percent: 15, weight: '5kg',
      sku: 'TATA-ATT-ORG-5K', stock: 80, rating: 4.7, review_count: 143,
      thumbnail: '/images/categories/atta-rice-dal.png',
      is_featured: true, is_best_seller: true,
      benefits: ['100% Organic certified', 'Stone ground (Chakki) wheat', 'High in natural dietary fiber', 'Rotis stay soft for longer'],
      nutrition_facts: { calories: 362, protein: '12g', fat: '1.8g', carbs: '73g', fiber: '11g', sugar: '1g' },
      storage_instructions: 'Store in a dry, ventilated steel container.',
      meta_title: 'Tata Sampann Organic Unpolished Atta 5kg | NutriRoots',
      meta_description: 'Buy organic chakki atta online. Stone-ground unpolished wheat flour for soft, nutritious rotis.',
    },
    {
      category_id: createdCategories['atta-rice-dal'],
      name: 'Tata Sampann Premium Toor Dal (Arhar) 1kg', slug: 'tata-sampann-toor-dal-1kg',
      short_description: 'Unpolished premium quality yellow pigeon peas, rich in protein',
      description: 'Tata Sampann Toor Dal is unpolished pigeon peas that do not undergo any artificial polishing with water, oil, or leather. This preserves its natural nutrients and ensures fast cooking and rich taste.',
      price: 189, original_price: 220, discount_percent: 14, weight: '1kg',
      sku: 'TATA-DAL-TOR-1K', stock: 120, rating: 4.8, review_count: 289,
      thumbnail: '/images/categories/atta-rice-dal.png',
      is_featured: true, is_best_seller: true,
      benefits: ['100% Unpolished toor dal', 'No added oil or color polishing', 'High in protein and dietary fiber', 'Cooks fast and tastes rich'],
      nutrition_facts: { calories: 343, protein: '22g', fat: '1.5g', carbs: '60g', fiber: '9g', sugar: '2g' },
      storage_instructions: 'Keep in an airtight jar in a dry kitchen cupboard.',
      meta_title: 'Tata Sampann Premium Toor Dal 1kg | NutriRoots',
      meta_description: 'Shop premium unpolished toor dal online. Nutritious yellow pigeon peas, high protein.',
    },
    {
      category_id: createdCategories['atta-rice-dal'],
      name: 'Tata Sampann Pure Basmati Rice 5kg', slug: 'tata-sampann-basmati-rice-5kg',
      short_description: 'Aged premium long-grain Basmati rice, exceptionally aromatic',
      description: 'Sourced from the foothills of the Himalayas, this premium Basmati rice is aged to perfection. The grains expand up to double their original size when cooked, showing a fluffy texture and beautiful fragrance.',
      price: 599, original_price: 750, discount_percent: 20, weight: '500g',
      sku: 'TATA-RIC-BSM-5K', stock: 70, rating: 4.8, review_count: 172,
      thumbnail: '/images/categories/atta-rice-dal.png',
      is_featured: false, is_best_seller: false,
      benefits: ['Aged premium Basmati grains', 'Exceptionally long and non-sticky grains', 'Rich, traditional aroma', 'Perfect for biryanis and pulaos'],
      nutrition_facts: { calories: 350, protein: '8g', fat: '0.5g', carbs: '78g', fiber: '1.5g', sugar: '0g' },
      storage_instructions: 'Keep container dry and closed tightly to prevent insects.',
      meta_title: 'Tata Sampann Pure Basmati Rice 5kg aged | NutriRoots',
      meta_description: 'Order premium long-grain Basmati rice online. Perfectly aged Basmati rice with exquisite aroma.',
    },

    // --- Masala, Spices & Salt ---
    {
      category_id: createdCategories['masala-spices-salt'],
      name: 'Tata Sampann Turmeric Powder (Haldi) 500g', slug: 'tata-sampann-turmeric-500g',
      short_description: 'Pure turmeric powder with guaranteed minimum 3% curcumin content',
      description: 'Tata Sampann Turmeric Powder is sourced from Salem, Tamil Nadu, known for yielding high-quality turmeric. Each pack guarantees a minimum of 3% Curcumin content, the active ingredient providing healing properties.',
      price: 129, original_price: 160, discount_percent: 19, weight: '500g',
      sku: 'TATA-MAS-HLD-500', stock: 150, rating: 4.8, review_count: 222,
      thumbnail: '/images/categories/masala-spices-salt.png',
      is_featured: true, is_best_seller: true,
      benefits: ['Salem Turmeric sourcing', 'Guaranteed minimum 3% Curcumin', 'Rich golden color and flavor', 'Natural anti-inflammatory agent'],
      nutrition_facts: { calories: 356, protein: '8g', fat: '10g', carbs: '65g', fiber: '21g', sugar: '3g' },
      storage_instructions: 'Store in an airtight jar in a dark, dry kitchen drawer.',
      meta_title: 'Tata Sampann Turmeric Powder 500g Salem | NutriRoots',
      meta_description: 'Buy pure Salem turmeric powder online. High Curcumin turmeric for health and delicious cooking.',
    },
    {
      category_id: createdCategories['masala-spices-salt'],
      name: 'Tata Sampann Tikhalal Red Chilli Powder 500g', slug: 'tata-sampann-chilli-500g',
      short_description: 'Premium hot red chilli powder, naturally colored and spice-rich',
      description: 'Tata Sampann Tikhalal Red Chilli Powder is made from dried red chillies of selected farms. Ground under hygienic conditions, it provides a perfect hot spiciness and a natural deep red color without any added synthetics.',
      price: 179, original_price: 220, discount_percent: 18, weight: '500g',
      sku: 'TATA-MAS-CHL-500', stock: 130, rating: 4.7, review_count: 165,
      thumbnail: '/images/categories/masala-spices-salt.png',
      is_featured: false, is_best_seller: false,
      benefits: ['Perfect hot spicy taste', 'Natural deep red color', 'No added colors or preservatives', 'Sourced from selected farms'],
      nutrition_facts: { calories: 320, protein: '12g', fat: '15g', carbs: '50g', fiber: '27g', sugar: '7g' },
      storage_instructions: 'Keep away from direct heat and moisture in a sealed container.',
      meta_title: 'Tata Sampann Red Chilli Powder 500g Tikhalal | NutriRoots',
      meta_description: 'Shop premium red chilli powder online. Tikhalal hot chilli powder for spicy Indian cuisine.',
    },
    {
      category_id: createdCategories['masala-spices-salt'],
      name: 'Tata Salt Lite (Low Sodium) 1kg', slug: 'tata-salt-lite-1kg',
      short_description: 'Low sodium iodized salt, formulated to manage blood pressure',
      description: 'Tata Salt Lite is a low-sodium iodized salt that provides 15% less sodium than regular iodized salt. Specifically designed to assist in blood pressure management without compromising on the taste of your food.',
      price: 49, original_price: 55, discount_percent: 10, weight: '1kg',
      sku: 'TATA-SLT-LTE-1K', stock: 200, rating: 4.6, review_count: 349,
      thumbnail: '/images/categories/masala-spices-salt.png',
      is_featured: false, is_best_seller: true,
      benefits: ['15% less sodium than regular salt', 'Helps manage active blood pressure', 'Iodine fortified for thyroid health', 'Same clean salty taste'],
      nutrition_facts: { sodium: '32.8g', potassium: '7.8g', iodine: '20mcg' },
      storage_instructions: 'Transfer to a plastic or glass jar. Store away from moisture.',
      meta_title: 'Tata Salt Lite 1kg Low Sodium | NutriRoots',
      meta_description: 'Buy low sodium Tata Salt Lite online. 15% less sodium salt for blood pressure management.',
    },

    // --- Breakfast Essentials ---
    {
      category_id: createdCategories['breakfast-essentials'],
      name: 'Tata Soulfull Fruit & Nut Millet Muesli 400g', slug: 'tata-soulfull-muesli-400g',
      short_description: 'Crunchy millet muesli loaded with ragi, oats, almonds, and dry fruits',
      description: 'Tata Soulfull Millet Muesli is a high-fiber, high-protein breakfast muesli featuring crunchy local millets (ragi, bajra, jowar) blended with rolled oats, honey, almond slices, and dried cranberries. A perfect start to your morning.',
      price: 249, original_price: 299, discount_percent: 16, weight: '400g',
      sku: 'TATA-SUL-MSL-400', stock: 85, rating: 4.8, review_count: 134,
      thumbnail: '/images/categories/breakfast-essentials.png',
      is_featured: true, is_best_seller: true,
      benefits: ['Made with local super millets', 'High dietary fiber and plant protein', 'Packed with crunchy almonds & fruit', 'No refined sugars added'],
      nutrition_facts: { calories: 395, protein: '9.2g', fat: '8.4g', carbs: '72g', fiber: '8g', sugar: '10g' },
      storage_instructions: 'Keep bag tightly zipped after opening. Consume within 30 days.',
      meta_title: 'Tata Soulfull Millet Muesli 400g Fruit & Nut | NutriRoots',
      meta_description: 'Buy millet-rich breakfast muesli online. Rich in ragi, oats, almonds, and cranberries.',
    },
    {
      category_id: createdCategories['breakfast-essentials'],
      name: 'Tata Soulfull Ragi Bites Choco Fills 250g', slug: 'tata-soulfull-ragi-bites-250g',
      short_description: 'Crunchy chocolate filled ragi pillow cereal, kids favorite',
      description: 'Tata Soulfull Ragi Bites Choco Fills has a crunchy outer shell made of calcium-rich ragi (finger millet) filled with melt-in-mouth creamy dark chocolate. A highly nutritious cereal that makes milk fun for kids.',
      price: 139, original_price: 160, discount_percent: 13, weight: '250g',
      sku: 'TATA-SUL-RGB-250', stock: 100, rating: 4.9, review_count: 198,
      thumbnail: '/images/categories/breakfast-essentials.png',
      is_featured: false, is_best_seller: true,
      benefits: ['Outer shell made of 50%+ Ragi', 'Rich source of Calcium and Iron', 'No added maida or preservatives', 'Delicious chocolate filling'],
      nutrition_facts: { calories: 420, protein: '7.5g', fat: '12g', carbs: '70g', fiber: '5g', sugar: '22g' },
      storage_instructions: 'Keep in an airtight jar to retain crunchiness.',
      meta_title: 'Tata Soulfull Ragi Bites Choco Fills 250g | NutriRoots',
      meta_description: 'Order chocolate filled ragi cereal online. Healthy kids breakfast cereal, calcium rich.',
    },

    // --- Sauces & Spreads ---
    {
      category_id: createdCategories['sauces-instant-foods'],
      name: 'Tata Sampann Yumside Paneer Butter Masala 300g', slug: 'tata-sampann-paneer-butter-masala-300g',
      short_description: 'Ready-to-eat rich paneer butter masala, cooked with premium ingredients',
      description: 'Tata Sampann Yumside Paneer Butter Masala is a retort-packed, preservative-free ready-to-eat curry. Soft paneer cubes simmered in a creamy, buttery tomato-onion gravy. Simply heat in hot water or microwave for 60 seconds.',
      price: 129, original_price: 149, discount_percent: 13, weight: '300g',
      sku: 'TATA-YUM-PBM-300', stock: 90, rating: 4.7, review_count: 112,
      thumbnail: '/images/categories/sauces-instant-foods.png',
      is_featured: true, is_best_seller: false,
      benefits: ['preservative-free ready meal', 'Heats in just 60 seconds', 'Soft fresh paneer in butter gravy', 'No artificial colors or MSG'],
      nutrition_facts: { calories: 387, protein: '11g', fat: '28g', carbs: '20g', fiber: '3g', sugar: '5g' },
      storage_instructions: 'Store at room temperature. Refrigerate once opened and consume within 24 hours.',
      meta_title: 'Tata Sampann Yumside Paneer Butter Masala ready-to-eat | NutriRoots',
      meta_description: 'Buy ready-to-eat premium paneer butter masala online. presertative-free instant delicious curry.',
    },
    {
      category_id: createdCategories['sauces-instant-foods'],
      name: 'Tata Sampann Ginger Garlic Paste 200g', slug: 'tata-sampann-ginger-garlic-paste-200g',
      short_description: 'Thick, aromatic ginger garlic cooking paste, 100% natural',
      description: 'Tata Sampann Ginger Garlic Paste is made using high-quality fresh ginger and garlic bulbs. Packed using advanced technology to retain the natural strong aroma and authentic freshly-ground taste without chemicals.',
      price: 49, original_price: 59, discount_percent: 16, weight: '200g',
      sku: 'TATA-PST-GGC-200', stock: 160, rating: 4.6, review_count: 187,
      thumbnail: '/images/categories/sauces-instant-foods.png',
      is_featured: false, is_best_seller: false,
      benefits: ['Made of fresh ginger & garlic', 'Thick paste with no water dilution', 'Strong natural aroma', 'Free of chemical colors'],
      nutrition_facts: { calories: 92, protein: '3.1g', fat: '1.2g', carbs: '16g', fiber: '2.5g', sugar: '1g' },
      storage_instructions: 'Refrigerate once opened and seal tightly.',
      meta_title: 'Tata Sampann Ginger Garlic Paste 200g | NutriRoots',
      meta_description: 'Buy natural ginger garlic cooking paste online. High-quality thick paste for Indian gravies.',
    }
  ];

  for (const p of products) {
    const [prod] = await Product.findOrCreate({ where: { slug: p.slug }, defaults: p });
    prod.thumbnail = p.thumbnail;
    prod.category_id = p.category_id;
    prod.price = p.price;
    prod.original_price = p.original_price;
    prod.discount_percent = p.discount_percent;
    await prod.save();
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
    await FAQ.findOrCreate({ where: { question: faq.question }, defaults: faq });
  }
  console.log('✅ FAQs created');

  // Create Testimonials
  const testimonials = [
    { name: 'Priya Sharma', designation: 'Health & Wellness Coach', location: 'Mumbai', review: 'NutriRoots has completely transformed my snacking habits! The quality of their almonds and cashews is simply unmatched. I can taste the freshness in every bite. Highly recommend to everyone!', rating: 5, sort_order: 1 },
    { name: 'Rajesh Mehta', designation: 'Fitness Entrepreneur', location: 'Pune', review: 'As a fitness enthusiast, I am very particular about the quality of nuts I consume. NutriRoots consistently delivers the best quality. The Kashmiri walnuts are absolutely premium!', rating: 5, sort_order: 2 },
    { name: 'Anita Desai', designation: 'Homemaker & Food Blogger', location: 'Ahmedabad', review: 'The Medjool dates from NutriRoots are absolutely divine! So plump, sweet, and fresh. I have been ordering for 6 months and the quality never disappoints. Perfect for my whole family!', rating: 5, sort_order: 3 },
  ];

  for (const t of testimonials) {
    await Testimonial.findOrCreate({ where: { name: t.name }, defaults: t });
  }
  console.log('✅ Testimonials created');

  // Create Settings
  const settings = [
    { key: 'site_name', value: 'NutriRoots', label: 'Site Name' },
    { key: 'site_tagline', value: 'Nature\'s Premium Dry Fruits & Healthy Grocery', label: 'Site Tagline' },
    { key: 'phone', value: '+91 98765 43210', label: 'Phone Number' },
    { key: 'whatsapp', value: '+919876543210', label: 'WhatsApp Number' },
    { key: 'email', value: 'hello@nutriroots.com', label: 'Email Address' },
    { key: 'address', value: '123, Green Valley Road, Pune, Maharashtra 411001', label: 'Address' },
    { key: 'map_embed', value: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.654!2d73.856!3d18.520!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMxJzEzLjMiTiA3M8KwNTEnMjEuNiJF!5e0!3m2!1sen!2sin!4v1234567890', label: 'Google Maps Embed URL' },
    { key: 'instagram', value: 'https://instagram.com/nutriroots', label: 'Instagram URL' },
    { key: 'facebook', value: 'https://facebook.com/nutriroots', label: 'Facebook URL' },
    { key: 'twitter', value: 'https://twitter.com/nutriroots', label: 'Twitter URL' },
    { key: 'announcement', value: '🌿 Free delivery on orders above ₹999 | Use code FIRST10 for 10% off your first order!', label: 'Announcement Bar Text' },
  ];

  for (const s of settings) {
    await Setting.upsert(s);
  }
  console.log('✅ Settings seeded');

  console.log('\n🎉 Database seeded successfully!');
  console.log('Admin Login: admin@nutriroots.com / Admin@123');
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
