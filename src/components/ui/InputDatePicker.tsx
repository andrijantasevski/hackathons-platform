import { IconCalendar } from "@tabler/icons-react";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const inputDatePickerVariants = cva(
  [
    "flex",
    "gap-2",
    "items-center",
    "p-3",
    "rounded-lg",
    "w-full",
    "border",
    "transition-colors",
    "shadow-sm",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-white",
          "shadow-lg",
          "border-transparent",
          "focus:ring-primary-focus",
        ],
        "primary-placeholder": [
          "bg-white",
          "shadow-lg",
          "text-base-400",
          "border-transparent",
        ],
        underlined: [],
        "primary-error": [
          "bg-white",
          "text-error",
          "shadow-lg",
          "border-error",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

interface InputDatePickerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof inputDatePickerVariants> {
  children: React.ReactNode;
}

const InputDatePicker = forwardRef<HTMLButtonElement, InputDatePickerProps>(
  ({ variant, className, children, ...props }, ref) => {
    return (
      <button
        type="button"
        className={twMerge(inputDatePickerVariants({ variant }), className)}
        ref={ref}
        {...props}
      >
        <IconCalendar />
        <span>{children}</span>
      </button>
    );
  }
);

InputDatePicker.displayName = "InputRounded";

export default InputDatePicker;
