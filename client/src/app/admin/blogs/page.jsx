"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Check,
  X,
  Calendar,
  Clock,
  BookOpen,
} from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Health & Nutrition",
    author: "Shreepad Team",
    read_time: "4 min read",
    image: "/images/categories/walnuts.png",
    is_published: true,
  });

  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  // Fetch Blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/blogs?all=true");
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      toast.error("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Open Modal for Create
  const handleOpenCreateModal = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "Health & Nutrition",
      author: "Shreepad Team",
      read_time: "4 min read",
      image: "/images/categories/walnuts.png",
      is_published: true,
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      category: blog.category || "Health & Nutrition",
      author: blog.author || "Shreepad Team",
      read_time: blog.read_time || "4 min read",
      image: blog.image || "/images/categories/walnuts.png",
      is_published: blog.is_published,
    });
    setIsModalOpen(true);
  };

  // Handle Form Submit (Create / Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingBlog
        ? `http://localhost:5000/api/blogs/${editingBlog.id}`
        : "http://localhost:5000/api/blogs";
      const method = editingBlog ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(
          editingBlog
            ? "Blog post updated successfully! 📝"
            : "New blog post published! 🚀",
        );
        setIsModalOpen(false);
        fetchBlogs();
      } else {
        toast.error(data.message || "Failed to save blog post");
      }
    } catch (err) {
      console.error("Error saving blog:", err);
      toast.error("Server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Delete Blog
  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Blog post deleted successfully 🗑️");
        setBlogs(blogs.filter((b) => b.id !== id));
      } else {
        toast.error(data.message || "Failed to delete blog post");
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
      toast.error("Failed to delete blog post");
    }
  };

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.category?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-primary-DEFAULT">
            Blog Management
          </h1>
          <p className="text-xs text-text-muted font-body mt-0.5">
            Create, edit, and publish health & nutrition articles for your customers
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="btn-primary-luxury text-xs py-2.5 px-4 self-start sm:self-auto"
        >
          <span className="flex items-center gap-1.5">
            <Plus size={16} /> Add New Article
          </span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles by title or category..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-DEFAULT bg-white text-xs font-body outline-none focus:border-accent-DEFAULT shadow-sm"
        />
      </div>

      {/* Blog Cards / List */}
      {loading ? (
        <div className="text-center py-12 text-text-muted font-body text-sm">
          Loading articles...
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-border-DEFAULT p-8">
          <BookOpen size={36} className="mx-auto text-accent-DEFAULT mb-3 opacity-60" />
          <h3 className="font-heading text-lg font-bold text-primary-DEFAULT mb-1">
            No Blog Articles Found
          </h3>
          <p className="text-xs text-text-muted font-body max-w-sm mx-auto mb-4">
            Start engaging your customers with nutrition guides, storage tips, and healthy recipes.
          </p>
          <button
            onClick={handleOpenCreateModal}
            className="btn-outline-luxury text-xs py-2 px-4 inline-flex"
          >
            + Create First Blog
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl border border-border-DEFAULT shadow-card overflow-hidden flex flex-col justify-between hover:shadow-luxury transition-all duration-300"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative h-44 w-full bg-primary-50">
                  <Image
                    src={blog.image || "/images/categories/walnuts.png"}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                  <span
                    className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-button font-bold ${
                      blog.is_published
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-gray-100 text-gray-600 border border-gray-200"
                    }`}
                  >
                    {blog.is_published ? "Published" : "Draft"}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-button font-bold uppercase tracking-wider text-accent-DEFAULT">
                    {blog.category || "Nutrition"}
                  </span>
                  <h3 className="font-heading text-base font-bold text-primary-DEFAULT line-clamp-2 leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-text-muted font-body line-clamp-2 leading-relaxed">
                    {blog.excerpt || blog.content}
                  </p>

                  <div className="flex items-center gap-3 pt-2 text-[11px] text-text-muted font-body">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {blog.read_time || "4 min read"}
                    </span>
                    <span>•</span>
                    <span>By {blog.author || "Shreepad Team"}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 py-3 border-t border-border-light bg-surface flex items-center justify-between">
                <a
                  href={`/blog`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-button font-semibold text-primary-DEFAULT hover:text-accent-DEFAULT flex items-center gap-1 transition-colors"
                >
                  <Eye size={14} /> Preview
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(blog)}
                    className="p-1.5 rounded-lg border border-border-DEFAULT text-text-muted hover:text-primary-DEFAULT hover:border-primary-DEFAULT transition-colors"
                    title="Edit Blog"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id, blog.title)}
                    className="p-1.5 rounded-lg border border-red-100 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    title="Delete Blog"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-border-DEFAULT shadow-luxury-xl w-full max-w-2xl overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-border-light flex items-center justify-between bg-primary-50">
              <h2 className="font-heading text-lg font-bold text-primary-DEFAULT">
                {editingBlog ? "Edit Blog Article" : "Create New Blog Article"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white text-text-muted transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 font-body text-xs">
              {/* Title */}
              <div>
                <label className="block font-semibold text-text-DEFAULT mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g. Top 5 Health Benefits of Kashmiri Walnuts"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-border-DEFAULT text-xs outline-none focus:border-accent-DEFAULT"
                />
              </div>

              {/* Category & Read Time */}
              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-text-DEFAULT mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="e.g. Health & Nutrition"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border-DEFAULT text-xs outline-none focus:border-accent-DEFAULT"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-text-DEFAULT mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    placeholder="e.g. Shreepad Team"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border-DEFAULT text-xs outline-none focus:border-accent-DEFAULT"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-text-DEFAULT mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.read_time}
                    onChange={(e) =>
                      setFormData({ ...formData, read_time: e.target.value })
                    }
                    placeholder="e.g. 4 min read"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border-DEFAULT text-xs outline-none focus:border-accent-DEFAULT"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block font-semibold text-text-DEFAULT mb-1">
                  Feature Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="e.g. /images/categories/walnuts.png"
                  className="w-full px-4 py-2.5 rounded-xl border border-border-DEFAULT text-xs outline-none focus:border-accent-DEFAULT"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block font-semibold text-text-DEFAULT mb-1">
                  Short Excerpt / Summary
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  rows={2}
                  placeholder="Brief summary displayed on blog list..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border-DEFAULT text-xs outline-none focus:border-accent-DEFAULT"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block font-semibold text-text-DEFAULT mb-1">
                  Article Full Content *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={6}
                  required
                  placeholder="Write full article body content here..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border-DEFAULT text-xs outline-none focus:border-accent-DEFAULT"
                />
              </div>

              {/* Published Checkbox */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={formData.is_published}
                  onChange={(e) =>
                    setFormData({ ...formData, is_published: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-primary-DEFAULT border-border-DEFAULT"
                />
                <label htmlFor="is_published" className="font-semibold text-text-DEFAULT">
                  Publish article immediately on website
                </label>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-border-light flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-outline-luxury text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary-luxury text-xs py-2 px-5"
                >
                  <span className="flex items-center gap-1.5">
                    {submitting ? "Saving..." : editingBlog ? "Update Article" : "Publish Article"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
