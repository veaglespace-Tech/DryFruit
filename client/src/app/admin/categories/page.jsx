"use client";

import { useState } from "react";
import { Edit2, Trash2, Tag, X } from "lucide-react";
import {
  useGetAdminCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/store/api/apiSlice";
import toast from "react-hot-toast";

export default function AdminCategoriesPage() {
  const { data: categoriesData, isLoading: loading } = useGetAdminCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const categories = categoriesData?.data || categoriesData || [];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);

    try {
      const slugify = (text) =>
        text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", slugify(name));
      formData.append("description", description);

      if (editId !== null) {
        await updateCategory({ id: editId, formData }).unwrap();
        toast.success("Category updated successfully! 🌿");
        setEditId(null);
      } else {
        formData.append("is_active", "true");
        await createCategory(formData).unwrap();
        toast.success("Category added successfully! 🌿");
      }
      setName("");
      setDescription("");
    } catch (err) {
      toast.error(err.data?.message || "Failed to save category");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (cat) => {
    setEditId(cat.id);
    setName(cat.name);
    setDescription(cat.description || "");
  };

  const handleToggleStatus = async (cat) => {
    try {
      const newStatus = !cat.is_active;
      const formData = new FormData();
      formData.append("is_active", newStatus.toString());
      await updateCategory({ id: cat.id, formData }).unwrap();
      toast.success(`Category is now ${newStatus ? "active" : "inactive"}`);
    } catch (err) {
      toast.error("Failed to update category status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id).unwrap();
        toast.success("Category deleted successfully");
      } catch (err) {
        toast.error("Failed to delete category");
      }
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* Form panel */}
      <div className="md:col-span-1 bg-white border border-border-DEFAULT rounded-2xl p-5 shadow-card h-fit">
        <h2 className="font-heading text-lg font-bold text-primary-DEFAULT mb-4 flex items-center gap-2">
          <Tag size={18} className="text-accent-DEFAULT" />
          {editId !== null ? "Edit Category" : "Add Category"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-floating">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
              required
              id="cat-name"
            />

            <label htmlFor="cat-name">Category Name *</label>
          </div>

          <div className="form-floating">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=" "
              rows={3}
              id="cat-desc"
              className="!py-3"
            />

            <label htmlFor="cat-desc">Description</label>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary-luxury text-xs px-5 py-2.5 flex-1 justify-center"
            >
              {submitting
                ? "Saving..."
                : editId !== null
                  ? "Update"
                  : "Add Category"}
            </button>
            {editId !== null && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setName("");
                  setDescription("");
                }}
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
        <h2 className="font-heading text-lg font-bold text-primary-DEFAULT mb-4">
          Manage Categories
        </h2>

        {loading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-4 border-accent-DEFAULT border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs text-text-muted font-body">
              Loading categories...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-DEFAULT bg-background">
                  <th className="text-left p-3 font-button font-semibold text-text-muted">
                    Name
                  </th>
                  <th className="text-left p-3 font-button font-semibold text-text-muted">
                    Description
                  </th>
                  <th className="text-left p-3 font-button font-semibold text-text-muted">
                    Status
                  </th>
                  <th className="text-left p-3 font-button font-semibold text-text-muted">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="border-b border-border-light hover:bg-background transition-colors"
                  >
                    <td className="p-3 font-body font-semibold text-primary-DEFAULT">
                      {cat.name}
                    </td>
                    <td className="p-3 text-text-muted font-body text-xs leading-relaxed max-w-xs truncate">
                      {cat.description || "—"}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleToggleStatus(cat)}
                        className={`px-2.5 py-1 rounded-full text-xxs font-button font-bold border transition-colors ${cat.is_active
                            ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                            : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                          }`}
                        title="Click to toggle status"
                      >
                        {cat.is_active ? "Active" : "Inactive"}
                      </button>
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
        )}
      </div>
    </div>
  );
}
