export const mockArtists = [
  { id: 'a1', name: 'Melody Queen', category: ['Singer'], priceRange: '$1000 - $2000', location: 'Mumbai', bio: 'A captivating singer with a powerful voice.' },
  { id: 'a2', name: 'Rhythmic Feet', category: ['Dancer'], priceRange: '$500 - $1000', location: 'Delhi', bio: 'Dynamic dancer specializing in classical and contemporary forms.' },
  { id: 'a3', name: 'Inspire Speaker', category: ['Speaker'], priceRange: '$2000 - $5000', location: 'Bangalore', bio: 'Motivating public speaker and corporate trainer.' },
  { id: 'a4', name: 'Beat Master', category: ['DJ'], priceRange: '$1000 - $2000', location: 'Mumbai', bio: 'Energetic DJ known for electrifying dance floors.' },
  { id: 'a5', name: 'Vocal Virtuoso', category: ['Singer', 'Speaker'], priceRange: '$2000 - $5000', location: 'Chennai', bio: 'Versatile artist, excels in singing and inspirational speaking.' },
  { id: 'a6', name: 'Dance Diva', category: ['Dancer'], priceRange: '$500 - $1000', location: 'Hyderabad', bio: 'Award-winning dancer with graceful movements.' },
  { id: 'a7', name: 'Comedy King', category: ['Comedian'], priceRange: '$500 - $1000', location: 'Pune', bio: 'Stand-up comedian with witty observations.' },
  { id: 'a8', name: 'Magic Mike', category: ['Magician'], priceRange: '$1000 - $2000', location: 'Kolkata', bio: 'Illusionist creating wonder and amazement.' },
  { id: 'a9', name: 'Instrumentalist', category: ['Musician'], priceRange: '$500 - $1000', location: 'Goa', bio: 'Master of various musical instruments.' },
];

// Defines a comprehensive list of artist categories for filtering and categorization.
export const artistCategories = ['Singer', 'Dancer', 'Speaker', 'DJ', 'Comedian', 'Magician', 'Musician'];

// Defines a list of languages that artists might speak, useful for filtering.
export const languagesSpoken = ['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Punjabi', 'Gujarati'];

// Defines predefined ranges for artist fees, used in price filtering.
export const feeRanges = ['Below $500', '$500 - $1000', '$1000 - $2000', '$2000 - $5000', 'Above $5000'];

// Dynamically extracts unique locations from the `mockArtists` data and sorts them alphabetically.
// This ensures the list of locations is always up-to-date with the mock data.
export const locations = [...new Set(mockArtists.map(artist => artist.location))].sort();