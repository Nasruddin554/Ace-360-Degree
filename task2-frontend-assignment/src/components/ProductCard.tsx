import { FiStar, FiTag, FiShoppingCart } from 'react-icons/fi';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { title, price, description, thumbnail, rating, discountPercentage, brand, category } = product;

  // Calculate discounted price
  const discountedPrice = price * (1 - discountPercentage / 100);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 flex items-center">
            <FiTag className="mr-1" size={12} />
            {discountPercentage.toFixed(0)}% OFF
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{title}</h3>
          <div className="flex items-center bg-yellow-50 px-2 py-0.5 rounded-full">
            <FiStar className="text-yellow-400 mr-1" size={14} />
            <span className="font-medium text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-3 flex-grow">{description}</p>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 font-medium">{brand}</span>
            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">{category}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-lg text-gray-800">
                ${discountedPrice.toFixed(2)}
              </p>
              {discountPercentage > 0 && (
                <p className="text-xs text-gray-500 line-through">
                  ${price.toFixed(2)}
                </p>
              )}
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
              <FiShoppingCart size={14} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
