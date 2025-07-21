/**
 * Application-wide constants
 */

// Toast configuration
export const TOAST_CONFIG = {
  position: "top-right" as const,
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "light" as const,
};

// Pagination
export const PRODUCTS_PER_PAGE = 12;

// Sort options
export const SORT_OPTIONS = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
  { value: 'rating', label: 'Rating (Highest)' },
];

// Local storage keys
export const STORAGE_KEYS = {
  USER: 'user',
  TOKEN: 'token',
  WELCOME_TOAST: 'welcomeToastShown',
};
