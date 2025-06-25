// Import global styles
import './globals.css'

// Import ThemeProvider to handle light/dark mode theming
import { ThemeProvider } from '../../src/app/components/providers/ThemeProvider'

// Define site-wide metadata for SEO and social sharing
export const metadata = {
  title: 'Artistly - Performing Artist Booking Platform',
  description: 'Connect event planners with talented performing artists',
}

// Root layout component that wraps the entire application
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* ThemeProvider enables dark/light theme based on system or user preference */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system" // Uses system theme as default
          enableSystem // Syncs with OS-level dark/light mode
          disableTransitionOnChange // Prevents flickering during theme changes
        >
          {children} {/* Render the app's page content */}
        </ThemeProvider>
      </body>
    </html>
  )
}
