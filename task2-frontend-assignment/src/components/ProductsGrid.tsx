import ProductCard from './ProductCard';
import type { Product, SortOption } from '../types';
import { useState } from 'react';
import { FiFilter, FiSliders } from 'react-icons/fi';

interface ProductsGridProps {
  products: Product[];
  isLoading: boolean;
  onLoadMore?: () => void;
  hasMore: boolean;
  onSortChange: (sortOption: SortOption) => void;
  currentSort: SortOption;
}

const ProductsGrid = ({
  products,
  isLoading,
  onLoadMore,
  hasMore,
  onSortChange,
  currentSort,
}: ProductsGridProps) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Safety check - ensure products is an array
  const safeProducts = Array.isArray(products) ? products : [];
  
  if (isLoading && safeProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {products.length} Products
        </h2>
        
        {/* Desktop Sort */}
        <div className="hidden md:flex items-center gap-2">
          <FiSliders className="text-gray-500" />
          <span className="text-gray-600 font-medium">Sort by:</span>
          <select
            value={currentSort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="border-0 py-1 pl-2 pr-8 text-gray-700 bg-transparent focus:outline-none focus:ring-0"
          >
            <option value="name">Name</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        
        {/* Mobile Filter Button */}
        <button 
          className="md:hidden flex items-center gap-1 py-2 px-3 border border-gray-300 rounded-lg"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          <FiFilter size={16} />
          <span>Filter</span>
        </button>
      </div>
      
      {/* Mobile Filter Dropdown */}
      {isMobileFilterOpen && (
        <div className="mb-4 p-4 bg-white rounded-lg shadow-md md:hidden">
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-gray-800">Sort by:</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Name', value: 'name' },
                { label: 'Price: Low to High', value: 'price-asc' },
                { label: 'Price: High to Low', value: 'price-desc' },
                { label: 'Rating', value: 'rating' },
              ].map((option) => (
                <button
                  key={option.value}
                  className={`px-3 py-1 rounded-full text-sm ${
                    currentSort === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                  onClick={() => {
                    onSortChange(option.value as SortOption);
                    setIsMobileFilterOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {safeProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <img
            src="https://illustrations.popsy.co/amber/no-results-found.svg"
            alt="No products found"
            className="w-64 h-64 mb-6"
          />
          <h3 className="text-xl font-medium text-gray-800 mb-2">No products found</h3>
          <p className="text-gray-600 text-center">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {safeProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {onLoadMore && hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={onLoadMore}
                disabled={isLoading}
                className="px-6 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsGrid;
