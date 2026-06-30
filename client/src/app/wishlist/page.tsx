'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectWishlistItems, removeFromWishlist } from '@/store/slices/wishlistSlice';
import { addToCart } from '@/store/slices/cartSlice';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(selectWishlistItems);

  const handleAddToCart = (item: any) => {
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      weight: '500g', // default
      thumbnail: item.thumbnail,
      quantity: 1,
      category: item.category,
    }));
    toast.success(`${item.name} added to cart! 🛒`);
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromWishlist(id));
    toast.success('Removed from wishlist');
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main style={{ paddingTop: '110px' }}>
        {/* Header */}
        <div className="py-10 md:py-12 bg-background border-b border-border-DEFAULT">
          <div className="container-luxury">
            <span className="text-xs font-button font-bold text-accent-DEFAULT uppercase tracking-widest">My Preferences</span>
            <h1 className="font-heading text-primary-DEFAULT mt-2" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700 }}>
              Your Wishlist
            </h1>
            <p className="text-text-muted font-body mt-2">Manage your saved premium favorites</p>
          </div>
        </div>

        {/* Catalog items */}
        <section className="section-padding bg-surface">
          <div className="container-luxury">
            {wishlistItems.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white rounded-3xl border border-border-DEFAULT hover:shadow-luxury-lg overflow-hidden flex flex-col justify-between transition-all"
                  >
                    {/* Top frame */}
                    <div className="relative aspect-square overflow-hidden bg-background">
                      <Image
                        src={item.thumbnail}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white shadow-card flex items-center justify-center text-text-muted hover:text-red-500 transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <span className="text-xxs font-button font-bold text-accent-DEFAULT uppercase tracking-wider">
                          {item.category}
                        </span>
                        <Link href={`/products/${item.slug}`}>
                          <h3 className="font-heading text-sm font-semibold text-primary-DEFAULT mt-1 leading-snug line-clamp-2 hover:text-secondary-DEFAULT transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="font-heading text-base font-bold text-primary-DEFAULT">
                          ₹{item.price.toLocaleString()}
                        </div>
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="w-full py-2 rounded-xl bg-primary-50 hover:bg-primary-DEFAULT text-primary-DEFAULT hover:text-white transition-all text-xs font-button font-semibold flex items-center justify-center gap-1.5 border border-primary-DEFAULT/10"
                        >
                          <ShoppingBag size={12} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-border-DEFAULT shadow-luxury max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <Heart size={28} className="text-accent-DEFAULT" />
                </div>
                <h3 className="font-heading text-lg font-bold text-primary-DEFAULT mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-text-muted font-body text-sm px-6">
                  Save your favorite dry fruits, walnuts, and dates to purchase them later.
                </p>
                <Link href="/products" className="btn-primary-luxury text-sm px-6 py-2.5 mt-6 inline-flex">
                  <span>Start Exploring</span>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
