'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Tag, Check, X, Leaf } from 'lucide-react';
import { adminApi } from '@/lib/api';
import toast from 'react-hot-toast';

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  is_active: boolean;
}

const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: 'Almonds', slug: 'almonds', description: 'Premium California and Indian almonds', is_active: true },
  { id: 2, name: 'Cashews', slug: 'cashews', description: 'Creamy, buttery cashews', is_active: true },
  { id: 3, name: 'Pistachios', slug: 'pistachios', description: 'Naturally shelled and roasted', is_active: true },
  { id: 4, name: 'Walnuts', slug: 'walnuts', description: 'Brain-healthy Kashmiri walnuts', is_active: true },
  { id: 5, name: 'Dates', slug: 'dates', description: 'Premium Medjool and Ajwa dates', is_active: true },
  { id: 6, name: 'Raisins', slug: 'raisins', description: 'Naturally sun-dried golden raisins', is_active: true },
  { id: 7, name: 'Mixed Nuts', slug: 'mixed-nuts', description: 'Curated premium blends', is_active: true },
  { id: 8, name: 'Dried Berries', slug: 'dried-berries', description: 'Antioxidant dried berries', is_active: true },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    if (editId !== null) {
      // Update
      setCategories(prev =>
        prev.map(cat => cat.id === editId ? { ...cat, name, description, slug: name.toLowerCase().replace(/ /g, '-') } : cat)
      );
      setEditId(null);
      toast.success('Category updated successfully');
    } else {
      // Add
      const newCat: Category = {
        id: Date.now(),
        name,
        slug: name.toLowerCase().replace(/ /g, '-'),
        description,
        is_active: true,
      };
      setCategories(prev => [...prev, newCat]);
      toast.success('Category added successfully');
    }
    setName('');
    setDescription('');
  };

  const handleEdit = (cat: Category) => {
    setEditId(cat.id);
    setName(cat.name);
    setDescription(cat.description || '');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(prev => prev.filter(cat => cat.id !== id));
      toast.success('Category deleted successfully');
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* Form panel */}
      <div className="md:col-span-1 bg-white border border-border-DEFAULT rounded-2xl p-5 shadow-card h-fit">
        <h2 className="font-heading text-lg font-bold text-primary-DEFAULT mb-4 flex items-center gap-2">
          <Tag size={18} className="text-accent-DEFAULT" />
          {editId !== null ? 'Edit Category' : 'Add Category'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-floating">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder=" "
              required
              id="cat-name"
            />
            <label htmlFor="cat-name">Category Name *</label>
          </div>

          <div className="form-floating">
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder=" "
              rows={3}
              id="cat-desc"
              className="!py-3"
            />
            <label htmlFor="cat-desc">Description</label>
          </div>

          <div className="flex gap-2">
            <button type="submit" className="btn-primary-luxury text-xs px-5 py-2.5 flex-1 justify-center">
              {editId !== null ? 'Update' : 'Add Category'}
            </button>
            {editId !== null && (
              <button
                type="button"
                onClick={() => { setEditId(null); setName(''); setDescription(''); }}
                className="p-2 border border-border-DEFAULT hover:bg-background rounded-xl text-text-muted transition-colors"
                title="Cancel"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Grid listing */}
      <div className="md:col-span-2 bg-white border border-border-DEFAULT rounded-2xl p-6 shadow-card">
        <h2 className="font-heading text-lg font-bold text-primary-DEFAULT mb-4">Manage Categories</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-DEFAULT bg-background">
                <th className="text-left p-3 font-button font-semibold text-text-muted">Name</th>
                <th className="text-left p-3 font-button font-semibold text-text-muted">Description</th>
                <th className="text-left p-3 font-button font-semibold text-text-muted">Status</th>
                <th className="text-left p-3 font-button font-semibold text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id} className="border-b border-border-light hover:bg-background transition-colors">
                  <td className="p-3 font-body font-semibold text-primary-DEFAULT">{cat.name}</td>
                  <td className="p-3 text-text-muted font-body text-xs leading-relaxed max-w-xs truncate">{cat.description || '—'}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-xxs font-button font-bold ${cat.is_active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {cat.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="w-7 h-7 border border-border-DEFAULT hover:border-accent-DEFAULT hover:text-accent-DEFAULT flex items-center justify-center rounded-lg text-text-muted transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="w-7 h-7 border border-border-DEFAULT hover:border-red-300 hover:text-red-500 flex items-center justify-center rounded-lg text-text-muted transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
