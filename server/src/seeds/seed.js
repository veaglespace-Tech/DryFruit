require('dotenv').config();
const { connectDB, sequelize } = require('../config/db');
const { Admin, Category, Product, Banner, Testimonial, FAQ, Setting } = require('../models');

const seed = async () => {
  await connectDB();

  console.log('🌱 Starting database seed...');

  // Create Admin
  await Admin.findOrCreate({
    where: { email: 'admin@nutriroots.com' },
    defaults: { name: 'Super Admin', email: 'admin@nutriroots.com', password: 'Admin@123', role: 'super_admin' },
  });
  console.log('✅ Admin created: admin@nutriroots.com / Admin@123');

  // Create Categories
  const categories = [
    { name: 'Almonds', slug: 'almonds', description: 'Premium California and Indian almonds, packed with nutrients', image: '/images/categories/almonds.png', sort_order: 1 },
    { name: 'Cashews', slug: 'cashews', description: 'Creamy, buttery cashews from the finest orchards', image: '/images/categories/cashews.png', sort_order: 2 },
    { name: 'Pistachios', slug: 'pistachios', description: 'Vibrant green pistachios, naturally shelled and roasted', image: '/images/categories/pistachios.png', sort_order: 3 },
    { name: 'Walnuts', slug: 'walnuts', description: 'Brain-healthy walnuts, rich in Omega-3 fatty acids', image: '/images/categories/walnuts.png', sort_order: 4 },
    { name: 'Dates', slug: 'dates', description: 'Premium Medjool and Ajwa dates, nature\'s candy', image: '/images/categories/dates.png', sort_order: 5 },
    { name: 'Golden & Black Raisins', slug: 'raisins', description: 'Golden and black raisins, naturally sun-dried', image: '/images/categories/raisins.png', sort_order: 6 },
    { name: 'Mixed Nuts & Trail Mixes', slug: 'mixed-nuts', description: 'Curated premium nut and seed blends for every occasion', image: '/images/categories/mixed-nuts.png', sort_order: 7 },
    { name: 'Dried Berries', slug: 'dried-berries', description: 'Antioxidant-rich dried cranberries, blueberries, and goji berries', image: '/images/categories/dried-berries.png', sort_order: 8 },
    { name: 'Premium Seeds', slug: 'seeds', description: 'Nutrient-dense natural chia, pumpkin, flax, and sunflower seeds', image: '/images/categories/seeds.png', sort_order: 9 },
    { name: 'Dried Figs (Anjeer)', slug: 'figs', description: 'Rich, sweet dried figs, high in fiber and minerals', image: '/images/categories/figs.png', sort_order: 10 },
  ];

  const createdCategories = {};
  for (const cat of categories) {
    const [c] = await Category.findOrCreate({ where: { slug: cat.slug }, defaults: cat });
    // Update the image path in case it exists but was seeded without it
    c.image = cat.image;
    await c.save();
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
      thumbnail: '/images/categories/almonds.png',
      is_featured: true, is_best_seller: true,
      benefits: ['Rich in Vitamin E', 'High in Protein', 'Boosts Heart Health', 'Great for Skin'],
      nutrition_facts: { calories: 579, protein: '21g', fat: '50g', carbs: '22g', fiber: '12g', sugar: '4g' },
      storage_instructions: 'Store in a cool, dry place. Refrigerate for extended shelf life.',
      meta_title: 'Buy Premium California Almonds Online | NutriRoots',
      meta_description: 'Premium hand-selected California almonds. Rich in Vitamin E, magnesium. Order online and get fresh delivery to your doorstep.',
    },
    {
      category_id: createdCategories['cashews'],
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
      category_id: createdCategories['pistachios'],
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
      category_id: createdCategories['walnuts'],
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
      category_id: createdCategories['dates'],
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
      category_id: createdCategories['raisins'],
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
      category_id: createdCategories['mixed-nuts'],
      name: 'Royal Mixed Nuts Deluxe', slug: 'royal-mixed-nuts-deluxe',
      short_description: 'A luxurious blend of premium almonds, cashews, pistachios, and walnuts',
      description: 'Our Royal Mixed Nuts Deluxe is a carefully curated blend of our finest nuts. Each variety is sourced from its optimal growing region and blended in perfect proportion to create a premium snacking experience.',
      price: 999, original_price: 1299, discount_percent: 23, weight: '500g',
      sku: 'MXD-RYL-500', stock: 65, rating: 4.8, review_count: 256,
      thumbnail: '/images/categories/mixed-nuts.png',
      is_featured: true, is_best_seller: true,
      benefits: ['Complete Nutrition', 'Heart Healthy', 'Brain Booster', 'Premium Quality'],
      nutrition_facts: { calories: 600, protein: '18g', fat: '52g', carbs: '25g', fiber: '7g', sugar: '5g' },
      storage_instructions: 'Store in an airtight container in a cool, dry place.',
      meta_title: 'Buy Royal Mixed Nuts Online | NutriRoots',
      meta_description: 'Luxurious blend of premium almonds, cashews, pistachios, and walnuts. Perfect gift option.',
    },
    {
      category_id: createdCategories['almonds'],
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
      category_id: createdCategories['cashews'],
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
      category_id: createdCategories['pistachios'],
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
      category_id: createdCategories['walnuts'],
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
      category_id: createdCategories['dates'],
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
      category_id: createdCategories['raisins'],
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
      category_id: createdCategories['raisins'],
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
      category_id: createdCategories['figs'],
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
      category_id: createdCategories['seeds'],
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
      category_id: createdCategories['seeds'],
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
      category_id: createdCategories['seeds'],
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
      category_id: createdCategories['seeds'],
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
      category_id: createdCategories['mixed-nuts'],
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
      category_id: createdCategories['mixed-nuts'],
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
  ];

  for (const p of products) {
    const [prod] = await Product.findOrCreate({ where: { slug: p.slug }, defaults: p });
    // Update thumbnail in case it already exists in DB but had null thumbnail
    prod.thumbnail = p.thumbnail;
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

  // Create Testimonials (avatars set to placeholder, admin can update)
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
    { key: 'site_tagline', value: 'Nature\'s Premium Dry Fruits & Nuts', label: 'Site Tagline' },
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
