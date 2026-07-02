import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    if (typeof window !== "undefined") {
      const token =
        localStorage.getItem("nutriroots_admin_token") ||
        localStorage.getItem("nutriroots_user_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("nutriroots_admin_token");
      localStorage.removeItem("nutriroots_user_token");

      const pathname = window.location.pathname;
      if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
        window.location.href = "/admin/login";
      } else if (pathname.startsWith("/user/dashboard")) {
        window.location.href = "/user/login";
      }
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Admin",
    "Category",
    "Product",
    "Banner",
    "Testimonial",
    "FAQ",
    "Contact",
    "Setting",
  ],
  endpoints: (builder) => ({
    // =========== Public & User Auth Endpoints ===========
    userRegister: builder.mutation({
      query: (data) => ({
        url: "/auth/user/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    userLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/user/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getUserProfile: builder.query({
      query: () => "/auth/user/me",
      providesTags: ["User"],
    }),

    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: "/auth/user/me",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // =========== Categories Endpoints ===========
    getPublicCategories: builder.query({
      query: () => "/categories?active=true",
      providesTags: ["Category"],
    }),

    getCategoryBySlug: builder.query({
      query: (slug) => `/categories/${slug}`,
      providesTags: (result, error, arg) => [{ type: "Category", id: arg }],
    }),

    // =========== Products Endpoints ===========
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        params,
      }),
      providesTags: ["Product"],
    }),

    getProductBySlug: builder.query({
      query: (slug) => `/products/${slug}`,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
    }),

    getFeaturedProducts: builder.query({
      query: () => "/products?featured=true&limit=8",
      providesTags: ["Product"],
    }),

    getBestSellers: builder.query({
      query: () => "/products?best_seller=true&limit=8",
      providesTags: ["Product"],
    }),

    // =========== Content Endpoints ===========
    getBanners: builder.query({
      query: (position) =>
        `/banners${position ? `?position=${position}` : ""}`,
      providesTags: ["Banner"],
    }),

    getTestimonials: builder.query({
      query: () => "/testimonials",
      providesTags: ["Testimonial"],
    }),

    getFAQs: builder.query({
      query: () => "/faqs",
      providesTags: ["FAQ"],
    }),

    getSettings: builder.query({
      query: () => "/settings",
      providesTags: ["Setting"],
    }),

    // =========== Contact Endpoints ===========
    submitContact: builder.mutation({
      query: (data) => ({
        url: "/contact",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),

    // =========== Admin Auth Endpoints ===========
    adminLogin: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags: ["Admin"],
    }),

    getAdminProfile: builder.query({
      query: () => "/auth/me",
      providesTags: ["Admin"],
    }),

    updateAdminPassword: builder.mutation({
      query: ({ currentPassword, newPassword }) => ({
        url: "/auth/password",
        method: "PUT",
        body: { currentPassword, newPassword },
      }),
      invalidatesTags: ["Admin"],
    }),

    // =========== Admin Category Management Endpoints ===========
    getAdminCategories: builder.query({
      query: () => "/categories",
      providesTags: ["Category"],
    }),

    createCategory: builder.mutation({
      query: (formData) => ({
        url: "/categories",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    // =========== Admin Product Management Endpoints ===========
    getAdminProducts: builder.query({
      query: (params) => ({
        url: "/products",
        params,
      }),
      providesTags: ["Product"],
    }),

    getProductById: builder.query({
      query: (id) => `/products/admin-detail/${id}`,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
    }),

    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    uploadProductImage: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/products/${id}/images`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    // =========== Admin Banner Management Endpoints ===========
    getAdminBanners: builder.query({
      query: () => "/banners",
      providesTags: ["Banner"],
    }),

    createBanner: builder.mutation({
      query: (formData) => ({
        url: "/banners",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Banner"],
    }),

    updateBanner: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/banners/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Banner"],
    }),

    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/banners/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),

    // =========== Admin Testimonials Management Endpoints ===========
    getAdminTestimonials: builder.query({
      query: () => "/testimonials",
      providesTags: ["Testimonial"],
    }),

    createTestimonial: builder.mutation({
      query: (formData) => ({
        url: "/testimonials",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Testimonial"],
    }),

    updateTestimonial: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/testimonials/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Testimonial"],
    }),

    deleteTestimonial: builder.mutation({
      query: (id) => ({
        url: `/testimonials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Testimonial"],
    }),

    // =========== Admin FAQ Management Endpoints ===========
    getAdminFAQs: builder.query({
      query: () => "/faqs",
      providesTags: ["FAQ"],
    }),

    createFAQ: builder.mutation({
      query: (data) => ({
        url: "/faqs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FAQ"],
    }),

    updateFAQ: builder.mutation({
      query: ({ id, data }) => ({
        url: `/faqs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["FAQ"],
    }),

    deleteFAQ: builder.mutation({
      query: (id) => ({
        url: `/faqs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FAQ"],
    }),

    // =========== Admin Contacts Endpoints ===========
    getContacts: builder.query({
      query: (params) => ({
        url: "/contacts",
        params,
      }),
      providesTags: ["Contact"],
    }),

    updateContactStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/contacts/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),

    // =========== Admin Settings Endpoints ===========
    getAdminSettings: builder.query({
      query: () => "/settings",
      providesTags: ["Setting"],
    }),

    updateSettings: builder.mutation({
      query: (data) => ({
        url: "/settings",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetPublicCategoriesQuery,
  useGetCategoryBySlugQuery,
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useGetFeaturedProductsQuery,
  useGetBestSellersQuery,
  useGetBannersQuery,
  useGetTestimonialsQuery,
  useGetFAQsQuery,
  useGetSettingsQuery,
  useSubmitContactMutation,
  useAdminLoginMutation,
  useGetAdminProfileQuery,
  useUpdateAdminPasswordMutation,
  useGetAdminCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAdminProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadProductImageMutation,
  useGetAdminBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
  useGetAdminTestimonialsQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
  useGetAdminFAQsQuery,
  useCreateFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
  useGetContactsQuery,
  useUpdateContactStatusMutation,
  useGetAdminSettingsQuery,
  useUpdateSettingsMutation,
} = apiSlice;
