import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const buttonVariants = cva(
  [
    "font-medium",
    "transition-colors",
    "shadow-sm",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "border",
    "inline-flex",
    "items-center",
    "justify-center",
    "rounded-md",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary",
          "text-primary-content",
          "border-transparent",
          "hover:bg-primary-focus",
          "focus:ring-primary-focus",
        ],
        error: [
          "bg-error",
          "text-error-content",
          "border-error-focus",
          "hover:bg-error-focus",
          "focus:ring-error-focus",
        ],
        loading: ["bg-base-200", "text-white"],
        disabled: [
          "bg-base-200",
          "text-base-300",
          "cursor-auto",
          "border-transparent",
        ],
      },
      size: {
        sm: ["text-sm", "py-1", "px-2"],
        base: ["text-base", "py-2", "px-4"],
        lg: ["text-base", "py-3", "px-4"],
      },
      uppercase: {
        true: ["uppercase"],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "base",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, uppercase, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={twMerge(
          buttonVariants({ variant, size, uppercase }),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
