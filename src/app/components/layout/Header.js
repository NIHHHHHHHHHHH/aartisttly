'use client';
import React, { useState } from 'react';
import { useAppActions } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { ModeToggle } from '../ui/ModeToggle';

/**
 * Header Component
 *
 * This component renders the main navigation header for the application.
 * It includes the site logo, responsive navigation links for desktop, tablet, and mobile views,
 * and a theme toggle for dark/light mode. Navigation actions are managed via `useAppActions` context.
 */
export default function Header() {
  // Destructure navigation actions from the AppContext.
  const { navigate, navigateWithFilters } = useAppActions();
  // State to manage the open/closed status of the mobile menu.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * Handles navigation to the artists page, clearing any existing filters.
   * Closes the mobile menu after navigation.
   */
  const handleExploreArtists = () => {
    // Navigates to the 'artists' route and resets category, location, and priceRange filters.
    navigateWithFilters('artists', { category: '', location: '', priceRange: '' });
    // Closes the mobile menu.
    setIsMenuOpen(false);
  };

  /**
   * Handles general navigation to a specified route.
   * Closes the mobile menu after navigation.
   * @param {string} route - The target route to navigate to.
   */
  const handleNavigation = (route) => {
    navigate(route);
    // Closes the mobile menu.
    setIsMenuOpen(false);
  };

  /**
   * Toggles the state of the mobile menu (open/closed).
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // Header element with styling for background, text, shadow, rounded bottom corners, and sticky positioning.
    <header className="bg-background text-foreground shadow-md rounded-b-lg transition-colors sticky top-0 z-50">
      {/* Container for the header's content, providing consistent padding and centering. */}
      <div className="container mx-auto px-4 py-3">
        {/* Main flexible container for aligning logo, navigation, and mobile menu button. */}
        <div className="flex justify-between items-center">
          {/* Logo/Site Title */}
          <h1
            // Styles for the logo, making it clickable to navigate to the home page.
            className="text-2xl sm:text-3xl  font-bold text-indigo-400 cursor-pointer hover:text-indigo-300 transition-colors"
            onClick={() => handleNavigation('home')} // Navigates to home when clicked.
          >
            Artistly
          </h1>

          {/*
            Desktop Navigation (visible on large screens - lg:flex)
            Contains full navigation links and theme toggle.
          */}
          <nav className="hidden lg:flex items-center space-x-6 ">
            <Button
              variant="ghost"
              onClick={() => handleNavigation('home')}
              className="text-foreground hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors"
            >
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={handleExploreArtists} // Uses the specific handler to clear filters.
              className="text-foreground hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors"
            >
              Explore Artists
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNavigation('onboard')}
              className="text-foreground hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors"
            >
              Onboard Artist
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNavigation('dashboard')}
              className="text-foreground hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors"
            >
              Manager Dashboard
            </Button>
            <ModeToggle /> {/* Theme toggle component. */}
          </nav>

          {/*
            Tablet Navigation (visible on medium screens and up, hidden on large screens and small screens)
            Contains condensed navigation links and theme toggle.
          */}
          <nav className="hidden md:flex lg:hidden items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => handleNavigation('home')}
              className="text-sm text-foreground hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors"
            >
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={handleExploreArtists}
              className="text-sm text-foreground hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors"
            >
              Explore
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNavigation('onboard')}
              className="text-sm text-foreground hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors"
            >
              Onboard
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNavigation('dashboard')}
              className="text-sm text-foreground hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors"
            >
              Dashboard
            </Button>
            <ModeToggle /> {/* Theme toggle component. */}
          </nav>

          {/*
            Mobile Menu Button and Theme Toggle (visible only on small screens - md:hidden)
          */}
          <div className="flex md:hidden items-center space-x-2">
            <ModeToggle /> {/* Theme toggle component. */}
            {/* Hamburger/Close icon button for mobile menu. */}
            <button
              onClick={toggleMenu} // Toggles the mobile menu visibility.
              className="text-foreground hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-md p-2 transition-colors"
              aria-label="Toggle navigation menu" // Accessibility label.
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Dynamically renders a close (X) icon or a hamburger icon based on `isMenuOpen` state. */}
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12" // X icon paths.
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16" // Hamburger icon paths.
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/*
          Mobile Navigation Menu (visible only when `isMenuOpen` is true and on small screens)
          Uses `max-h-0` and `opacity-0` for hidden state and `max-h-96` and `opacity-100` for open state,
          combined with a transition for smooth reveal/hide animation.
        */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="bg-background/80 backdrop-blur-sm rounded-lg border border-border/20 p-4">
            <div className="flex flex-col space-y-3">
              <Button
                variant="ghost"
                onClick={() => handleNavigation('home')}
                className="text-foreground hover:text-indigo-400 dark:hover:text-indigo-400 justify-start transition-colors"
              >
                Home
              </Button>
              <Button
                variant="ghost"
                onClick={handleExploreArtists}
                className="text-foreground hover:text-indigo-400 dark:hover:text-indigo-400 justify-start transition-colors"
              >
                Explore Artists
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleNavigation('onboard')}
                className="text-foreground hover:text-indigo-400 dark:hover:text-indigo-400 justify-start transition-colors"
              >
                Onboard Artist
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleNavigation('dashboard')}
                className="text-foreground hover:text-indigo-400 dark:hover:text-indigo-400 justify-start transition-colors"
              >
                Manager Dashboard
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}