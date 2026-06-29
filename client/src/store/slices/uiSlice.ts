import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  isMobileNavOpen: boolean;
  activeModal: string | null;
  notification: { message: string; type: 'success' | 'error' | 'info' } | null;
}

const initialState: UIState = {
  isMenuOpen: false,
  isSearchOpen: false,
  isMobileNavOpen: false,
  activeModal: null,
  notification: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMenu: (state) => { state.isMenuOpen = !state.isMenuOpen; },
    setMenuOpen: (state, action: PayloadAction<boolean>) => { state.isMenuOpen = action.payload; },
    toggleSearch: (state) => { state.isSearchOpen = !state.isSearchOpen; },
    setSearchOpen: (state, action: PayloadAction<boolean>) => { state.isSearchOpen = action.payload; },
    toggleMobileNav: (state) => { state.isMobileNavOpen = !state.isMobileNavOpen; },
    setMobileNavOpen: (state, action: PayloadAction<boolean>) => { state.isMobileNavOpen = action.payload; },
    openModal: (state, action: PayloadAction<string>) => { state.activeModal = action.payload; },
    closeModal: (state) => { state.activeModal = null; },
    showNotification: (state, action: PayloadAction<UIState['notification']>) => { state.notification = action.payload; },
    clearNotification: (state) => { state.notification = null; },
  },
});

export const {
  toggleMenu, setMenuOpen, toggleSearch, setSearchOpen,
  toggleMobileNav, setMobileNavOpen, openModal, closeModal,
  showNotification, clearNotification,
} = uiSlice.actions;

export default uiSlice.reducer;
