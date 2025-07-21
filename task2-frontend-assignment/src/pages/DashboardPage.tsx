import { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import ProductsGrid from '../components/ProductsGrid';
import { getProducts, getCategories } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { Product, SortOption } from '../types';
import { FiLoader } from 'react-icons/fi';
import { PRODUCTS_PER_PAGE, STORAGE_KEYS } from '../constants';
import { debounce } from '../utils';

const DashboardPage = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('name');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    // We don't show welcome message here anymore
  }, [isAuthenticated, navigate]);

  // Show welcome message only on initial render when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Use a key in localStorage to prevent showing multiple toasts on re-renders
      const toastShown = sessionStorage.getItem(STORAGE_KEYS.WELCOME_TOAST);
      if (!toastShown) {
        toast.success(`Welcome back, ${user.firstName || 'User'}!`);
        sessionStorage.setItem(STORAGE_KEYS.WELCOME_TOAST, 'true');
      }
    }
  }, []);

  // Fetch all products on initial load
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setIsInitialLoading(true);
        console.log('Starting to fetch products...');
        
        // Fetch all products (maximum allowed by API)
        const response = await getProducts(100, 0);
        console.log('Products fetched successfully:', response);
        
        if (response && response.products) {
          console.log(`Found ${response.products.length} products`);
          setAllProducts(response.products);
          setFilteredProducts(response.products);
          setHasMore(false);  // We've loaded all products at once for client-side filtering
        } else {
          console.error('Invalid product response format:', response);
          toast.error('Received invalid product data from server.');
        }
      } catch (error) {
        toast.error('Failed to fetch products. Please try again.');
        console.error('Error fetching products:', error);
        
        // Fallback: Load dummy products if API fails
        const dummyProducts = Array(6).fill(0).map((_, index) => ({
          id: index + 1,
          title: `Sample Product ${index + 1}`,
          description: 'This is a sample product for demonstration',
          price: 100 + index * 10,
          discountPercentage: 5,
          rating: 4.5,
          stock: 100,
          brand: 'Demo Brand',
          category: 'electronics',
          thumbnail: `https://via.placeholder.com/150?text=Product+${index + 1}`,
          images: [`https://via.placeholder.com/640x360?text=Product+${index + 1}`]
        }));
        
        setAllProducts(dummyProducts);
        setFilteredProducts(dummyProducts);
      } finally {
        setIsInitialLoading(false);
        setIsLoading(false);
      }
    };

    // Fetch categories
    const fetchCategories = async () => {
      try {
        console.log('Fetching categories...');
        const categoriesData = await getCategories();
        console.log('Categories fetched:', categoriesData);
        
        // Ensure all categories are strings
        if (Array.isArray(categoriesData)) {
          const validCategories = categoriesData.filter(cat => cat !== null && cat !== undefined)
            .map(cat => String(cat));
          setCategories(['all', ...validCategories]);
        } else {
          console.error('Categories data is not an array:', categoriesData);
          setCategories(['all', 'electronics', 'clothing', 'furniture', 'other']);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Set default categories if API fails
        setCategories(['all', 'electronics', 'clothing', 'furniture', 'other']);
      }
    };

    if (isAuthenticated) {
      console.log('User is authenticated, fetching products and categories');
      fetchAllProducts();
      fetchCategories();
    } else {
      console.log('User is not authenticated, skipping API calls');
    }
  }, [isAuthenticated]);

  // Filter and sort products based on search query, category, and sort option
  useEffect(() => {
    try {
      setIsLoading(true);
      console.log('Filtering products with:', { 
        searchQuery, 
        selectedCategory, 
        totalProducts: allProducts.length 
      });
      
      // Filter by search query
      let filtered = [...allProducts];
      
      if (searchQuery && typeof searchQuery === 'string') {
        const query = searchQuery.toLowerCase();
        console.log('Applying search filter with query:', query);
        
        filtered = filtered.filter(product => {
          try {
            // Safely access properties with null checks
            const title = (product.title || '').toLowerCase();
            const description = (product.description || '').toLowerCase();
            const category = (product.category || '').toLowerCase();
            const brand = (product.brand || '').toLowerCase();
            
            return title.includes(query) || 
                  description.includes(query) || 
                  category.includes(query) ||
                  brand.includes(query);
          } catch (e) {
            console.error('Error filtering product:', e);
            return false;
          }
        });
        
        console.log(`Found ${filtered.length} products matching search: "${searchQuery}"`);
      }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
      console.log(`Found ${filtered.length} products in category: ${selectedCategory}`);
    }
    
    // Sort products
    switch (sortOption) {
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }
    
    setFilteredProducts(filtered);
    
    // Reset pagination when filters change
    setCurrentPage(0);
    setHasMore(filtered.length > PRODUCTS_PER_PAGE);
    
    // Get first page of products
    const firstPageProducts = filtered.slice(0, PRODUCTS_PER_PAGE);
    setDisplayedProducts(firstPageProducts);
    
    setIsLoading(false);
    
    } catch (error) {
      console.error('Error in product filtering:', error);
      // Recovery: set some default products if available
      if (allProducts.length > 0) {
        setFilteredProducts(allProducts);
        setDisplayedProducts(allProducts.slice(0, PRODUCTS_PER_PAGE));
      }
      setIsLoading(false);
    }
  }, [allProducts, searchQuery, sortOption, selectedCategory]);

  const handleSearch = (query: string) => {
    try {
      console.log('Search query received in DashboardPage:', query);
      
      // Safely handle the query (ensure it's a string)
      const safeQuery = typeof query === 'string' ? query : '';
      
      // Update the search state (this will trigger the filter effect)
      setSearchQuery(safeQuery);
      
      // Reset pagination when searching
      setCurrentPage(0);
      
      console.log('Search state updated, filtering should apply');
    } catch (error) {
      console.error('Error handling search in DashboardPage:', error);
      // Reset search on error to recover
      setSearchQuery('');
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };
  
  const handleLoadMore = () => {
    setIsLoading(true);
    
    const nextPage = currentPage + 1;
    const startIndex = nextPage * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    
    // Get next page of products
    const nextPageProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Update displayed products with the next page
    setDisplayedProducts(prev => [...prev, ...nextPageProducts]);
    
    // Update pagination state
    setCurrentPage(nextPage);
    setHasMore(endIndex < filteredProducts.length);
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onSearch={handleSearch} />
      
      <main className="flex-grow">
        {/* Category filters */}
        {categories.length > 0 && (
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                // Ensure category is a string
                const categoryStr = String(category);
                return (
                  <button
                    key={categoryStr}
                    className={`px-3 py-1.5 text-sm rounded-full transition ${
                      selectedCategory === categoryStr
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                    onClick={() => handleCategoryChange(categoryStr)}
                  >
                    {categoryStr.charAt(0).toUpperCase() + categoryStr.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        
        {isInitialLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center">
              <FiLoader className="animate-spin h-12 w-12 text-blue-600" />
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          </div>
        ) : (
          <ProductsGrid
            products={displayedProducts}
            isLoading={isLoading}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            onSortChange={handleSortChange}
            currentSort={sortOption}
          />
        )}
      </main>
      
      <footer className="bg-white shadow-inner mt-auto">
        <div className="container mx-auto p-4 text-center text-gray-600 text-sm">
          <p>© 2025 ProductHub. Created for demonstration purposes.</p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
