'use client';
import React from 'react';
import { useAppActions } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { artistCategories } from '../data/mockData';
import { 
  Mic, 
  Users, 
  MessageSquare, 
  Headphones, 
  Smile, 
  Wand2, 
  Music 
} from 'lucide-react';

// Maps each category to a specific Lucide icon component
const getCategoryIcon = (category) => {
  const iconProps = { size: 48, className: "text-indigo-600 dark:text-indigo-400 mb-4" };

  switch (category) {
    case 'Singer': return <Mic {...iconProps} />;
    case 'Dancer': return <Users {...iconProps} />;
    case 'Speaker': return <MessageSquare {...iconProps} />;
    case 'DJ': return <Headphones {...iconProps} />;
    case 'Comedian': return <Smile {...iconProps} />;
    case 'Magician': return <Wand2 {...iconProps} />;
    case 'Musician': return <Music {...iconProps} />;
    default: return <Music {...iconProps} />; // Fallback icon
  }
};

// Homepage component that serves as the landing page for users
export default function HomePage() {
  const { navigate, navigateWithFilters } = useAppActions();

  // Navigate to artist listing with selected category applied as a filter
  const handleCategoryClick = (category) => {
    navigateWithFilters('artists', { category, location: '', priceRange: '' });
  };

  // Navigate to artist listing page with no filters (show all)
  const handleExploreArtists = () => {
    navigateWithFilters('artists', { category: '', location: '', priceRange: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-inter text-gray-900 dark:text-gray-50">
      <main className="container mx-auto p-4 py-8">

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl shadow-lg p-8 md:p-16 mb-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 animate-fade-in">
              Discover & Book Incredible Performing Artists
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 opacity-90 animate-slide-in-up max-w-2xl mx-auto lg:mx-0">
              Connecting Event Planners with Top Talent Worldwide.
            </p>
            <Button onClick={handleExploreArtists} size="xl">
              Explore Artists
            </Button>
          </div>

          {/* Hero Image */}
          <div className="flex-shrink-0 flex justify-center items-center">
            <div className="relative group">
              <img 
                src="/images/artistlyImage.png" 
                alt="Creative performance illustration"
                className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-cover rounded-full shadow-2xl border-4 border-white/20 group-hover:scale-105 transition-all duration-300 group-hover:shadow-3xl"
              />
              {/* Decorative gradient overlay on image */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-purple-900/20 group-hover:to-purple-900/30 transition-all duration-300"></div>
            </div>
          </div>
        </section>

        {/* Artist Categories Section */}
        <section className="mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-50 mb-8 text-center">
            Popular Artist Categories
          </h3>

          {/* Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {artistCategories.map((category) => (
              <div
                key={category}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 text-center transform hover:scale-105 transition duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 hover:shadow-lg"
                onClick={() => handleCategoryClick(category)}
              >
                {/* Icon representing the category */}
                <div className="flex justify-center">
                  {getCategoryIcon(category)}
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-100">
                  {category}
                </h4>
                <p className="text-gray-500 dark:text-gray-300 text-sm mt-2">
                  Explore {category.toLowerCase()}s for your event.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-indigo-100 dark:bg-indigo-900 rounded-xl shadow-lg p-6 sm:p-8 md:p-12 text-center mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-indigo-800 dark:text-indigo-200 mb-4">
            Ready to find the perfect artist?
          </h3>
          <p className="text-base sm:text-lg text-indigo-700 dark:text-indigo-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Browse our extensive directory or onboard your own talent today!
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={handleExploreArtists} size="lg">
              Find Artists
            </Button>
            <Button onClick={() => navigate('onboard')} size="lg">
              Onboard Your Talent
            </Button>
          </div>
        </section>

      </main>
    </div>
  );
};
