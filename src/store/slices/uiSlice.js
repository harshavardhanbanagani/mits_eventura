import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: localStorage.getItem('theme') || 'light',
    sidebarOpen: false,
    mobileMenuOpen: false,
    loading: {
      global: false,
      page: false,
      component: {},
    },
    modals: {
      eventDetails: false,
      registrationForm: false,
      paymentConfirmation: false,
      deleteConfirmation: false,
    },
    activeModal: null,
    modalData: null,
    toasts: [],
    searchQuery: '',
    currentPage: '',
    breadcrumbs: [],
    filters: {
      isOpen: false,
      activeFilters: 0,
    },
    preferences: {
      tablePageSize: 10,
      compactView: false,
      autoRefresh: true,
      notifications: true,
    },
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action) => {
      state.mobileMenuOpen = action.payload;
    },
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload;
    },
    setPageLoading: (state, action) => {
      state.loading.page = action.payload;
    },
    setComponentLoading: (state, action) => {
      const { component, loading } = action.payload;
      state.loading.component[component] = loading;
    },
    openModal: (state, action) => {
      const { modalName, data } = action.payload;
      state.modals[modalName] = true;
      state.activeModal = modalName;
      state.modalData = data || null;
    },
    closeModal: (state, action) => {
      const modalName = action.payload;
      if (modalName) {
        state.modals[modalName] = false;
      } else {
        // Close all modals
        Object.keys(state.modals).forEach(key => {
          state.modals[key] = false;
        });
        state.activeModal = null;
        state.modalData = null;
      }
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(key => {
        state.modals[key] = false;
      });
      state.activeModal = null;
      state.modalData = null;
    },
    addToast: (state, action) => {
      const toast = {
        id: Date.now() + Math.random(),
        timestamp: Date.now(),
        autoClose: true,
        duration: 5000,
        ...action.payload,
      };
      state.toasts.push(toast);
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setBreadcrumbs: (state, action) => {
      state.breadcrumbs = action.payload;
    },
    toggleFilters: (state) => {
      state.filters.isOpen = !state.filters.isOpen;
    },
    setFiltersOpen: (state, action) => {
      state.filters.isOpen = action.payload;
    },
    setActiveFiltersCount: (state, action) => {
      state.filters.activeFilters = action.payload;
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
      localStorage.setItem('userPreferences', JSON.stringify(state.preferences));
    },
    loadPreferences: (state) => {
      const saved = localStorage.getItem('userPreferences');
      if (saved) {
        state.preferences = { ...state.preferences, ...JSON.parse(saved) };
      }
    },
  },
});

export const {
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  toggleMobileMenu,
  setMobileMenuOpen,
  setGlobalLoading,
  setPageLoading,
  setComponentLoading,
  openModal,
  closeModal,
  closeAllModals,
  addToast,
  removeToast,
  clearToasts,
  setSearchQuery,
  setCurrentPage,
  setBreadcrumbs,
  toggleFilters,
  setFiltersOpen,
  setActiveFiltersCount,
  updatePreferences,
  loadPreferences,
} = uiSlice.actions;

export default uiSlice.reducer;