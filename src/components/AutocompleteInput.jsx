import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

const AutocompleteInput = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Update searchTerm when value prop changes
  useEffect(() => {
    setSearchTerm(value || "");
  }, [value]);

  // Filter options based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [searchTerm, options]);

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);

    // If exact match found, use it, otherwise use the typed value
    const exactMatch = options.find(
      (option) => option.toLowerCase() === newValue.toLowerCase()
    );
    onChange(exactMatch || newValue);
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    setSearchTerm(option);
    onChange(option);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleOptionSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Clear input
  const handleClear = () => {
    setSearchTerm("");
    onChange("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        listRef.current &&
        !listRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder={placeholder}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown Suggestions */}
        {isOpen && filteredOptions.length > 0 && (
          <div
            ref={listRef}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            {filteredOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={`px-4 py-3 cursor-pointer transition-colors ${
                  index === highlightedIndex
                    ? "bg-blue-100 text-blue-800"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="text-sm">
                  {/* Highlight matching text */}
                  {searchTerm ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: option.replace(
                          new RegExp(`(${searchTerm})`, "gi"),
                          '<mark class="bg-yellow-200">$1</mark>'
                        ),
                      }}
                    />
                  ) : (
                    option
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No results message */}
        {isOpen && searchTerm && filteredOptions.length === 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
            <div className="text-gray-500 text-sm text-center">
              No topics found for "{searchTerm}"
            </div>
          </div>
        )}
      </div>

      {/* Show selected value indicator */}
      {value && options.includes(value) && (
        <div className="mt-1 text-xs text-green-600 flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Topic selected
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;
