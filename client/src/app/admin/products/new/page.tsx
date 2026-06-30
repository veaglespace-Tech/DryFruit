'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, Trash2, Leaf, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { adminApi } from '@/lib/api';
import toast from 'react-hot-toast';

interface DB_Category {
  id: number;
  name: string;
}

export default function AdminNewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<DB_Category[]>([]);

  // Form State
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [customCategory, setCustomCategory] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('0');
  const [weight, setWeight] = useState('500g');
  const [sku, setSku] = useState('');
  const [stock, setStock] = useState('100');
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isActive, setIsActive] = useState(true);

  // Health Benefits Array
  const [benefitInput, setBenefitInput] = useState('');
  const [benefits, setBenefits] = useState<string[]>(['Rich in Vitamin E', 'High in Protein']);

  // Nutrition Facts
  const [calories, setCalories] = useState('579 kcal');
  const [protein, setProtein] = useState('21g');
  const [fat, setFat] = useState('50g');
  const [carbs, setCarbs] = useState('22g');

  // File
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await adminApi.getCategories();
        if (res.data?.success) {
          const list = res.data.data;
          setCategories(list);
          if (list.length > 0) {
            setCategoryId(list[0].id.toString());
          } else {
            setCategoryId('others');
          }
        }
      } catch (err) {
        toast.error('Failed to load categories');
      }
    };
    fetchCats();
  }, []);

  const handleAddBenefit = () => {
    if (benefitInput.trim()) {
      setBenefits(prev => [...prev, benefitInput.trim()]);
      setBenefitInput('');
    }
  };

  const handleRemoveBenefit = (index: number) => {
    setBenefits(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalCategoryId = categoryId;

      if (categoryId === 'others') {
        if (!customCategory.trim()) {
          toast.error('Please enter a category name');
          setLoading(false);
          return;
        }
        
        // Create custom category
        const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const catFormData = new FormData();
        catFormData.append('name', customCategory);
        catFormData.append('slug', slugify(customCategory));
        catFormData.append('description', 'Custom added category');
        catFormData.append('is_active', 'true');
        
        const catRes = await adminApi.createCategory(catFormData);
        if (catRes.data?.success) {
          finalCategoryId = catRes.data.data.id.toString();
          toast.success(`Category "${customCategory}" created! 🌿`);
        } else {
          throw new Error('Failed to create category');
        }
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('category_id', finalCategoryId);
      formData.append('price', price);
      if (originalPrice) formData.append('original_price', originalPrice);
      formData.append('discount_percent', discountPercent);
      formData.append('weight', weight);
      formData.append('sku', sku || 'SKU-' + Date.now());
      formData.append('stock', stock);
      formData.append('short_description', shortDesc);
      formData.append('description', description);
      formData.append('is_featured', isFeatured.toString());
      formData.append('is_best_seller', isBestSeller.toString());
      formData.append('is_active', isActive.toString());
      formData.append('benefits', JSON.stringify(benefits));
      formData.append('nutrition_facts', JSON.stringify({ calories, protein, fat, carbs }));
      if (file) formData.append('thumbnail', file);

      const res = await adminApi.createProduct(formData);
      if (res.data?.success) {
        toast.success('Product added successfully! 🌿');
        router.push('/admin/products');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create product. Check details.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="w-9 h-9 border border-border-DEFAULT hover:bg-background flex items-center justify-center rounded-xl text-text-muted transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="font-heading text-2xl font-bold text-primary-DEFAULT">Add New Product</h1>
            <p className="text-xs text-text-muted font-body">Define catalog properties</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
        {/* Main forms: left Column */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-border-DEFAULT rounded-2xl p-6 shadow-card space-y-4">
            <h2 className="font-heading text-base font-bold text-primary-DEFAULT border-b border-border-light pb-2">Product Info</h2>

            <div className="form-floating">
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder=" " required id="prod-name" />
              <label htmlFor="prod-name">Product Name *</label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-floating">
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder=" " required id="prod-price" />
                <label htmlFor="prod-price">Sale Price (₹) *</label>
              </div>
              <div className="form-floating">
                <input type="number" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} placeholder=" " id="prod-orig-price" />
                <label htmlFor="prod-orig-price">Original Price (₹)</label>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="form-floating">
                <input type="number" value={discountPercent} onChange={e => setDiscountPercent(e.target.value)} placeholder=" " id="prod-disc" />
                <label htmlFor="prod-disc">Discount %</label>
              </div>
              <div className="form-floating">
                <input type="text" value={weight} onChange={e => setWeight(e.target.value)} placeholder=" " required id="prod-weight" />
                <label htmlFor="prod-weight">Weight (e.g. 500g) *</label>
              </div>
              <div className="form-floating">
                <input type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder=" " required id="prod-stock" />
                <label htmlFor="prod-stock">Stock Qty *</label>
              </div>
            </div>

            <div className="form-floating">
              <input type="text" value={sku} onChange={e => setSku(e.target.value)} placeholder=" " id="prod-sku" />
              <label htmlFor="prod-sku">SKU Code (optional)</label>
            </div>

            <div className="form-floating">
              <textarea value={shortDesc} onChange={e => setShortDesc(e.target.value)} placeholder=" " rows={2} id="prod-short-desc" className="!py-3" />
              <label htmlFor="prod-short-desc">Short description (for lists) *</label>
            </div>

            <div className="form-floating">
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder=" " rows={5} id="prod-desc" className="!py-3" />
              <label htmlFor="prod-desc">Detailed Description</label>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white border border-border-DEFAULT rounded-2xl p-6 shadow-card space-y-4">
            <h2 className="font-heading text-base font-bold text-primary-DEFAULT border-b border-border-light pb-2">Health Benefits</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={benefitInput}
                onChange={e => setBenefitInput(e.target.value)}
                placeholder="e.g. Rich in Omega-3"
                className="flex-1 px-4 py-2 border border-border-DEFAULT rounded-xl text-sm outline-none focus:border-accent-DEFAULT"
              />
              <button
                type="button"
                onClick={handleAddBenefit}
                className="px-4 py-2 bg-primary-DEFAULT hover:bg-secondary-DEFAULT text-white rounded-xl text-xs font-button font-bold"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {benefits.map((b, index) => (
                <span key={index} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-xs font-body font-semibold text-primary-DEFAULT rounded-xl">
                  {b}
                  <button type="button" onClick={() => handleRemoveBenefit(index)} className="hover:text-red-500">
                    <Trash2 size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Configurations: right Column */}
        <div className="md:col-span-1 space-y-6">
          {/* Images */}
          <div className="bg-white border border-border-DEFAULT rounded-2xl p-5 shadow-card space-y-4">
            <h3 className="font-heading text-sm font-semibold text-primary-DEFAULT border-b border-border-light pb-2">Product Image</h3>
            <div className="border-2 border-dashed border-border-DEFAULT rounded-xl p-4 text-center cursor-pointer hover:bg-background transition-colors relative">
              <input
                type="file"
                accept="image/*"
                onChange={e => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <p className="text-xs text-text-muted font-body">
                {file ? `Selected: ${file.name}` : 'Click or Drag thumbnail here'}
              </p>
            </div>
          </div>

          {/* Sourcing Category */}
          <div className="bg-white border border-border-DEFAULT rounded-2xl p-5 shadow-card space-y-4">
            <h3 className="font-heading text-sm font-semibold text-primary-DEFAULT border-b border-border-light pb-2">Category</h3>
            <select
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
              className="w-full px-4 py-3 border border-border-DEFAULT bg-white rounded-xl text-sm outline-none focus:border-accent-DEFAULT"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id.toString()}>{cat.name}</option>
              ))}
              <option value="others">Others (Create New)</option>
            </select>

            {categoryId === 'others' && (
              <div className="form-floating mt-3">
                <input
                  type="text"
                  value={customCategory}
                  onChange={e => setCustomCategory(e.target.value)}
                  placeholder=" "
                  required
                  id="custom-cat-name"
                  className="w-full border-accent-DEFAULT"
                />
                <label htmlFor="custom-cat-name" className="text-accent-DEFAULT">New Category Name *</label>
              </div>
            )}
          </div>

          {/* Nutrition */}
          <div className="bg-white border border-border-DEFAULT rounded-2xl p-5 shadow-card space-y-4">
            <h3 className="font-heading text-sm font-semibold text-primary-DEFAULT border-b border-border-light pb-2">Nutrition (per 100g)</h3>
            <div className="space-y-3">
              {[
                { label: 'Calories', val: calories, set: setCalories },
                { label: 'Protein', val: protein, set: setProtein },
                { label: 'Fat', val: fat, set: setFat },
                { label: 'Carbs', val: carbs, set: setCarbs },
              ].map(nut => (
                <div key={nut.label} className="flex justify-between items-center text-xs">
                  <span className="font-body text-text-muted">{nut.label}</span>
                  <input
                    type="text"
                    value={nut.val}
                    onChange={e => nut.set(e.target.value)}
                    className="w-24 px-2 py-1 text-right border border-border-DEFAULT rounded-lg outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="bg-white border border-border-DEFAULT rounded-2xl p-5 shadow-card space-y-4">
            <h3 className="font-heading text-sm font-semibold text-primary-DEFAULT border-b border-border-light pb-2">Status & Badges</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-body text-text-muted">
                <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} className="rounded" />
                Featured Product
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-body text-text-muted">
                <input type="checkbox" checked={isBestSeller} onChange={e => setIsBestSeller(e.target.checked)} className="rounded" />
                Best Seller / Top
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-body text-text-muted">
                <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="rounded" />
                Active on site
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary-luxury justify-center py-3 text-xs">
              <Save size={14} />
              {loading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
