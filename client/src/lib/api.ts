import axios from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor - attach admin or user token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('nutriroots_admin_token') || localStorage.getItem('nutriroots_user_token');
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('nutriroots_admin_token');
      localStorage.removeItem('nutriroots_user_token');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      } else if (window.location.pathname.startsWith('/user/dashboard')) {
        window.location.href = '/user/login';
      }
    }
    return Promise.reject(error);
  }
);

// =========== Public API ===========
export const publicApi = {
  // User Auth
  register: (data: Record<string, string>) => api.post('/auth/user/register', data),
  login: (data: Record<string, string>) => api.post('/auth/user/login', data),
  getProfile: () => api.get('/auth/user/me'),
  updateProfile: (data: Record<string, string>) => api.put('/auth/user/me', data),

  // Categories

  getCategories: () => api.get('/categories?active=true'),
  getCategoryBySlug: (slug: string) => api.get(`/categories/${slug}`),

  // Products
  getProducts: (params?: Record<string, string | number>) => api.get('/products', { params }),
  getProductBySlug: (slug: string) => api.get(`/products/${slug}`),
  getFeaturedProducts: () => api.get('/products?featured=true&limit=8'),
  getBestSellers: () => api.get('/products?best_seller=true&limit=8'),

  // Content
  getBanners: (position?: string) => api.get(`/banners${position ? `?position=${position}` : ''}`),
  getTestimonials: () => api.get('/testimonials'),
  getFAQs: () => api.get('/faqs'),
  getSettings: () => api.get('/settings'),

  // Contact
  submitContact: (data: Record<string, string>) => api.post('/contact', data),
};

// =========== Admin API ===========
export const adminApi = {
  // Auth
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  getMe: () => api.get('/auth/me'),
  updatePassword: (currentPassword: string, newPassword: string) => api.put('/auth/password', { currentPassword, newPassword }),

  // Categories
  getCategories: () => api.get('/categories'),
  createCategory: (data: FormData) => api.post('/categories', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateCategory: (id: number, data: FormData) => api.put(`/categories/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteCategory: (id: number) => api.delete(`/categories/${id}`),

  // Products
  getProducts: (params?: Record<string, string | number>) => api.get('/products', { params }),
  createProduct: (data: FormData) => api.post('/products', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateProduct: (id: number, data: FormData) => api.put(`/products/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteProduct: (id: number) => api.delete(`/products/${id}`),
  uploadProductImage: (id: number, data: FormData) => api.post(`/products/${id}/images`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),

  // Banners
  getBanners: () => api.get('/banners'),
  createBanner: (data: FormData) => api.post('/banners', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateBanner: (id: number, data: FormData) => api.put(`/banners/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteBanner: (id: number) => api.delete(`/banners/${id}`),

  // Testimonials
  getTestimonials: () => api.get('/testimonials'),
  createTestimonial: (data: FormData) => api.post('/testimonials', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateTestimonial: (id: number, data: FormData) => api.put(`/testimonials/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteTestimonial: (id: number) => api.delete(`/testimonials/${id}`),

  // FAQs
  getFAQs: () => api.get('/faqs'),
  createFAQ: (data: Record<string, string | number>) => api.post('/faqs', data),
  updateFAQ: (id: number, data: Record<string, string | number>) => api.put(`/faqs/${id}`, data),
  deleteFAQ: (id: number) => api.delete(`/faqs/${id}`),

  // Contacts
  getContacts: (params?: Record<string, string | number>) => api.get('/contacts', { params }),
  updateContactStatus: (id: number, data: { status: string; admin_notes?: string }) => api.put(`/contacts/${id}`, data),

  // Settings
  getSettings: () => api.get('/settings'),
  updateSettings: (data: Record<string, string>) => api.put('/settings', data),
};
