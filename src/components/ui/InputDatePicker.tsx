import { IconCalendar } from "@tabler/icons-react";
import { cva, type VariantProps } from "class-variance-authority";
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
          "focus:ring-primary-100",
        ],
        "primary-placeholder": [
          "bg-white",
          "shadow-lg",
          "text-neutral-400",
          "border-transparent",
        ],
        underlined: [],
        "primary-error": [
          "bg-white",
          "text-error-500",
          "shadow-lg",
          "border-error-500",
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

function InputDatePicker({
  variant,
  className,
  children,
  ...props
}: InputDatePickerProps) {
  return (
    <button
      type="button"
      className={twMerge(inputDatePickerVariants({ variant }), className)}
      {...props}
    >
      <IconCalendar />
      <span>{children}</span>
    </button>
  );
}

export { InputDatePicker };
