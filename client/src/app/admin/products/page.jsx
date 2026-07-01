"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, Search, Package, Star } from "lucide-react";
import { adminApi } from "@/lib/api";
import toast from "react-hot-toast";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getProducts({ all: "true" });
      if (res.data?.success) {
        setProducts(res.data.data);
      }
    } catch (e) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleToggleStatus = async (product) => {
    try {
      const newStatus = !product.is_active;
      const formData = new FormData();
      formData.append("is_active", newStatus.toString());

      const res = await adminApi.updateProduct(product.id, formData);
      if (res.data?.success) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === product.id ? { ...p, is_active: newStatus } : p,
          ),
        );
        toast.success(`Product is now ${newStatus ? "active" : "inactive"}`);
      }
    } catch (err) {
      toast.error("Failed to update product status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await adminApi.deleteProduct(id);
        if (res.data?.success) {
          setProducts((prev) => prev.filter((p) => p.id !== id));
          toast.success("Product deleted successfully");
        }
      } catch (err) {
        toast.error("Failed to delete product");
      }
    }
  };

  const filtered = products.filter((p) => {
    const categoryName = p.category?.name || "";
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      categoryName.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "featured" && p.is_featured) ||
      (filter === "bestseller" && p.is_best_seller) ||
      (filter === "inactive" && !p.is_active);
    return matchSearch && matchFilter;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-primary-DEFAULT">
            Products
          </h1>
          <p className="text-text-muted font-body text-sm">
            {products.length} total products
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="btn-primary-luxury text-sm px-5 py-2.5"
        >
          <span className="flex items-center gap-2">
            <Plus size={16} />
            Add Product
          </span>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-DEFAULT bg-white font-body text-sm outline-none focus:border-accent-DEFAULT transition-colors"
          />
        </div>
        {["all", "featured", "bestseller", "inactive"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2.5 rounded-xl text-sm font-button font-medium transition-all capitalize ${filter === f ? "bg-primary-DEFAULT text-white" : "bg-white border border-border-DEFAULT text-text-DEFAULT hover:border-primary-DEFAULT"}`}
          >
            {f === "all"
              ? "All Products"
              : f === "bestseller"
                ? "Best Sellers"
                : f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-border-DEFAULT rounded-2xl overflow-hidden shadow-card">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-4 border-accent-DEFAULT border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs text-text-muted font-body">
              Loading products...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-DEFAULT bg-background">
                  <th className="text-left p-4 font-button font-semibold text-text-muted text-sm">
                    Product
                  </th>
                  <th className="text-left p-4 font-button font-semibold text-text-muted text-sm">
                    Category
                  </th>
                  <th className="text-left p-4 font-button font-semibold text-text-muted text-sm">
                    Price
                  </th>
                  <th className="text-left p-4 font-button font-semibold text-text-muted text-sm">
                    Stock
                  </th>
                  <th className="text-left p-4 font-button font-semibold text-text-muted text-sm">
                    Rating
                  </th>
                  <th className="text-left p-4 font-button font-semibold text-text-muted text-sm">
                    Status
                  </th>
                  <th className="text-left p-4 font-button font-semibold text-text-muted text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-border-light last:border-0 hover:bg-background transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-border-DEFAULT flex-shrink-0 bg-background">
                          {product.thumbnail ? (
                            <img
                              src={product.thumbnail}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package className="w-full h-full p-2 text-text-muted" />
                          )}
                        </div>
                        <div>
                          <p className="font-body font-semibold text-text-DEFAULT text-sm line-clamp-1">
                            {product.name}
                          </p>
                          <div className="flex gap-1 mt-0.5">
                            {product.is_featured && (
                              <span className="badge-new text-xs">
                                Featured
                              </span>
                            )}
                            {product.is_best_seller && (
                              <span className="badge-bestseller text-xs">
                                Top
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-text-muted font-body text-sm">
                      {product.category?.name || "Unassigned"}
                    </td>
                    <td className="p-4 font-heading font-bold text-primary-DEFAULT">
                      ₹{product.price}
                    </td>
                    <td className="p-4">
                      <span
                        className={`font-body text-sm font-semibold ${product.stock < 20 ? "text-red-500" : product.stock < 50 ? "text-yellow-600" : "text-green-600"}`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Star
                          size={12}
                          className="fill-accent-DEFAULT text-accent-DEFAULT"
                          style={{ color: "#D4A95A", fill: "#D4A95A" }}
                        />
                        <span className="text-sm font-body">
                          {product.rating}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(product)}
                        className={`px-3 py-1 rounded-full text-xs font-button font-bold border transition-colors ${
                          product.is_active
                            ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                            : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                        }`}
                        title="Click to toggle status"
                      >
                        {product.is_active ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          className="w-8 h-8 rounded-lg border border-border-DEFAULT flex items-center justify-center text-text-muted hover:text-primary-DEFAULT hover:border-primary-DEFAULT transition-all"
                          title="View"
                        >
                          <Eye size={14} />
                        </Link>
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="w-8 h-8 rounded-lg border border-border-DEFAULT flex items-center justify-center text-text-muted hover:text-accent-DEFAULT hover:border-accent-DEFAULT transition-all"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="w-8 h-8 rounded-lg border border-border-DEFAULT flex items-center justify-center text-text-muted hover:text-red-500 hover:border-red-300 transition-all"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-12">
            <Package size={36} className="mx-auto text-text-muted mb-3" />
            <p className="font-heading text-lg text-primary-DEFAULT">
              No products found
            </p>
            <p className="font-body text-sm text-text-muted">
              Try adjusting your search filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
