import React from 'react';
import ArtistTable from '../components/common/ArtistTable';
import { useAppState, useAppActions } from '../context/AppContext';

// Manager Dashboard Page - Displays a table of submitted artists
export default function ManagerDashboardPage() {
  const { submittedArtists } = useAppState(); // Access list of artists from global state
  const { openDialog } = useAppActions(); // Action to open dialogs

  // Handler to display artist detail dialog (placeholder message)
  const handleViewDetails = (artist) => {
    openDialog(
      'Artist Details',
      `Viewing details for ${artist.name}. More details would appear here in a real application.`
    );
  };

  // Table headers for the artist data
  const tableHeaders = ['Name', 'Category', 'Location', 'Fee'];

  // Transform the artist data into a format suitable for the table component
  const tableData = submittedArtists.map(artist => ({
    id: artist.id,
    name: artist.name,
    category: artist.category.join(', '), // Join multiple categories with commas
    location: artist.location,
    fee: artist.feeRange
  }));

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-inter text-gray-900 dark:text-gray-50">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto">

          {/* Page Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-50 mb-6 sm:mb-8 text-center">
            Manager Dashboard
          </h2>

          {/* Artist Data Table */}
          <div className="w-full">
            <ArtistTable
              headers={tableHeaders} // Table column headers
              data={tableData} // Formatted artist data
              onAction={handleViewDetails} // Callback for action button
              actionLabel="View Details" // Label for action button in each row
              emptyMessage="No artist submissions yet. Onboard an artist to see data here!" // Message for empty table
            />
          </div>

        </div>
      </main>
    </div>
  );
}
