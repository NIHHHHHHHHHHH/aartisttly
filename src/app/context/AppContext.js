'use client';
import React, { useState, createContext, useMemo } from 'react';

// Create separate contexts for state and actions to reduce unnecessary re-renders
export const AppStateContext = createContext();
export const AppActionsContext = createContext();

// AppProvider wraps the application with shared global state and action handlers
export default function AppProvider({ children }) {
  // State to hold submitted artist data
  const [submittedArtists, setSubmittedArtists] = useState([]);

  // Tracks the current page for navigation purposes
  const [currentPage, setCurrentPage] = useState('home');

  // Indicates whether a navigation or operation is in progress
  const [isLoading, setIsLoading] = useState(false);

  // UI filter state initialized to "all" values
  const [filters, setFilters] = useState({
    category: 'all_categories',
    location: 'all_locations',
    priceRange: 'all_prices'
  });

  // Dialog modal state (e.g., for confirmations or alerts)
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });

  // Memoized set of actions to manipulate state efficiently
  const actions = useMemo(() => ({
    // Adds a submitted artist to the list with a generated ID
    addSubmittedArtist: (artistData) => {
      setSubmittedArtists(prev => [
        ...prev, 
        { ...artistData, id: `s${prev.length + 1}` }
      ]);
    },

    // Navigates to a different page with basic transition effect
    navigate: (page) => {
      if (page === currentPage) return; // Prevent redundant navigation
      
      setIsLoading(true);
      requestAnimationFrame(() => {
        setTimeout(() => {
          setCurrentPage(page);
          setIsLoading(false);
        }, 300); // Lightweight delay for smoother UX
      });
    },

    // Replaces specific filters with new values
    setFilters: (newFilters) => {
      setFilters(prevFilters => ({
        ...prevFilters,
        ...newFilters
      }));
    },

    // Updates a single filter by name
    updateFilter: (filterName, value) => {
      setFilters(prevFilters => ({
        ...prevFilters,
        [filterName]: value
      }));
    },

    // Resets all filters to default values
    clearFilters: () => {
      setFilters({
        category: 'all_categories',
        location: 'all_locations',
        priceRange: 'all_prices'
      });
    },

    // Navigates to a page while applying new filters
    navigateWithFilters: (page, filterUpdates = {}) => {
      if (Object.keys(filterUpdates).length > 0) {
        setFilters(prevFilters => ({
          ...prevFilters,
          ...filterUpdates
        }));
      }

      if (page === currentPage) return;

      setIsLoading(true);
      requestAnimationFrame(() => {
        setTimeout(() => {
          setCurrentPage(page);
          setIsLoading(false);
        }, 300);
      });
    },

    // Opens a dialog with given message and optional confirm callback
    openDialog: (title, message, onConfirm = null) => {
      setDialog({ isOpen: true, title, message, onConfirm });
    },

    // Closes the currently open dialog
    closeDialog: () => {
      setDialog({ isOpen: false, title: '', message: '', onConfirm: null });
    },

    // Confirms dialog and executes the confirm callback, if any
    confirmDialog: () => {
      const callback = dialog.onConfirm;
      setDialog({ isOpen: false, title: '', message: '', onConfirm: null });
      
      if (callback) {
        requestAnimationFrame(() => callback());
      }
    }
  }), [currentPage, dialog.onConfirm]);

  // Memoized state values to avoid unnecessary renders on consumer components
  const state = useMemo(() => ({
    submittedArtists,
    currentPage,
    isLoading,
    filters,
    dialog
  }), [submittedArtists, currentPage, isLoading, filters, dialog]);

  // Provide state and actions to children via context
  return (
    <AppStateContext.Provider value={state}>
      <AppActionsContext.Provider value={actions}>
        {children}
      </AppActionsContext.Provider>
    </AppStateContext.Provider>
  );
}

// Custom hook for accessing shared state
export const useAppState = () => {
  const context = React.useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppProvider');
  }
  return context;
};

// Custom hook for accessing shared actions
export const useAppActions = () => {
  const context = React.useContext(AppActionsContext);
  if (!context) {
    throw new Error('useAppActions must be used within AppProvider');
  }
  return context;
};
