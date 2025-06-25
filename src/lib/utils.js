// Utility to combine class names using clsx and resolve Tailwind CSS conflicts using tailwind-merge

import { clsx } from "clsx";               // Handles conditional class merging (e.g., falsy values, arrays)
import { twMerge } from "tailwind-merge";  // Resolves conflicting Tailwind classes (e.g., "p-2 p-4" => "p-4")

/**
 * Combines multiple class name inputs into a single, conflict-free Tailwind class string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs)); // Merge clsx output through tailwind-merge for final result
}
