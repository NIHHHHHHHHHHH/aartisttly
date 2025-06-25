'use client';
import React from 'react';
import { Button } from '../ui/Button';

/**
 * Footer Component
 *
 * This component renders the application's footer. It displays copyright information
 * and provides links to key legal documents like the Privacy Policy and Terms of Service.
 * The layout adjusts for responsiveness, stacking content vertically on smaller screens
 * and arranging it horizontally on larger screens.
 */
export default function Footer() {
  return (
    // The main footer element with responsive padding, colors, and a top shadow for visual separation.
    <footer className="bg-background text-foreground p-6 shadow-inner rounded-t-lg transition-colors">
      {/*
        Container for footer content.
        It uses flexbox for alignment:
        - `flex-col` on mobile, `sm:flex-row` on small screens and up.
        - `justify-between` to space items apart horizontally on larger screens.
        - `items-center` to vertically align items.
        - `text-center` on mobile, `sm:text-left` on small screens and up for text alignment.
      */}
      <div className="container mx-auto text-center sm:text-left text-xs sm:text-sm flex flex-col sm:flex-row justify-between items-center gap-4">

        {/* Left Section: Copyright Information */}
        <div>
          {/* Displays the current year dynamically for the copyright notice. */}
          <p>&copy; {new Date().getFullYear()} Artistly.com. All rights reserved.</p>
        </div>

        {/* Right Section: Legal Links */}
        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2">
          {/* Privacy Policy Button */}
          <Button
            variant="link" // Styles the Button component as a text link.
            className="text-foreground hover:text-indigo-400 dark:hover:text-indigo-400 px-2" // Customizes text color and hover effects.
          >
            Privacy Policy
          </Button>
          {/* Separator: Hidden on small screens, visible as a vertical line on larger screens. */}
          <span className="hidden sm:inline">|</span>
          {/* Terms of Service Button */}
          <Button
            variant="link" // Styles the Button component as a text link.
            className="text-foreground hover:text-indigo-400 dark:hover:text-indigo-400 px-2" // Customizes text color and hover effects.
          >
            Terms of Service
          </Button>
        </div>
      </div>
    </footer>
  );
}