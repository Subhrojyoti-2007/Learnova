import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "orange" | "destructive" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-primary text-primary-foreground": variant === "default",
          "border-transparent bg-emerald-500/20 text-emerald-400": variant === "success",
          "border-transparent bg-amber-500/20 text-amber-400": variant === "warning",
          "border-transparent bg-orange-500/20 text-orange-400": variant === "orange",
          "border-transparent bg-rose-500/20 text-rose-400": variant === "destructive",
          "text-foreground border-white/20": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
