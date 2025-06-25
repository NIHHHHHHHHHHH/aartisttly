import React, { useState, useEffect } from 'react';
import { mockArtists, artistCategories, locations, feeRanges } from '../data/mockData';
import { useAppState, useAppActions } from '../context/AppContext';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/Select"; 
import { Button } from '../components/ui/Button';
import ArtistCard from '../components/common/ArtistCard';

// Artist Listing Page component
// Displays a list of artists with filtering options (category, location, price range)
export default function ArtistListingPage() {
  // Accessing current filter state from context
  const { filters } = useAppState();

  // Accessing actions to update and reset filters
  const { setFilters, clearFilters } = useAppActions();

  // State to store the filtered list of artists
  const [filteredArtists, setFilteredArtists] = useState(mockArtists);

  // Effect to filter artists whenever the filter state changes
  useEffect(() => {
    let currentArtists = mockArtists;

    // Apply category filter if not set to "all"
    if (filters.category && filters.category !== 'all_categories' && filters.category !== '') {
      currentArtists = currentArtists.filter(artist =>
        artist.category.includes(filters.category)
      );
    }

    // Apply location filter if not set to "all"
    if (filters.location && filters.location !== 'all_locations' && filters.location !== '') {
      currentArtists = currentArtists.filter(artist =>
        artist.location === filters.location
      );
    }

    // Apply price range filter if not set to "all"
    if (filters.priceRange && filters.priceRange !== 'all_prices' && filters.priceRange !== '') {
      currentArtists = currentArtists.filter(artist =>
        artist.priceRange === filters.priceRange
      );
    }

    // Update filtered artist list
    setFilteredArtists(currentArtists);
  }, [filters]);

  // Generic handler for changing individual filter values
  const handleFilterChange = (filterName, value) => {
    setFilters({ [filterName]: value });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-inter text-gray-900 dark:text-gray-50">
      <main className="container mx-auto p-4 py-8">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-50 mb-8 text-center">Explore Artists</h2>

        {/* Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-100 mb-4">Filter Artists</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            {/* Category Filter Dropdown */}
            <div>
              <label htmlFor="category" className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2">Category</label>
              <Select
                value={filters.category || 'all_categories'}
                onValueChange={(value) => handleFilterChange('category', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_categories">All Categories</SelectItem>
                  {artistCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Filter Dropdown */}
            <div>
              <label htmlFor="location" className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2">Location</label>
              <Select
                value={filters.location || 'all_locations'}
                onValueChange={(value) => handleFilterChange('location', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_locations">All Locations</SelectItem>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range Filter Dropdown */}
            <div>
              <label htmlFor="priceRange" className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2">Price Range</label>
              <Select
                value={filters.priceRange || 'all_prices'}
                onValueChange={(value) => handleFilterChange('priceRange', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Price Ranges" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_prices">All Price Ranges</SelectItem>
                  {feeRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Button to reset all filters */}
          <Button onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>

        {/* Result Count Summary */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {filteredArtists.length} artist{filteredArtists.length !== 1 ? 's' : ''}
            {filters.category && filters.category !== 'all_categories' && ` in ${filters.category}`}
            {filters.location && filters.location !== 'all_locations' && ` from ${filters.location}`}
            {filters.priceRange && filters.priceRange !== 'all_prices' && ` in ${filters.priceRange} range`}
          </p>
        </div>

        {/* Grid Display of Artist Cards */}
        {filteredArtists.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtists.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        ) : (
          // Empty State: No matching artists found
          <div className="text-center text-gray-600 dark:text-gray-300 text-xl py-10">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p>No artists found matching your criteria.</p>
            {/* Button to quickly reset all filters in empty state */}
            <Button onClick={clearFilters} variant="secondary" className="mt-4">
              Clear All Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};
