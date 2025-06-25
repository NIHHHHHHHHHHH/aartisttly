"use client"
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="checkbox"
    className={cn(
      // Base styles with theme consistency
      "peer size-4 shrink-0 rounded-[4px] border transition-all duration-200 outline-none",
      // Light mode styles
      "border-border bg-background shadow-sm",
      // Focus states
      "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:ring-offset-2",
      // Checked states
      "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary",
      // Hover states
      "hover:border-ring/50 data-[state=checked]:hover:bg-primary/90",
      // Dark mode optimizations
      "dark:border-border dark:bg-background/50",
      "dark:hover:bg-accent/10 dark:hover:border-ring/70",
      // Invalid states
      "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
      // Disabled states
      "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className="flex items-center justify-center text-current transition-opacity duration-150"
    >
      <CheckIcon className="size-3.5" strokeWidth={2.5} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }