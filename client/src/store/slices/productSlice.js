import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";

const initialState = {
  items: [],
  featuredProducts: [],
  bestSellers: [],
  currentProduct: null,
  relatedProducts: [],
  loading: false,
  error: null,
  pagination: { total: 0, page: 1, limit: 12, totalPages: 0 },
  filters: { category: "", search: "", sort: "created_at", order: "DESC" },
};

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (params = {}) => {
    const response = await api.get("/products", { params });
    return response.data;
  },
);

export const fetchFeaturedProducts = createAsyncThunk(
  "products/fetchFeatured",
  async () => {
    const response = await api.get("/products", {
      params: { featured: "true", limit: 8 },
    });
    return response.data.data;
  },
);

export const fetchBestSellers = createAsyncThunk(
  "products/fetchBestSellers",
  async () => {
    const response = await api.get("/products", {
      params: { best_seller: "true", limit: 8 },
    });
    return response.data.data;
  },
);

export const fetchProductBySlug = createAsyncThunk(
  "products/fetchBySlug",
  async (slug) => {
    const response = await api.get(`/products/${slug}`);
    return response.data;
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredProducts = action.payload;
      })
      .addCase(fetchBestSellers.fulfilled, (state, action) => {
        state.bestSellers = action.payload;
      })
      .addCase(fetchProductBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload.data;
        state.relatedProducts = action.payload.related || [];
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Product not found";
      });
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
