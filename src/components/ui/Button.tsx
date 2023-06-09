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
      intent: {
        primary: [
          "bg-primary",
          "text-white",
          "border-transparent",
          "hover:bg-primary-100",
          "focus:ring-primary-100",
        ],
        error: [
          "bg-error-500",
          "text-white",
          "border-error-600",
          "hover:bg-error-600",
          "focus:ring-error-600",
        ],
        loading: ["bg-primary-50", "text-white"],
        disabled: [
          "bg-gray-100",
          "text-gray-400",
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
      intent: "primary",
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
  ({ className, intent, size, uppercase, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={twMerge(
          buttonVariants({ intent, size, uppercase }),
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
