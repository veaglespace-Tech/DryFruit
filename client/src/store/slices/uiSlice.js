import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuOpen: false,
  isSearchOpen: false,
  isMobileNavOpen: false,
  activeModal: null,
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setMenuOpen: (state, action) => {
      state.isMenuOpen = action.payload;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    setSearchOpen: (state, action) => {
      state.isSearchOpen = action.payload;
    },
    toggleMobileNav: (state) => {
      state.isMobileNavOpen = !state.isMobileNavOpen;
    },
    setMobileNavOpen: (state, action) => {
      state.isMobileNavOpen = action.payload;
    },
    openModal: (state, action) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
    showNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const {
  toggleMenu,
  setMenuOpen,
  toggleSearch,
  setSearchOpen,
  toggleMobileNav,
  setMobileNavOpen,
  openModal,
  closeModal,
  showNotification,
  clearNotification,
} = uiSlice.actions;

export default uiSlice.reducer;
