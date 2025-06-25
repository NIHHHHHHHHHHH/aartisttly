import React from 'react';
import {Button} from '../ui/Button';
import { MapPin, DollarSign } from 'lucide-react';

/**
 * ArtistCard Component
 *
 * This component displays a card for an individual artist, showcasing their name,
 * category, location, price range, and a call to action to "Ask for Quote".
 * It includes a placeholder image/initials display with a fallback for image loading errors.

 */
export default function ArtistCard({ artist }) {
  return (
    // Card container with styling for background, shadow, rounded corners, and hover effects.
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out border border-gray-200 dark:border-gray-700">
      {/* Header section with a gradient background, used for displaying artist initials or a placeholder image. */}
      <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        {/* Displays the initials of the artist's name as a fallback or placeholder. */}
        <div className="text-white text-5xl font-bold">
          {/* Extracts the first letter of each word in the artist's name to form initials. */}
          {artist.name.split(' ').map(n => n[0]).join('')}
        </div>
        {/* Placeholder image for the artist. */}
        <img
          // Constructs a placeholder image URL using the artist's initials.
          src={`https://placehold.co/400x300/6366F1/FFFFFF?text=${artist.name.split(' ').map(n => n[0]).join('')}`}
          alt={`${artist.name} profile`}
          // Styling for the image to cover the container with slight opacity.
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          // Fallback in case the image fails to load, replaces the src with the same placeholder.
          onError={(e) => { e.target.src = `https://placehold.co/400x300/6366F1/FFFFFF?text=${artist.name.split(' ').map(n => n[0]).join('')}`; }} // Fallback
        />
      </div>
      {/* Content section of the artist card. */}
      <div className="p-6">
        {/* Artist's name displayed as a prominent heading. */}
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-50 mb-2">{artist.name}</h3>
        {/* Artist's category, joined by a comma if multiple categories exist. */}
        <p className="text-indigo-600 dark:text-indigo-400 text-md mb-2">
          {artist.category.join(', ')}
        </p>
        {/* Artist's location, displayed with a map pin icon. */}
        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-1">
          <MapPin className="w-4 h-4 mr-2" />
          {artist.location}
        </div>
        {/* Artist's price range, displayed with a dollar sign icon. */}
        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-4">
          <DollarSign className="w-4 h-4 mr-2" />
          {artist.priceRange}
        </div>
        {/* Button to "Ask for Quote" for the artist. */}
        <Button className="w-full">
          Ask for Quote
        </Button>
      </div>
    </div>
  );
};

