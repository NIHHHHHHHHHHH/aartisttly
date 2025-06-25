import React, {useState, useRef, useEffect} from 'react';
import {Button} from './Button';
import {Checkbox } from './Checkbox';

// Custom Multi-select Dropdown with Checkboxes
export default function MultiSelectDropdown({ label, options = [], selectedValues = [], onToggle, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2">{label}</label>
      <Button
        type="button"
        variant="outline"
        className="w-full text-left flex justify-between items-center text-gray-700 dark:text-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValues.length > 0 ? selectedValues.join(', ') : `Select ${label.toLowerCase()}`}
        <svg className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </Button>
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 max-h-60 overflow-auto">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
               <Checkbox
                    checked={selectedValues.includes(option)}
                    onCheckedChange={(checked) => {
                      onToggle && onToggle(option);
                    }}
                    className="mr-3"
                    aria-label={`Toggle ${option}`}
                  />
                <span className="ml-3 text-gray-900 dark:text-gray-50">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};



