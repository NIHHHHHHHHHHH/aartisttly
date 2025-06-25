"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * ThemeProvider Component
 *
 * This component acts as a wrapper that provides theme-switching capabilities
 * to the entire application using `next-themes`. It allows for managing
 * dark mode, light mode, or system theme preferences.
 
 * This typically includes configuration like `attribute="class"` for Tailwind CSS
 * or `defaultTheme="system"`.
 */
export function ThemeProvider({
  children,
  ...props // Captures any additional props passed to ThemeProvider.
}) {
  // Renders the NextThemesProvider from 'next-themes',
  // forwarding all received props and rendering children within its context.
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}