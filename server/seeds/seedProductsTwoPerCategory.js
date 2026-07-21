const { prisma } = require('../config/db');

async function seedTwoProductsPerCategory() {
  console.log('🔄 Cleaning old products from DB...');
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  console.log('✅ Old products deleted from DB.');

  // Fetch existing categories from DB without modifying them
  const categories = await prisma.category.findMany({
    orderBy: { id: 'asc' },
  });

  if (categories.length === 0) {
    console.error('❌ No categories found in DB!');
    process.exit(1);
  }

  console.log(`📋 Found ${categories.length} existing categories in DB.`);

  // Product templates tailored per category slug/name
  const productTemplates = {
    'dry-fruits-seeds': [
      {
        name: 'Premium California Almonds (Badam)',
        slug: 'dryfruits-california-almonds-500g',
        short_description: 'Handpicked raw California almonds rich in Vitamin E and protein',
        description: 'Our Premium California Almonds are sourced from selected orchards. Packed with monounsaturated healthy fats, Vitamin E, and essential minerals for daily wellness.',
        price: 599, original_price: 799, discount_percent: 25, weight: '500g',
        sku: 'DFS-ALM-500', stock: 120, rating: 4.9, review_count: 210,
        thumbnail: '/images/categories/almonds.png', is_featured: true, is_best_seller: true,
      },
      {
        name: 'Raw Pumpkin & Sunflower Seeds Combo',
        slug: 'raw-pumpkin-sunflower-seeds-combo-400g',
        short_description: 'Nutrient-dense raw seeds mix packed with zinc, magnesium and fiber',
        description: 'A superfood seed combo of raw pumpkin and sunflower seeds. Great for sprinkling on smoothies, oatmeal, or snacking raw for heart and immunity support.',
        price: 399, original_price: 499, discount_percent: 20, weight: '400g',
        sku: 'DFS-SDS-400', stock: 100, rating: 4.8, review_count: 145,
        thumbnail: '/images/categories/dry-fruits-seeds.png', is_featured: false, is_best_seller: true,
      },
    ],
    'oils-ghee': [
      {
        name: 'Pure A2 Gir Cow Desi Ghee 1L',
        slug: 'pure-a2-gir-cow-desi-ghee-1l',
        short_description: 'Traditional bilona churned pure A2 cow ghee with rich aroma',
        description: 'Prepared using traditional Vedic Bilona method from grass-fed A2 Gir cow milk. Granular texture, divine aroma, and high digestive value.',
        price: 1199, original_price: 1499, discount_percent: 20, weight: '1L',
        sku: 'OIL-GHEE-1L', stock: 80, rating: 4.9, review_count: 310,
        thumbnail: '/images/categories/oils-ghee.png', is_featured: true, is_best_seller: true,
      },
      {
        name: 'Cold Pressed Virgin Coconut Oil 500ml',
        slug: 'cold-pressed-virgin-coconut-oil-500ml',
        short_description: '100% natural wood-pressed unrefined virgin coconut oil',
        description: 'Extracted from fresh coconut milk without heat treatment or chemicals. Perfect for healthy cooking, keto diet, and skin hydration.',
        price: 349, original_price: 449, discount_percent: 22, weight: '500ml',
        sku: 'OIL-COC-500', stock: 90, rating: 4.8, review_count: 178,
        thumbnail: '/images/categories/oils-ghee.png', is_featured: false, is_best_seller: false,
      },
    ],
    'tea-coffee-beverages': [
      {
        name: 'Assam Royal CTC & Orthodox Leaf Tea 500g',
        slug: 'assam-royal-ctc-orthodox-leaf-tea-500g',
        short_description: 'Rich amber liquor tea blended with 15% long orthodox tea leaves',
        description: 'Sourced directly from upper Assam tea gardens. A bold, aromatic blend that delivers a strong refreshing cup of authentic chai every morning.',
        price: 329, original_price: 399, discount_percent: 17, weight: '500g',
        sku: 'TCB-TEA-500', stock: 150, rating: 4.8, review_count: 230,
        thumbnail: '/images/categories/tea-coffee-beverages.png', is_featured: true, is_best_seller: true,
      },
      {
        name: 'Gourmet Arabica Instant Coffee Powder 200g',
        slug: 'gourmet-arabica-instant-coffee-powder-200g',
        short_description: 'Freeze-dried 100% Arabica instant coffee with intense roast flavor',
        description: 'Crafted from handpicked South Indian Arabica coffee beans. Freeze-dried to lock in rich aroma and chocolatey undertones.',
        price: 449, original_price: 549, discount_percent: 18, weight: '200g',
        sku: 'TCB-COF-200', stock: 110, rating: 4.9, review_count: 195,
        thumbnail: '/images/categories/tea-coffee-beverages.png', is_featured: false, is_best_seller: true,
      },
    ],
    'atta-rice-dal': [
      {
        name: 'Organic Unpolished Toor Dal (Arhar) 1kg',
        slug: 'organic-unpolished-toor-dal-1kg',
        short_description: 'Unpolished protein-rich yellow pigeon peas free from synthetic polish',
        description: 'Our Toor Dal is unpolished and natural, preserving natural dietary fibers and plant protein. Easy to cook and yields delicious traditional dal fry.',
        price: 189, original_price: 220, discount_percent: 14, weight: '1kg',
        sku: 'ARD-DAL-1KG', stock: 200, rating: 4.7, review_count: 260,
        thumbnail: '/images/categories/atta-rice-dal.png', is_featured: true, is_best_seller: true,
      },
      {
        name: 'Premium Royal Traditional Basmati Rice 1kg',
        slug: 'premium-royal-traditional-basmati-rice-1kg',
        short_description: 'Aged extra-long grain basmati rice with sweet natural aroma',
        description: 'Aged for over 12 months to achieve maximum grain elongation and non-sticky texture. Ideal for biryanis, pulao, and festive meals.',
        price: 249, original_price: 299, discount_percent: 16, weight: '1kg',
        sku: 'ARD-RCE-1KG', stock: 140, rating: 4.8, review_count: 180,
        thumbnail: '/images/categories/atta-rice-dal.png', is_featured: false, is_best_seller: false,
      },
    ],
    'masala-spices-salt': [
      {
        name: 'Pure Lakadong Turmeric Powder (Haldi) 250g',
        slug: 'pure-lakadong-turmeric-powder-250g',
        short_description: 'High curcumin (7%+) organic turmeric powder from Meghalaya',
        description: 'Sourced from the hills of Meghalaya, Lakadong Turmeric is world-famous for its high curcumin content and potent anti-inflammatory properties.',
        price: 199, original_price: 249, discount_percent: 20, weight: '250g',
        sku: 'MSS-HAL-250', stock: 130, rating: 4.9, review_count: 215,
        thumbnail: '/images/categories/masala-spices-salt.png', is_featured: true, is_best_seller: true,
      },
      {
        name: 'Natural Himalayan Pink Rock Salt 1kg',
        slug: 'natural-himalayan-pink-rock-salt-1kg',
        short_description: '100% pure mineral-rich crushed pink rock salt for daily cooking',
        description: 'Contains 84 trace minerals naturally found in pristine Himalayan caves. A healthier alternative to refined table salt.',
        price: 129, original_price: 160, discount_percent: 19, weight: '1kg',
        sku: 'MSS-SLT-1KG', stock: 170, rating: 4.8, review_count: 190,
        thumbnail: '/images/categories/masala-spices-salt.png', is_featured: false, is_best_seller: false,
      },
    ],
    'breakfast-essentials': [
      {
        name: 'Crunchy Multi-Millet Fruit & Nut Muesli 400g',
        slug: 'crunchy-multi-millet-fruit-nut-muesli-400g',
        short_description: 'Loaded with ragi, oats, almonds, cranberries and honey',
        description: 'A wholesome nutrient breakfast packed with ragi flakes, whole oats, real almonds, and dried berries. No artificial preservatives.',
        price: 269, original_price: 329, discount_percent: 18, weight: '400g',
        sku: 'BFE-MSL-400', stock: 110, rating: 4.8, review_count: 160,
        thumbnail: '/images/categories/breakfast-essentials.png', is_featured: true, is_best_seller: true,
      },
      {
        name: 'Organic Whole Rolled Oats 500g',
        slug: 'organic-whole-rolled-oats-500g',
        short_description: 'High beta-glucan fiber rolled oats for heart and weight management',
        description: '100% natural jumbo rolled oats. Provides sustained energy, helps reduce blood cholesterol, and improves digestive health.',
        price: 179, original_price: 219, discount_percent: 18, weight: '500g',
        sku: 'BFE-OAT-500', stock: 140, rating: 4.7, review_count: 140,
        thumbnail: '/images/categories/breakfast-essentials.png', is_featured: false, is_best_seller: false,
      },
    ],
    'sauces-instant-foods': [
      {
        name: 'Rich Paneer Butter Makhani Gravy Paste 300g',
        slug: 'rich-paneer-butter-makhani-gravy-paste-300g',
        short_description: 'Authentic restaurant-style gravy paste with cashews and spices',
        description: 'Cook restaurant-quality Paneer Butter Masala in 10 minutes. Crafted with real cashews, tomatoes, and aromatic Indian spices.',
        price: 149, original_price: 179, discount_percent: 16, weight: '300g',
        sku: 'SIF-GRV-300', stock: 95, rating: 4.7, review_count: 110,
        thumbnail: '/images/categories/sauces-instant-foods.png', is_featured: false, is_best_seller: false,
      },
      {
        name: 'Natural Crunchy Peanut Butter 400g',
        slug: 'natural-crunchy-peanut-butter-400g',
        short_description: '100% roasted peanuts spread with zero added sugar or palm oil',
        description: 'High protein peanut butter made purely from slow-roasted peanuts. Packed with 30g protein per 100g, perfect for fitness enthusiasts.',
        price: 229, original_price: 279, discount_percent: 17, weight: '400g',
        sku: 'SIF-PNT-400', stock: 130, rating: 4.9, review_count: 220,
        thumbnail: '/images/categories/sauces-instant-foods.png', is_featured: true, is_best_seller: true,
      },
    ],
    'almonds': [
      {
        name: 'Premium California Almonds (Badam) 500g',
        slug: 'almonds-california-premium-500g',
        short_description: 'Hand-selected California almonds, raw, crisp and nutrient-dense',
        description: 'Our Premium California Almonds are carefully handpicked for size and freshness. Rich in protein, healthy monounsaturated fats, and essential Vitamin E.',
        price: 599, original_price: 799, discount_percent: 25, weight: '500g',
        sku: 'ALM-CAL-500-A', stock: 150, rating: 4.9, review_count: 312,
        thumbnail: '/images/categories/almonds.png', is_featured: true, is_best_seller: true,
      },
      {
        name: 'Organic Irani Mamra Almonds 500g',
        slug: 'almonds-organic-irani-mamra-500g',
        short_description: 'Original Irani Mamra badam rich in 50%+ natural almond oil',
        description: 'Naturally cultivated in Iran without synthetic pesticides. Original Mamra Badams are rich in essential oils and ideal for boosting brain health in children.',
        price: 1299, original_price: 1599, discount_percent: 19, weight: '500g',
        sku: 'ALM-MMR-500-B', stock: 70, rating: 5.0, review_count: 185,
        thumbnail: '/images/categories/almonds.png', is_featured: true, is_best_seller: false,
      },
    ],
    'cashews': [
      {
        name: 'Royal Konkan Jumbo Cashews W240 500g',
        slug: 'cashews-royal-konkan-w240-500g',
        short_description: 'Creamy, large whole cashews from Konkan coastal orchards',
        description: 'Grade W240 whole cashews sourced directly from Konkan farms. Naturally sweet, buttery texture, 100% chemical-free.',
        price: 799, original_price: 999, discount_percent: 20, weight: '500g',
        sku: 'CSH-W240-500', stock: 130, rating: 4.8, review_count: 240,
        thumbnail: '/images/categories/cashews.png', is_featured: true, is_best_seller: true,
      },
      {
        name: 'Roasted & Salted Jumbo Cashews 500g',
        slug: 'cashews-roasted-salted-jumbo-500g',
        short_description: 'Dry-roasted whole cashews tossed in light Himalayan pink salt',
        description: 'Perfectly dry-roasted whole cashews with a crunchy texture and delicious salty flavor. Great for evening tea-time snacking.',
        price: 849, original_price: 1049, discount_percent: 19, weight: '500g',
        sku: 'CSH-RST-500', stock: 110, rating: 4.9, review_count: 195,
        thumbnail: '/images/categories/cashews.png', is_featured: false, is_best_seller: true,
      },
    ],
    'pistachios': [
      {
        name: 'Roasted & Salted Iranian Pistachios 500g',
        slug: 'pistachios-roasted-salted-iranian-500g',
        short_description: 'Vibrant green open-shell Iranian pistachios roasted with Himalayan salt',
        description: 'Naturally split Iranian pistachios roasted to perfection. Rich in lutein, antioxidants, and dietary fiber.',
        price: 899, original_price: 1099, discount_percent: 18, weight: '500g',
        sku: 'PST-IRN-500-A', stock: 100, rating: 4.9, review_count: 205,
        thumbnail: '/images/categories/pistachios.png', is_featured: true, is_best_seller: true,
      },
      {
        name: 'Raw Shelled Green Pistachio Kernels 250g',
        slug: 'pistachios-raw-shelled-green-kernels-250g',
        short_description: 'Unsalted raw green pistachio kernels for baking and sweets',
        description: '100% natural unsalted pistachio kernels. Ideal for garnishing sweets, ice creams, baklava, or eating raw for vision health.',
        price: 649, original_price: 799, discount_percent: 18, weight: '250g',
        sku: 'PST-RAW-250', stock: 85, rating: 4.8, review_count: 135,
        thumbnail: '/images/categories/pistachios.png', is_featured: false, is_best_seller: false,
      },
    ],
    'walnuts': [
      {
        name: 'Kashmiri Snow-White Walnut Kernels 500g',
        slug: 'walnuts-kashmiri-snow-white-kernels-500g',
        short_description: 'Extra light Kashmiri walnut halves rich in Omega-3 (ALA)',
        description: 'Harvested from Kashmiri valleys, these raw walnut halves are crisp, sweet, and free from bitterness. Boosts brain and heart health.',
        price: 749, original_price: 949, discount_percent: 21, weight: '500g',
        sku: 'WLN-KSH-500-A', stock: 120, rating: 4.8, review_count: 280,
        thumbnail: '/images/categories/walnuts.png', is_featured: true, is_best_seller: true,
      },
      {
        name: 'In-Shell Kashmiri Organic Walnuts 1kg',
        slug: 'walnuts-inshell-kashmiri-organic-1kg',
        short_description: 'Hard-shell organic Kashmiri walnuts with intact fresh kernels inside',
        description: 'Natural in-shell walnuts harvested straight from trees. Breaking open fresh walnuts preserves essential oils completely.',
        price: 699, original_price: 899, discount_percent: 22, weight: '1kg',
        sku: 'WLN-SHL-1KG', stock: 90, rating: 4.7, review_count: 160,
        thumbnail: '/images/categories/walnuts.png', is_featured: false, is_best_seller: false,
      },
    ],
    'dates': [
      {
        name: 'Royal Medjool Jumbo Dates 500g',
        slug: 'dates-royal-medjool-jumbo-500g',
        short_description: 'Large, succulent Medjool dates with soft natural caramel texture',
        description: 'Handpicked Medjool dates offering a rich caramel flavor and soft bite. 100% natural energy booster rich in potassium and iron.',
        price: 699, original_price: 899, discount_percent: 22, weight: '500g',
        sku: 'DTS-MDJ-500-A', stock: 140, rating: 4.9, review_count: 310,
        thumbnail: '/images/categories/dates.png', is_featured: true, is_best_seller: true,
      },
      {
        name: 'Authentic Ajwa Dates of Madinah 500g',
        slug: 'dates-authentic-ajwa-madinah-500g',
        short_description: 'Dark, soft, sacred Madinah Ajwa dates rich in essential minerals',
        description: 'Sourced from the holy city of Madinah. Renowned for health benefits, soft texture, and mineral richness.',
        price: 1199, original_price: 1499, discount_percent: 20, weight: '500g',
        sku: 'DTS-AJW-500-B', stock: 80, rating: 4.9, review_count: 240,
        thumbnail: '/images/categories/dates.png', is_featured: true, is_best_seller: false,
      },
    ],
    'raisins': [
      {
        name: 'Golden Afghan Seedless Raisins 500g',
        slug: 'raisins-golden-afghan-seedless-500g',
        short_description: 'Plump, golden-yellow Thompson raisins sun-dried to perfection',
        description: 'Juicy, sweet golden raisins naturally cured under sunlight. Ideal for sweets, cooking, or boosting iron intake.',
        price: 349, original_price: 449, discount_percent: 22, weight: '500g',
        sku: 'RSN-AFG-500-A', stock: 160, rating: 4.7, review_count: 190,
        thumbnail: '/images/categories/raisins.png', is_featured: false, is_best_seller: true,
      },
      {
        name: 'Black Seedless Raisins (Kali Kishmish) 500g',
        slug: 'raisins-black-seedless-kali-kishmish-500g',
        short_description: 'Naturally dried black raisins rich in antioxidants and iron',
        description: 'Soak black raisins overnight to improve digestion, blood pressure, and hair vitality. 100% chemical-free.',
        price: 389, original_price: 489, discount_percent: 20, weight: '500g',
        sku: 'RSN-BLK-500', stock: 130, rating: 4.8, review_count: 175,
        thumbnail: '/images/categories/raisins.png', is_featured: true, is_best_seller: false,
      },
    ],
    'mixed-nuts': [
      {
        name: 'Shreepad Gourmet Royal Mixed Nuts 500g',
        slug: 'mixednuts-shreepad-gourmet-royal-500g',
        short_description: 'Luxury blend of almonds, cashews, pistachios, walnuts & seeds',
        description: 'A master blend of almonds, cashews, pistachios, Kashmiri walnuts, pumpkin seeds, and sunflower seeds for daily health.',
        price: 999, original_price: 1299, discount_percent: 23, weight: '500g',
        sku: 'MXD-RYL-500-A', stock: 100, rating: 5.0, review_count: 420,
        thumbnail: '/images/categories/mixed-nuts.png', is_featured: true, is_best_seller: true,
      },
      {
        name: 'Active Energy Nut & Seed Trail Mix 400g',
        slug: 'mixednuts-active-energy-trail-mix-400g',
        short_description: 'Roasted almond, cashew, cranberry and chia seed trail mix',
        description: 'Designed for fitness enthusiasts and outdoor snackers. High protein, high fiber, and delicious crunchy fruit-nut balance.',
        price: 549, original_price: 699, discount_percent: 21, weight: '400g',
        sku: 'MXD-TRL-400', stock: 110, rating: 4.8, review_count: 185,
        thumbnail: '/images/categories/mixed-nuts.png', is_featured: false, is_best_seller: true,
      },
    ],
    'dried-berries': [
      {
        name: 'Wild Dried Cranberries 300g',
        slug: 'driedberries-wild-cranberries-300g',
        short_description: 'Sweet and tart whole sliced cranberries packed with antioxidants',
        description: 'Imported wild cranberries, gently sweetened. Perfect for salad toppings, cake baking, or morning cereal.',
        price: 499, original_price: 629, discount_percent: 20, weight: '300g',
        sku: 'BRY-CRN-300', stock: 120, rating: 4.8, review_count: 190,
        thumbnail: '/images/categories/dried-berries.png', is_featured: true, is_best_seller: true,
      },
      {
        name: 'Superberry Blueberry & Cranberry Blend 300g',
        slug: 'driedberries-superberry-blueberry-cranberry-300g',
        short_description: 'Antioxidant superberry duo of dried blueberries and cranberries',
        description: 'A dark berry antioxidant mix supporting eye health, skin glow, and natural immunity.',
        price: 649, original_price: 849, discount_percent: 24, weight: '300g',
        sku: 'BRY-BLU-300', stock: 90, rating: 4.9, review_count: 170,
        thumbnail: '/images/categories/dried-berries.png', is_featured: true, is_best_seller: false,
      },
    ],
  };

  let totalInserted = 0;

  for (const cat of categories) {
    const templates = productTemplates[cat.slug] || [
      {
        name: `Premium ${cat.name} Product 1`,
        slug: `${cat.slug}-premium-product-1`,
        short_description: `High quality natural ${cat.name.toLowerCase()} packaged fresh`,
        description: `Our premium ${cat.name.toLowerCase()} is carefully selected for taste, crunch, and nutritional benefits.`,
        price: 499, original_price: 649, discount_percent: 23, weight: '500g',
        sku: `${cat.slug.toUpperCase().slice(0, 3)}-01`, stock: 100, rating: 4.8, review_count: 150,
        thumbnail: cat.image || '/images/categories/almonds.png', is_featured: true, is_best_seller: true,
      },
      {
        name: `Royal ${cat.name} Select Product 2`,
        slug: `${cat.slug}-royal-select-product-2`,
        short_description: `Handpicked organic ${cat.name.toLowerCase()} for daily healthy eating`,
        description: `Sourced from top orchards, this ${cat.name.toLowerCase()} offers rich taste and essential vitamins.`,
        price: 699, original_price: 899, discount_percent: 22, weight: '500g',
        sku: `${cat.slug.toUpperCase().slice(0, 3)}-02`, stock: 85, rating: 4.9, review_count: 180,
        thumbnail: cat.image || '/images/categories/almonds.png', is_featured: false, is_best_seller: true,
      },
    ];

    for (const t of templates) {
      const created = await prisma.product.create({
        data: {
          category_id: cat.id,
          name: t.name,
          slug: t.slug,
          short_description: t.short_description,
          description: t.description,
          price: t.price,
          original_price: t.original_price,
          discount_percent: t.discount_percent,
          weight: t.weight,
          sku: t.sku,
          stock: t.stock,
          rating: t.rating,
          review_count: t.review_count,
          thumbnail: t.thumbnail,
          is_featured: t.is_featured,
          is_best_seller: t.is_best_seller,
          is_active: true,
        },
      });
      totalInserted++;
      console.log(`  └─ Created Product #${created.id} under Category "${cat.name}" (ID ${cat.id}): ${created.name}`);
    }
  }

  console.log(`\n🎉 Total ${totalInserted} Products created across ${categories.length} existing categories (2 products per category)!`);
  process.exit(0);
}

seedTwoProductsPerCategory().catch((err) => {
  console.error('❌ Error seeding 2 products per category:', err);
  process.exit(1);
});
