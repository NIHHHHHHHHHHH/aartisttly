// app/components/Hero.js
import Link from 'next/link'

/**
 * Hero Component
 *
 * This component renders the main hero section of the landing page.
 * It features a prominent heading, a descriptive paragraph, and
 * two call-to-action buttons for exploring artists or joining as an artist.
 */
export default function Hero() {
  return (
    // Section container with a gradient background and vertical padding.
    <section className="bg-gradient-to-br from-purple-50 to-indigo-100 py-20">
      {/* Content wrapper to center and constrain the width of the content. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered text content. */}
        <div className="text-center">
          {/* Main heading of the hero section. */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect with
            {/* Highlighted text for "Talented Artists". */}
            <span className="text-purple-600"> Talented Artists</span>
          </h1>
          {/* Descriptive paragraph explaining the platform's purpose. */}
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The premier platform for event planners to discover and book performing artists.
            From singers to dancers, speakers to DJs - find the perfect talent for your event.
          </p>
          {/* Container for call-to-action buttons.
              Uses flexbox for layout, stacking vertically on small screens and horizontally on larger screens. */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* "Explore Artists" button, styled as a primary call to action. */}
            <Link href="/artists" className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors">
              Explore Artists
            </Link>
            {/* "Join as Artist" button, styled as a secondary call to action with a border. */}
            <Link href="/onboard" className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-50 transition-colors">
              Join as Artist
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}