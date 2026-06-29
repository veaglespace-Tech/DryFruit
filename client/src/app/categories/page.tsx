import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf } from 'lucide-react';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Shop Categories | NutriRoots Premium Dry Fruits',
  description: 'Explore our collections of natural almonds, whole cashews, roasted pistachios, brain-healthy walnuts, plump dates, and berries.',
};

const CATEGORIES = [
  { name: 'Almonds', slug: 'almonds', desc: 'Hand-selected California and Indian almonds, raw and nutrient-dense.', image: '/images/categories/almonds.png', bg: '#FDF7F2', border: 'border-amber-100', count: '12 Items' },
  { name: 'Cashews', slug: 'cashews', desc: 'Creamy, large whole cashews from premium Konkan orchards.', image: '/images/categories/cashews.png', bg: '#FAF6EF', border: 'border-yellow-100', count: '8 Items' },
  { name: 'Pistachios', slug: 'pistachios', desc: 'Vibrant green naturally shelled and perfectly dry-roasted pistachios.', image: '/images/categories/pistachios.png', bg: '#F5FAF5', border: 'border-green-100', count: '6 Items' },
  { name: 'Walnuts', slug: 'walnuts', desc: 'Omega-3 brain superfood Kashmiri walnut kernels, raw and wholesome.', image: '/images/categories/walnuts.png', bg: '#FCFAF7', border: 'border-stone-100', count: '5 Items' },
  { name: 'Dates', slug: 'dates', desc: 'Plump Medjool and Ajwa dates, direct source of natural caramelly energy.', image: '/images/categories/dates.png', bg: '#FCF7F2', border: 'border-orange-100', count: '7 Items' },
  { name: 'Raisins', slug: 'raisins', desc: 'Naturally sun-dried golden and black raisins with a juicy texture.', image: '/images/categories/raisins.png', bg: '#FFF7F9', border: 'border-pink-100', count: '4 Items' },
  { name: 'Mixed Nuts', slug: 'mixed-nuts', desc: 'Luxury roasted nut mixes tailored for active snacking profiles.', image: '/images/categories/mixed-nuts.png', bg: '#FAF5FB', border: 'border-purple-100', count: '5 Items' },
  { name: 'Dried Berries', slug: 'dried-berries', desc: 'Antioxidant powerhouse - dried cranberries, blueberries, and superberries.', image: '/images/categories/dried-berries.png', bg: '#FAF5F5', border: 'border-red-100', count: '8 Items' },
];

export default function CategoriesPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main style={{ paddingTop: '110px' }}>
        {/* Header */}
        <div className="section-padding bg-background border-b border-border-DEFAULT">
          <div className="container-luxury text-center">
            <span className="text-xs font-button font-bold text-accent-DEFAULT uppercase tracking-widest">Our Collections</span>
            <h1 className="font-heading text-primary-DEFAULT mt-2 mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700 }}>
              Shop By Category
            </h1>
            <div className="section-divider mx-auto" />
            <p className="body-lead max-w-xl mx-auto mt-4">
              Carefully sorted and packaged categories of premium dry fruits, nuts, and organic seeds.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <section className="section-padding bg-surface">
          <div className="container-luxury">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/products?category=${cat.slug}`}
                  className="group flex flex-col justify-between p-5 rounded-3xl border border-border-DEFAULT bg-white hover:shadow-luxury-lg hover:border-accent-DEFAULT/30 transition-all duration-400"
                  style={{ backgroundColor: cat.bg }}
                >
                  <div className="space-y-4">
                    {/* Image frame */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/70 border border-border-light">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white text-xxs font-button font-bold text-primary-DEFAULT shadow-xs">
                        {cat.count}
                      </span>
                    </div>

                    {/* Meta */}
                    <div>
                      <h3 className="font-heading text-lg font-bold text-primary-DEFAULT group-hover:text-secondary-DEFAULT transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-text-muted font-body text-xs mt-1.5 leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border-light/20 flex items-center justify-between">
                    <span className="text-xs font-button font-bold text-accent-DEFAULT flex items-center gap-1 group-hover:text-primary-DEFAULT">
                      Explore Products
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
