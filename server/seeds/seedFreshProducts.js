const { prisma } = require('../config/db');

async function seedFreshProducts() {
  console.log('🔄 Cleaning old products...');
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  console.log('✅ Old products deleted.');

  // Clean and set 8 core dry fruit categories
  const categoriesData = [
    { name: 'Almonds', slug: 'almonds', description: 'Hand-selected California & Irani Mamra almonds, rich in Vitamin E & protein', image: '/images/categories/almonds.png', sort_order: 1 },
    { name: 'Cashews', slug: 'cashews', description: 'Creamy jumbo W240 & W180 whole cashews from Konkan orchards', image: '/images/categories/cashews.png', sort_order: 2 },
    { name: 'Pistachios', slug: 'pistachios', description: 'Vibrant green, dry-roasted & salted Iranian pistachios', image: '/images/categories/pistachios.png', sort_order: 3 },
    { name: 'Walnuts', slug: 'walnuts', description: 'Omega-3 brain superfood Kashmiri walnut kernels, 100% natural', image: '/images/categories/walnuts.png', sort_order: 4 },
    { name: 'Dates', slug: 'dates', description: 'Soft Medjool & authentic Madinah Ajwa dates, rich in iron & fibers', image: '/images/categories/dates.png', sort_order: 5 },
    { name: 'Raisins', slug: 'raisins', description: 'Sun-dried golden & black raisins with natural caramelly sweetness', image: '/images/categories/raisins.png', sort_order: 6 },
    { name: 'Mixed Nuts', slug: 'mixed-nuts', description: 'Luxury roasted nut & seed mixes curated for active snacking', image: '/images/categories/mixed-nuts.png', sort_order: 7 },
    { name: 'Dried Berries', slug: 'dried-berries', description: 'Antioxidant powerhouse cranberries, blueberries & goji berries', image: '/images/categories/dried-berries.png', sort_order: 8 },
  ];

  const catMap = {};
  for (const cat of categoriesData) {
    const upserted = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description, image: cat.image, sort_order: cat.sort_order, is_active: true },
      create: { name: cat.name, slug: cat.slug, description: cat.description, image: cat.image, sort_order: cat.sort_order, is_active: true },
    });
    catMap[cat.slug] = upserted.id;
  }
  console.log('✅ 8 Core dry fruit categories updated in DB.');

  // Insert 10 Authentic Dry Fruit Products
  const freshProducts = [
    {
      category_id: catMap['almonds'],
      name: 'Premium California Almonds (Badam)',
      slug: 'premium-california-almonds',
      short_description: 'Hand-selected premium California almonds, raw, crisp and loaded with Vitamin E',
      description: 'Our Premium California Almonds are carefully hand-picked from sunny orchards. Rich in protein, healthy monounsaturated fats, and essential Vitamin E, these almonds are ideal for your daily breakfast soaking routine or quick healthy snacking.',
      price: 599, original_price: 799, discount_percent: 25, weight: '500g',
      sku: 'ALM-CAL-500', stock: 150, rating: 4.9, review_count: 312,
      thumbnail: '/images/categories/almonds.png',
      is_featured: true, is_best_seller: true,
      benefits: ['High Vitamin E', 'Supports Heart Health', 'Rich in Protein', 'Boosts Brain Function'],
      nutrition_facts: { calories: 579, protein: '21g', fat: '49g', carbs: '22g', fiber: '12g' },
      storage_instructions: 'Store in an airtight container in a cool, dry place.',
    },
    {
      category_id: catMap['cashews'],
      name: 'Royal Konkan Jumbo Cashews W240 (Kaju)',
      slug: 'royal-konkan-jumbo-cashews-w240',
      short_description: 'Creamy, buttery large whole cashews from Konkan coastal orchards',
      description: 'Directly sourced from Goa & Konkan farms, our Grade W240 Whole Cashews offer an unmatched creamy sweetness and satisfying crunch. 100% natural, unroasted, and free from chemicals or preservatives.',
      price: 799, original_price: 999, discount_percent: 20, weight: '500g',
      sku: 'CSH-KNK-500', stock: 120, rating: 4.8, review_count: 245,
      thumbnail: '/images/categories/cashews.png',
      is_featured: true, is_best_seller: true,
      benefits: ['Heart Healthy Fats', 'Rich in Copper & Zinc', 'Natural Energy Booster', 'Zero Cholesterol'],
      nutrition_facts: { calories: 553, protein: '18g', fat: '44g', carbs: '30g', fiber: '3.3g' },
      storage_instructions: 'Keep sealed in cool dry conditions or refrigerate after opening.',
    },
    {
      category_id: catMap['pistachios'],
      name: 'Roasted & Salted Iranian Pistachios (Pista)',
      slug: 'roasted-salted-iranian-pistachios',
      short_description: 'Vibrant green, open-shell pistachios dry roasted with light Himalayan salt',
      description: 'Slow-roasted to perfection with a hint of rock salt, these naturally split Iranian Pistachios deliver an exquisite aroma and addictive crunch. Packed with antioxidants, lutein, and potassium.',
      price: 899, original_price: 1099, discount_percent: 18, weight: '500g',
      sku: 'PST-IRN-500', stock: 95, rating: 4.9, review_count: 198,
      thumbnail: '/images/categories/pistachios.png',
      is_featured: true, is_best_seller: true,
      benefits: ['Eye & Vision Support', 'High Fiber Content', 'Rich in Lutein', 'Weight Management'],
      nutrition_facts: { calories: 560, protein: '20g', fat: '45g', carbs: '27g', fiber: '10g' },
      storage_instructions: 'Store in airtight jars to preserve crunchiness.',
    },
    {
      category_id: catMap['walnuts'],
      name: 'Kashmiri Snow-White Walnut Kernels (Akhrot Giri)',
      slug: 'kashmiri-snow-white-walnut-kernels',
      short_description: 'Extra light, organic Kashmiri walnut halves rich in Plant Omega-3 (ALA)',
      description: 'Harvested from high-altitude Kashmiri valleys, these raw halves are light, bitter-free, and tender. Containing high concentrations of Omega-3 fatty acids, they nourish cognitive focus and heart wellness.',
      price: 749, original_price: 949, discount_percent: 21, weight: '500g',
      sku: 'WLN-KSH-500', stock: 110, rating: 4.8, review_count: 276,
      thumbnail: '/images/categories/walnuts.png',
      is_featured: true, is_best_seller: true,
      benefits: ['Brain Superfood', 'Omega-3 ALA Rich', 'Anti-inflammatory', 'Supports Healthy Aging'],
      nutrition_facts: { calories: 654, protein: '15g', fat: '65g', carbs: '14g', fiber: '7g' },
      storage_instructions: 'Refrigerate in an airtight glass container to avoid oil oxidation.',
    },
    {
      category_id: catMap['dates'],
      name: 'Royal Medjool Jumbo Dates (Khajur)',
      slug: 'royal-medjool-jumbo-dates',
      short_description: 'Large, succulent Medjool dates with natural caramel texture and sweetness',
      description: 'Known as the King of Dates, Medjool dates are soft, rich, and naturally sweet. A perfect natural pre-workout snack, dessert replacement, or energy bite rich in potassium and iron.',
      price: 699, original_price: 899, discount_percent: 22, weight: '500g',
      sku: 'DTS-MDJ-500', stock: 140, rating: 4.9, review_count: 320,
      thumbnail: '/images/categories/dates.png',
      is_featured: true, is_best_seller: true,
      benefits: ['Instant Natural Energy', 'High Iron & Fiber', 'No Added Sugar', 'Digestive Health'],
      nutrition_facts: { calories: 277, protein: '1.8g', fat: '0.2g', carbs: '75g', fiber: '7g' },
      storage_instructions: 'Keep in a cool pantry or refrigerator for soft texture.',
    },
    {
      category_id: catMap['raisins'],
      name: 'Golden Afghan Seedless Raisins (Kishmish)',
      slug: 'golden-afghan-seedless-raisins',
      short_description: 'Plump, golden-yellow Thompson seedless raisins dried under natural sunlight',
      description: 'Sun-cured Afghan Golden Raisins are sweet, juicy, and packed with bio-available iron. Excellent for baking, traditional Indian sweets, or boosting daily hemoglobin levels.',
      price: 349, original_price: 449, discount_percent: 22, weight: '500g',
      sku: 'RSN-AFG-500', stock: 180, rating: 4.7, review_count: 184,
      thumbnail: '/images/categories/raisins.png',
      is_featured: false, is_best_seller: true,
      benefits: ['Improves Hemoglobin', 'Natural Carbs', 'Bone Health (Boron)', 'Quick Digestion'],
      nutrition_facts: { calories: 299, protein: '3g', fat: '0.5g', carbs: '79g', fiber: '4g' },
      storage_instructions: 'Store in a cool dry place.',
    },
    {
      category_id: catMap['mixed-nuts'],
      name: 'Shreepad Gourmet Royal Mixed Nuts & Seeds',
      slug: 'shreepad-gourmet-royal-mixed-nuts',
      short_description: 'Luxury blend of almonds, cashews, pistachios, walnuts, pumpkin & chia seeds',
      description: 'A master chef blend of 7 superfoods. Roasted almonds, whole cashews, pistachios, Kashmiri walnuts, combined with crunchy pumpkin and sunflower seeds for ultimate daily nourishment.',
      price: 999, original_price: 1299, discount_percent: 23, weight: '500g',
      sku: 'MXD-RYL-500', stock: 90, rating: 5.0, review_count: 410,
      thumbnail: '/images/categories/mixed-nuts.png',
      is_featured: true, is_best_seller: true,
      benefits: ['Complete Daily Micronutrients', 'Protein Packed', 'Low Glycemic Index', 'Premium Gift Option'],
      nutrition_facts: { calories: 605, protein: '20g', fat: '51g', carbs: '22g', fiber: '9g' },
      storage_instructions: 'Keep in an airtight jar.',
    },
    {
      category_id: catMap['dried-berries'],
      name: 'Wild Dried Cranberries & Blueberries Superberry Blend',
      slug: 'wild-dried-cranberries-blueberries-blend',
      short_description: 'Sweet and tangy antioxidant powerhouse blend of whole berries',
      description: 'Packed with anthocyanins and anti-aging antioxidants, this delicious berry duo upgrades your breakfast oats, salads, yogurt bowls, and smoothies.',
      price: 649, original_price: 849, discount_percent: 24, weight: '300g',
      sku: 'BRY-SUP-300', stock: 85, rating: 4.8, review_count: 165,
      thumbnail: '/images/categories/dried-berries.png',
      is_featured: true, is_best_seller: false,
      benefits: ['Antioxidant Powerhouse', 'Urinary Tract Health', 'Glowing Skin', 'Immune Boosting'],
      nutrition_facts: { calories: 325, protein: '2g', fat: '1g', carbs: '80g', fiber: '6g' },
      storage_instructions: 'Refrigerate after opening.',
    },
    {
      category_id: catMap['almonds'],
      name: 'Organic Irani Mamra Almonds (Special Grade)',
      slug: 'organic-irani-mamra-almonds',
      short_description: 'Ultra-rare original Irani Mamra almonds containing over 50% natural almond oil',
      description: 'Grown naturally in Iran without synthetic fertilizers, Original Mamra Badams are rich in natural almond oils, concave in shape, and prized for enhancing memory power in growing children.',
      price: 1299, original_price: 1599, discount_percent: 19, weight: '500g',
      sku: 'ALM-MMR-500', stock: 60, rating: 5.0, review_count: 154,
      thumbnail: '/images/categories/almonds.png',
      is_featured: true, is_best_seller: false,
      benefits: ['50%+ Natural Almond Oil', 'Sharpens Memory', 'Organic & Non-GMO', 'Ayurvedic Superfood'],
      nutrition_facts: { calories: 610, protein: '22g', fat: '54g', carbs: '19g', fiber: '11g' },
      storage_instructions: 'Store in airtight containers in a cool pantry.',
    },
    {
      category_id: catMap['dates'],
      name: 'Authentic Ajwa Dates of Madinah (Al-Madinah Al-Munawwarah)',
      slug: 'authentic-ajwa-dates-madinah',
      short_description: 'Dark, soft, and sacred Ajwa dates sourced directly from Madinah palm groves',
      description: 'Known for their medicinal properties and rich dark texture, our Madinah Ajwa dates are naturally grown, soft to bite, and packed with calcium, iron, and essential minerals.',
      price: 1199, original_price: 1499, discount_percent: 20, weight: '500g',
      sku: 'DTS-AJW-500', stock: 75, rating: 4.9, review_count: 230,
      thumbnail: '/images/categories/dates.png',
      is_featured: true, is_best_seller: true,
      benefits: ['Sacred Madinah Heritage', 'Heart & Blood Pressure Support', 'Rich in Minerals', 'Natural Healing'],
      nutrition_facts: { calories: 282, protein: '2.5g', fat: '0.4g', carbs: '75g', fiber: '8g' },
      storage_instructions: 'Keep in cool dry place or refrigerate.',
    },
  ];

  for (const p of freshProducts) {
    const created = await prisma.product.create({ data: p });
    console.log(`➕ Created Product [ID ${created.id}]: ${created.name} (₹${created.price})`);
  }

  console.log('\n🎉 Fresh Dry-Fruit Products added successfully to MySQL DB!');
  process.exit(0);
}

seedFreshProducts().catch((err) => {
  console.error('❌ Error seeding fresh products:', err);
  process.exit(1);
});
