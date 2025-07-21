import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { debounce } from '../utils';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Debounced search handler
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (onSearch) {
        console.log('Debounced search triggered with:', query);
        onSearch(query);
      }
    }, 500),
    [onSearch]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Search form submitted with query:', searchQuery);
      if (onSearch) {
        // Ensure we're not passing undefined or null
        const trimmedQuery = searchQuery?.trim() || '';
        console.log('Passing search query to parent:', trimmedQuery);
        onSearch(trimmedQuery);
      }
    } catch (error) {
      console.error('Error in search handling:', error);
    }
  };
  
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value.trim());
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 
          className="text-2xl font-bold text-blue-600 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          ProductHub
        </h1>
        
        {onSearch && (
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={handleSearchInput}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                <FiSearch size={20} />
              </button>
            </div>
          </form>
        )}

        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.firstName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiUser className="text-gray-600" />
                )}
              </div>
              <span className="text-sm font-medium hidden md:block">
                {user.firstName} {user.lastName}
              </span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <FiLogOut />
              <span className="hidden md:block">Logout</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
