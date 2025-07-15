import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-brand-light hover:border-brand-medium hover:shadow-md",
        product: "border-brand-light hover:border-brand-primary hover:shadow-xl group cursor-pointer overflow-hidden",
        content: "border-brand-light hover:border-brand-medium",
        primary: "border-brand-primary bg-brand-light/10",
        accent: "border-brand-medium bg-brand-light/20"
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        none: "p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface BaseCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: React.ReactNode;
}

const BaseCard = React.forwardRef<HTMLDivElement, BaseCardProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </div>
  )
);

BaseCard.displayName = "BaseCard";

export { BaseCard, cardVariants };