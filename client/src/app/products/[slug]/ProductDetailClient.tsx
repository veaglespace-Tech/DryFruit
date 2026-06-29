'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag, Star, Heart, Check, ArrowRight,
  MessageCircle, ShieldCheck, RefreshCw, Leaf, Truck, Minus, Plus
} from 'lucide-react';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard, { ProductCardProps } from '@/components/ui/ProductCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '@/store/slices/wishlistSlice';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import toast from 'react-hot-toast';

// Seeded products data mock fallback
const ALL_PRODUCTS = [
  {
    id: 1, name: 'Premium California Almonds', slug: 'premium-california-almonds',
    price: 599, original_price: 799, discount_percent: 25, weight: '500g',
    thumbnail: '/images/categories/almonds.png', rating: 4.8, review_count: 247,
    is_featured: true, is_best_seller: true,
    category: { name: 'Almonds', slug: 'almonds' },
    short_description: 'Hand-selected California almonds, naturally rich and nutrient-dense',
    description: 'Our premium California almonds are sourced directly from sun-drenched orchards in the San Joaquin Valley. Each almond is carefully selected, cleaned, and packed to preserve its natural goodness. Rich in Vitamin E, magnesium, and healthy fats.',
    benefits: ['Rich in Vitamin E', 'High in Protein', 'Boosts Heart Health', 'Great for Skin'],
    nutrition_facts: { calories: '579 kcal', protein: '21g', fat: '50g', carbs: '22g', fiber: '12g' },
    storage_instructions: 'Store in a cool, dry place. Keep in an airtight container once opened.',
  },
  {
    id: 2, name: 'Whole Cashews W240 Grade', slug: 'whole-cashews-w240',
    price: 799, original_price: 999, discount_percent: 20, weight: '500g',
    thumbnail: '/images/categories/cashews.png', rating: 4.9, review_count: 189,
    is_featured: true, is_best_seller: true,
    category: { name: 'Cashews', slug: 'cashews' },
    short_description: 'Premium W240 grade whole cashews - creamy, large, and perfectly roasted',
    description: 'Our W240 grade cashews are among the finest in the world. Sourced from the Konkan coast of India, these large whole cashews have a buttery, creamy flavor that is simply unmatched. Perfect for snacking, cooking, or gifting.',
    benefits: ['Rich in Zinc', 'Boosts Immunity', 'Heart Healthy', 'High in Iron'],
    nutrition_facts: { calories: '553 kcal', protein: '18g', fat: '44g', carbs: '30g', fiber: '3g' },
    storage_instructions: 'Store in an airtight container in a cool, dry place.',
  },
  {
    id: 3, name: 'Iranian Roasted Pistachios', slug: 'iranian-roasted-pistachios',
    price: 1199, original_price: 1499, discount_percent: 20, weight: '500g',
    thumbnail: '/images/categories/pistachios.png', rating: 4.7, review_count: 142,
    is_featured: true, is_best_seller: false,
    category: { name: 'Pistachios', slug: 'pistachios' },
    short_description: 'Naturally roasted Iranian pistachios with their signature vibrant green color',
    description: 'Our Iranian pistachios are grown in the Rafsanjan region, home to the world\'s finest pistachio orchards. Each pistachio is carefully roasted to bring out its natural flavors while preserving all nutrients.',
    benefits: ['Rich in Antioxidants', 'Boosts Eye Health', 'Weight Management', 'High in Fiber'],
    nutrition_facts: { calories: '562 kcal', protein: '20g', fat: '45g', carbs: '28g', fiber: '10g' },
    storage_instructions: 'Keep in a sealed container away from direct sunlight.',
  },
  {
    id: 4, name: 'Kashmiri Walnut Kernels', slug: 'kashmiri-walnut-kernels',
    price: 699, original_price: 899, discount_percent: 22, weight: '500g',
    thumbnail: '/images/categories/walnuts.png', rating: 4.8, review_count: 201,
    is_featured: true, is_best_seller: true,
    category: { name: 'Walnuts', slug: 'walnuts' },
    short_description: 'Premium Kashmiri walnut kernels, omega-3 rich and brain-healthy',
    description: 'Sourced from the pristine valleys of Kashmir, these walnut kernels are harvested at peak ripeness. Their rich, Kashmiri buttery flavor and high Omega-3 content make them a superfood staple.',
    benefits: ['Brain Health', 'Rich in Omega-3', 'Anti-inflammatory', 'Heart Protective'],
    nutrition_facts: { calories: '654 kcal', protein: '15g', fat: '65g', carbs: '14g', fiber: '7g' },
    storage_instructions: 'Refrigerate in an airtight container. Consume within 3 months of opening.',
  },
  {
    id: 5, name: 'Medjool Dates Premium', slug: 'medjool-dates-premium',
    price: 899, original_price: 1099, discount_percent: 18, weight: '500g',
    thumbnail: '/images/categories/dates.png', rating: 4.9, review_count: 315,
    is_featured: false, is_best_seller: true,
    category: { name: 'Dates', slug: 'dates' },
    short_description: 'Plump, glossy, and caramel-sweet premium Medjool dates',
    description: 'Known as the "King of Dates", our Medjool dates are prized for their large size, soft texture, and caramel-like sweetness. Sourced from premier date farms, they are a natural source of energy and minerals.',
    benefits: ['Natural Energy Booster', 'Rich in Potassium', 'Supports Digestion', 'Sugar Alternative'],
    nutrition_facts: { calories: '277 kcal', protein: '1.8g', fat: '0.2g', carbs: '75g', fiber: '6.7g' },
    storage_instructions: 'Keep refrigerated in a sealed container for optimal moisture retention.',
  },
  {
    id: 6, name: 'Golden Raisins Kishmish', slug: 'golden-raisins-kishmish',
    price: 349, original_price: 449, discount_percent: 22, weight: '500g',
    thumbnail: '/images/categories/raisins.png', rating: 4.6, review_count: 178,
    is_featured: false, is_best_seller: false,
    category: { name: 'Raisins', slug: 'raisins' },
    short_description: 'Sun-dried golden raisins with a natural sweetness and plump texture',
    description: 'Our golden raisins are naturally sun-dried to concentrate their sweetness and rich flavor. They are clean, juicy, and perfect for baking, cooking, or as a direct healthy snack.',
    benefits: ['Good for Digestion', 'Source of Iron', 'Rich in Antioxidants', 'Bone Health Support'],
    nutrition_facts: { calories: '299 kcal', protein: '3g', fat: '0.5g', carbs: '79g', fiber: '3.7g' },
    storage_instructions: 'Store in an airtight container in a dry pantry cupboard.',
  },
  {
    id: 7, name: 'Royal Mixed Nuts Deluxe', slug: 'royal-mixed-nuts-deluxe',
    price: 999, original_price: 1299, discount_percent: 23, weight: '500g',
    thumbnail: '/images/categories/mixed-nuts.png', rating: 4.8, review_count: 256,
    is_featured: true, is_best_seller: true,
    category: { name: 'Mixed Nuts', slug: 'mixed-nuts' },
    short_description: 'A luxurious blend of premium almonds, cashews, pistachios, and walnuts',
    description: 'Get the best of all worlds in our Royal Mixed Nuts Deluxe! A precisely balanced, premium blend of hand-selected almonds, cashews, pistachios, and walnuts. Perfectly dry-roasted without oils.',
    benefits: ['Multi-nutrient Powerhouse', 'Great Snacking Choice', 'Rich in Healthy Fats', 'High Protein & Fiber'],
    nutrition_facts: { calories: '607 kcal', protein: '18.5g', fat: '54g', carbs: '20g', fiber: '8g' },
    storage_instructions: 'Keep in a cool dry place. Keep sealed tightly to maintain crunch.',
  },
  {
    id: 8, name: 'Superberry Blend', slug: 'superberry-blend',
    price: 649, original_price: 849, discount_percent: 24, weight: '300g',
    thumbnail: '/images/categories/dried-berries.png', rating: 4.7, review_count: 134,
    is_featured: true, is_best_seller: false,
    category: { name: 'Dried Berries', slug: 'dried-berries' },
    short_description: 'Antioxidant powerhouse - cranberries, blueberries, and goji berries',
    description: 'A vibrant sweet-and-sour mix of premium dried cranberries, blueberries, and goji berries. Packed with vitamins and high-potency antioxidants.',
    benefits: ['Antioxidant Powerhouse', 'Boosts Immunity', 'Good for Skin', 'Vitamin C Source'],
    nutrition_facts: { calories: '325 kcal', protein: '2.5g', fat: '1g', carbs: '80g', fiber: '5.5g' },
    storage_instructions: 'Keep in a dry environment. Keep bag zip-locked.',
  },
];

export default function ProductDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'nutrition' | 'shipping'>('desc');
  const detailsRef = useRef<HTMLDivElement>(null);

  const product = ALL_PRODUCTS.find((p) => p.slug === slug) || ALL_PRODUCTS[0];
  const isWishlisted = useAppSelector(selectIsInWishlist(product.id));

  // Find related products
  const related = ALL_PRODUCTS.filter(
    (p) => p.category.slug === product.category.slug && p.id !== product.id
  ).slice(0, 4);

  useGSAP(() => {
    gsap.fromTo('.product-gallery', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' });
    gsap.fromTo('.product-info-panel', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' });
  }, { scope: detailsRef });

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      original_price: product.original_price,
      weight: product.weight,
      thumbnail: product.thumbnail,
      quantity: qty,
      category: product.category.name,
    }));
    toast.success(`Added ${qty} x ${product.name} to cart! 🛒`);
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      thumbnail: product.thumbnail,
      category: product.category.name,
    }));
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist! ❤️');
  };

  const savings = product.original_price ? product.original_price - product.price : 0;

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main ref={detailsRef} style={{ paddingTop: '110px' }}>
        {/* Breadcrumb */}
        <div className="bg-background py-4 border-b border-border-DEFAULT">
          <div className="container-luxury">
            <div className="flex items-center gap-2 text-xs md:text-sm font-body text-text-muted">
              <Link href="/" className="hover:text-primary-DEFAULT transition-colors">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-primary-DEFAULT transition-colors">Products</Link>
              <span>/</span>
              <Link href={`/products?category=${product.category.slug}`} className="hover:text-primary-DEFAULT transition-colors capitalize">
                {product.category.name}
              </Link>
              <span>/</span>
              <span className="text-primary-DEFAULT font-semibold line-clamp-1">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <section className="section-padding">
          <div className="container-luxury">
            <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start">

              {/* Left: Product Images */}
              <div className="product-gallery space-y-4">
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-border-DEFAULT shadow-luxury bg-white">
                  <Image
                    src={product.thumbnail}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  {product.discount_percent > 0 && (
                    <span className="absolute top-4 left-4 z-10 badge-discount">
                      {product.discount_percent}% OFF
                    </span>
                  )}
                </div>
                {/* Secondary images row mockup */}
                <div className="grid grid-cols-4 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`relative aspect-square rounded-xl overflow-hidden border cursor-pointer ${
                        i === 0 ? 'border-accent-DEFAULT' : 'border-border-DEFAULT'
                      }`}
                    >
                      <Image
                        src={product.thumbnail}
                        alt={`${product.name} view ${i}`}
                        fill
                        className="object-cover opacity-75 hover:opacity-100 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Info Panel */}
              <div className="product-info-panel space-y-6">
                <div>
                  {/* Category */}
                  <span className="text-xs font-button font-bold text-accent-DEFAULT uppercase tracking-widest">
                    {product.category.name}
                  </span>
                  {/* Name */}
                  <h1 className="font-heading text-primary-DEFAULT mt-1 mb-3" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700 }}>
                    {product.name}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < Math.round(product.rating) ? 'fill-accent-DEFAULT text-accent-DEFAULT' : 'text-border-DEFAULT'}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-body font-semibold text-text-DEFAULT">{product.rating}</span>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-border-DEFAULT" />
                    <span className="text-sm text-text-muted font-body">({product.review_count} customer reviews)</span>
                  </div>
                </div>

                {/* Price Box */}
                <div className="p-5 rounded-2xl bg-surface border border-border-DEFAULT">
                  <div className="flex items-baseline gap-3">
                    <span className="font-heading text-3xl font-bold text-primary-DEFAULT">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.original_price && (
                      <span className="text-lg text-text-muted line-through font-body">
                        ₹{product.original_price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {savings > 0 && (
                    <p className="text-sm text-green-600 font-button font-semibold mt-1">
                      You save ₹{savings.toLocaleString()} ({product.discount_percent}% off!)
                    </p>
                  )}
                  <p className="text-xs text-text-muted font-body mt-2">Inclusive of all taxes. Free shipping on orders above ₹999.</p>
                </div>

                {/* Short Description */}
                <p className="text-text-DEFAULT font-body leading-relaxed text-sm md:text-base">
                  {product.description}
                </p>

                {/* Benefits Checkmarks */}
                <div className="grid grid-cols-2 gap-3 py-2">
                  {product.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-green-600 font-bold" />
                      </div>
                      <span className="text-xs md:text-sm text-text-DEFAULT font-body">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Quantity and Actions */}
                <div className="flex flex-wrap gap-4 items-center pt-2">
                  {/* Qty Selector */}
                  <div className="flex items-center border-2 border-border-DEFAULT rounded-2xl bg-background p-1">
                    <button
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="p-2 text-text-muted hover:text-primary-DEFAULT transition-colors rounded-xl"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 font-button font-bold text-primary-DEFAULT text-base min-w-8 text-center">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(q => q + 1)}
                      className="p-2 text-text-muted hover:text-primary-DEFAULT transition-colors rounded-xl"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 btn-primary-luxury group justify-center py-4"
                  >
                    <span className="flex items-center gap-2">
                      <ShoppingBag size={18} />
                      Add to Cart
                    </span>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={handleWishlist}
                    className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-center ${
                      isWishlisted
                        ? 'border-red-200 bg-red-50 text-red-500'
                        : 'border-border-DEFAULT hover:border-accent-DEFAULT text-text-muted'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                  </button>
                </div>

                {/* WhatsApp Enquiry Button */}
                <a
                  href={`https://wa.me/919876543210?text=Hi,%20I'm%20interested%20in%20ordering%20${qty}%20x%20${encodeURIComponent(product.name)}%20(${product.weight}).%20Please%20provide%20more%20details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-green-50 hover:bg-green-100 text-green-700 font-button font-semibold rounded-2xl flex items-center justify-center gap-2 border border-green-200 transition-colors"
                >
                  <MessageCircle size={18} />
                  Inquire on WhatsApp
                </a>

                {/* Delivery & Trust badges */}
                <div className="grid grid-cols-3 gap-2 border-t border-border-DEFAULT pt-6">
                  {[
                    { icon: Truck, title: 'Express Shipping', desc: 'Pan-India 3-5 days' },
                    { icon: Leaf, title: '100% Organic', desc: 'No chemicals or additives' },
                    { icon: RefreshCw, title: '7 Days Return', desc: 'Hassle-free refunds' },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="text-center p-3 rounded-xl bg-background border border-border-light">
                      <Icon size={20} className="mx-auto text-primary-DEFAULT mb-2" />
                      <p className="font-button font-bold text-xxs text-text-DEFAULT leading-tight">{title}</p>
                      <p className="font-body text-xxs text-text-muted leading-tight mt-0.5">{desc}</p>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Middle Section: Specs Tabs */}
            <div className="mt-16 border-t border-border-DEFAULT pt-12">
              <div className="flex border-b border-border-DEFAULT mb-8 overflow-x-auto">
                {[
                  { id: 'desc', label: 'Detailed Description' },
                  { id: 'nutrition', label: 'Nutrition Facts' },
                  { id: 'shipping', label: 'Storage & Shipping' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-4 px-6 font-heading text-sm md:text-base font-semibold border-b-2 transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-primary-DEFAULT text-primary-DEFAULT'
                        : 'border-transparent text-text-muted hover:text-primary-DEFAULT'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="min-h-48">
                {activeTab === 'desc' && (
                  <div className="prose max-w-none text-text-muted font-body text-sm md:text-base space-y-4">
                    <p>{product.description}</p>
                    <p>Our packaging is vacuum-sealed and nitrogen-flushed to preserve maximum shelf life, crisp texture, and raw nutritional integrity. Rich in vitamins, minerals, antioxidants, and trace elements, this makes a delicious healthy snack or raw cooking addition.</p>
                  </div>
                )}

                {activeTab === 'nutrition' && (
                  <div className="max-w-md bg-white border border-border-DEFAULT rounded-2xl p-6 shadow-card">
                    <h3 className="font-heading text-base font-bold text-primary-DEFAULT mb-4 border-b border-border-DEFAULT pb-2">
                      Nutritional Value (per 100g)
                    </h3>
                    <div className="space-y-3 font-body text-sm">
                      {Object.entries(product.nutrition_facts).map(([key, val]) => (
                        <div key={key} className="flex justify-between py-1.5 border-b border-border-light last:border-0 text-text-muted">
                          <span className="capitalize">{key}</span>
                          <span className="font-semibold text-primary-DEFAULT">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="prose max-w-none text-text-muted font-body text-sm md:text-base space-y-4">
                    <p><strong className="text-primary-DEFAULT">Storage Instructions:</strong> {product.storage_instructions}</p>
                    <p><strong className="text-primary-DEFAULT">Shipping Details:</strong> Orders are dispatched within 24 hours of placement. Standard shipping takes 3-5 business days depending on delivery location. Expedited options available at checkout.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Related Products Section */}
            {related.length > 0 && (
              <div className="mt-20">
                <h2 className="font-heading text-primary-DEFAULT text-xl md:text-2xl font-bold mb-8">
                  Related Products
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {related.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
