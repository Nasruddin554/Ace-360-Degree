/**
 * Utility functions for the application
 */

/**
 * Check if a JWT token is expired
 * @param token - The JWT token to check
 * @returns boolean - True if token is expired, false otherwise
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    // For demo purposes - in a real app, decode and check expiration
    if (!token) return true;
    
    // Simple check for our mock token
    if (token.includes('mockSignature')) {
      return false;
    }
    
    // For real tokens, decode and check exp claim
    // const decoded = jwtDecode(token);
    // const currentTime = Date.now() / 1000;
    // return decoded.exp < currentTime;
    
    return false;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true; // Assume expired on error
  }
};

/**
 * Format a price with currency symbol
 * @param price - The price to format
 * @param currency - The currency symbol (default: '$')
 * @returns string - Formatted price
 */
export const formatPrice = (price: number, currency = '$'): string => {
  return `${currency}${price.toFixed(2)}`;
};

/**
 * Debounce function for search inputs
 * @param func - The function to debounce
 * @param wait - Time to wait in milliseconds
 * @returns Function - Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T, 
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
