import { useState } from 'react';
import { Search as SearchIcon, MapPin } from 'lucide-react';
import { useAppDispatch } from '../../store';
import { setSearchTerm, setLocation } from '../../store/slices/tasksSlice';

interface SearchBarProps {
  onSearch?: (term: string, location?: string) => void;
  className?: string;
}

function SearchBar({ onSearch, className = '' }: SearchBarProps) {
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [showLocationInput, setShowLocationInput] = useState(false);

  const handleSearch = () => {
    dispatch(setSearchTerm(searchInput));
    if (locationInput) {
      dispatch(setLocation(locationInput));
    }
    
    if (onSearch) {
      onSearch(searchInput, locationInput);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <div className="flex flex-col space-y-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search tasks, keywords, or tags"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        
        {showLocationInput ? (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MapPin size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Enter location (university, department)"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        ) : (
          <button
            onClick={() => setShowLocationInput(true)}
            className="flex items-center text-gray-600 text-sm hover:text-secondary transition-default"
          >
            <MapPin size={16} className="mr-2" />
            Add location filter
          </button>
        )}
        
        <button
          onClick={handleSearch}
          className="w-full bg-secondary hover:bg-opacity-90 text-white py-2 rounded-md transition-default"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
