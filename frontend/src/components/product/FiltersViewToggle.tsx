import React from 'react';
import { FaList, FaTh } from 'react-icons/fa';



const FiltersViewToggle = ({ view, setView }: { view: 'grid' | 'list', setView: (view: 'grid' | 'list') => void }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-3 shadow-sm gap-3">
      {/* Left Section: Item Count */}
      <div className="text-sm text-gray-600">
        12,911 items in <span className="font-semibold">Mobile accessory</span>
      </div>

      {/* Right Section: Filters and View Toggle */}
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        {/* Verified Only Checkbox */}
        <label className="flex items-center space-x-1">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-500 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">Verified only</span>
        </label>

        {/* Sorting Dropdown */}
        <select
          className="border border-gray-300 rounded p-1 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option>Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>

        {/* View Toggle Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded ${view === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
              } hover:bg-blue-600 hover:text-white transition-colors`}
          >
            <FaTh />
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
              } hover:bg-blue-600 hover:text-white transition-colors`}
          >
            <FaList />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersViewToggle;