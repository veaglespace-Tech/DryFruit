import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@/lib/api';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  original_price?: number;
  discount_percent: number;
  weight: string;
  thumbnail: string;
  rating: number;
  review_count: number;
  is_featured: boolean;
  is_best_seller: boolean;
  category: { id: number; name: string; slug: string };
  images?: Array<{ image_url: string; alt_text: string; is_primary: boolean }>;
}

interface ProductState {
  items: Product[];
  featuredProducts: Product[];
  bestSellers: Product[];
  currentProduct: Product | null;
  relatedProducts: Product[];
  loading: boolean;
  error: string | null;
  pagination: { total: number; page: number; limit: number; totalPages: number };
  filters: { category: string; search: string; sort: string; order: string };
}

const initialState: ProductState = {
  items: [],
  featuredProducts: [],
  bestSellers: [],
  currentProduct: null,
  relatedProducts: [],
  loading: false,
  error: null,
  pagination: { total: 0, page: 1, limit: 12, totalPages: 0 },
  filters: { category: '', search: '', sort: 'created_at', order: 'DESC' },
};

export const fetchProducts = createAsyncThunk('products/fetchAll', async (params: Record<string, string | number> = {}) => {
  const response = await api.get('/products', { params });
  return response.data;
});

export const fetchFeaturedProducts = createAsyncThunk('products/fetchFeatured', async () => {
  const response = await api.get('/products', { params: { featured: 'true', limit: 8 } });
  return response.data.data;
});

export const fetchBestSellers = createAsyncThunk('products/fetchBestSellers', async () => {
  const response = await api.get('/products', { params: { best_seller: 'true', limit: 8 } });
  return response.data.data;
});

export const fetchProductBySlug = createAsyncThunk('products/fetchBySlug', async (slug: string) => {
  const response = await api.get(`/products/${slug}`);
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ProductState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => { state.featuredProducts = action.payload; })
      .addCase(fetchBestSellers.fulfilled, (state, action) => { state.bestSellers = action.payload; })
      .addCase(fetchProductBySlug.pending, (state) => { state.loading = true; })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload.data;
        state.relatedProducts = action.payload.related || [];
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Product not found';
      });
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
