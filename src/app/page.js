'use client';

import React, { Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppProvider, { useAppState, useAppActions } from './context/AppContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Dialog from './components/common/Dialog';

// Lazy load pages to reduce initial bundle size and improve performance
const HomePage = lazy(() => import('./pages/HomePage'));
const ArtistListingPage = lazy(() => import('./pages/ArtistListingPage'));
const ArtistOnboardingForm = lazy(() => import('./pages/ArtistOnboardingForm'));
const ManagerDashboardPage = lazy(() => import('./pages/ManagerDashboardPage'));

// Loading spinner displayed during lazy loading and transitions
const LoadingSpinner = () => (
  <motion.div 
    className="flex justify-center items-center h-[calc(100vh-160px)]"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </motion.div>
);

// Wrapper for animated page transitions
const PageWrapper = ({ children, pageKey }) => (
  <motion.div
    key={pageKey}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94], // Smooth easing curve
    }}
    className="w-full"
  >
    {children}
  </motion.div>
);

// Main content area that handles page rendering and layout
function PageContent() {
  const { currentPage, isLoading, dialog } = useAppState(); // Get app state
  const { closeDialog, confirmDialog } = useAppActions();   // Get app actions

  // Map currentPage to the corresponding component
  const renderPage = () => {
    const pages = {
      home: <HomePage />,
      artists: <ArtistListingPage />,
      onboard: <ArtistOnboardingForm />,
      dashboard: <ManagerDashboardPage />,
    };

    // Fallback to home if page key is not matched
    return pages[currentPage] || pages.home;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-300">
      <Header /> {/* Top navigation/header */}

      <main className="flex-grow relative overflow-hidden">
        {/* Animate page transitions or loading state */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingSpinner key="loading" />
          ) : (
            <PageWrapper pageKey={currentPage}>
              <Suspense fallback={<LoadingSpinner />}>
                {renderPage()}
              </Suspense>
            </PageWrapper>
          )}
        </AnimatePresence>
      </main>

      <Footer /> {/* Persistent footer */}

      {/* Global dialog modal with animation support */}
      <AnimatePresence>
        {dialog.isOpen && (
          <Dialog
            isOpen={dialog.isOpen}
            title={dialog.title}
            message={dialog.message}
            onClose={closeDialog}
            onConfirm={dialog.onConfirm ? confirmDialog : closeDialog}
            type={dialog.onConfirm ? 'confirm' : 'alert'} // Show confirm or alert modal
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Root component with AppProvider to supply global context
export default function Page() {
  return (
    <AppProvider>
      <PageContent />
    </AppProvider>
  );
}
