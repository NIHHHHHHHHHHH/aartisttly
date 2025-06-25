import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../ui/Table";


/**
 * ArtistTable Component
 *
 * This component renders a responsive table that displays artist information.
 * It provides a traditional table view for larger screens (desktop) and a card-based layout
 * for smaller screens (mobile), ensuring an optimal user experience across devices.
 * It also supports an optional action button for each row and displays a message when no data is available.
 */
export default function ArtistTable({ headers, data, onAction, actionLabel, emptyMessage }) {
  // Determine if there is any data to display.
  const hasData = data && data.length > 0;

  return (
    <div className="w-full">
      {/*
        Desktop Table Layout
        This section is visible only on medium and larger screens (md:block).
        It provides a traditional table structure with a header and rows of data.
      */}
      <div className="hidden md:block rounded-md border overflow-hidden">
        {/* Ensures the table is horizontally scrollable if content overflows. */}
        <div className="overflow-x-auto">
          <Table>
            {/* Table Header Section */}
            <TableHeader>
              <TableRow>
                {/* Renders table headers dynamically based on the 'headers' prop. */}
                {headers.map((header, i) => (
                  <TableHead key={i} className="whitespace-nowrap px-4 py-3">
                    {header}
                  </TableHead>
                ))}
                {/* Conditionally renders an 'Actions' header if an 'onAction' function is provided. */}
                {onAction && <TableHead className="whitespace-nowrap px-4 py-3">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            {/* Table Body Section */}
            <TableBody>
              {/* Conditionally renders table rows if data is available, otherwise displays an empty message. */}
              {hasData ? (
                data.map((row) => (
                  // Each row is uniquely identified by 'row.id'.
                  <TableRow key={row.id}>
                    {/* Table cells displaying artist's name, category, location, and fee. */}
                    <TableCell className="px-4 py-3 font-medium">{row.name}</TableCell>
                    <TableCell className="px-4 py-3">{row.category}</TableCell>
                    <TableCell className="px-4 py-3">{row.location}</TableCell>
                    <TableCell className="px-4 py-3">{row.fee}</TableCell>
                    {/* Conditionally renders an action button cell if 'onAction' is provided. */}
                    {onAction && (
                      <TableCell className="px-4 py-3">
                        <button
                          // Calls the 'onAction' function with the current row data when clicked.
                          onClick={() => onAction(row)}
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                          {actionLabel}
                        </button>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                // Displays a message spanning all columns when no data is present.
                <TableRow>
                  <TableCell
                    // Calculates colspan to cover all header columns (including the optional action column).
                    colSpan={headers.length + (onAction ? 1 : 0)}
                    className="text-center py-8 text-gray-500"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/*
        Mobile Card Layout
        This section is visible only on small screens (md:hidden).
        It presents each data row as a separate card for better readability on mobile devices.
      */}
      <div className="md:hidden space-y-4">
        {/* Conditionally renders artist cards if data is available, otherwise displays an empty message in a card format. */}
        {hasData ? (
          data.map((row) => (
            // Each card is uniquely identified by 'row.id'.
            <div
              key={row.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  {/* Artist's name prominently displayed. */}
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                    {row.name}
                  </h3>
                  {/* Conditionally renders an action button within the card header. */}
                  {onAction && (
                    <button
                      onClick={() => onAction(row)}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors ml-2 flex-shrink-0"
                    >
                      {actionLabel}
                    </button>
                  )}
                </div>

                {/* Grid layout for displaying other artist details within the card. */}
                <div className="grid grid-cols-1 gap-2 text-sm">
                  {/* Category display. */}
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Category:</span>
                    <span className="text-gray-900 dark:text-gray-100 text-right">{row.category}</span>
                  </div>
                  {/* Location display. */}
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Location:</span>
                    <span className="text-gray-900 dark:text-gray-100 text-right">{row.location}</span>
                  </div>
                  {/* Fee display. */}
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Fee:</span>
                    <span className="text-gray-900 dark:text-gray-100 font-semibold text-right">{row.fee}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Displays the empty message in a styled card when no data is present on mobile.
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}