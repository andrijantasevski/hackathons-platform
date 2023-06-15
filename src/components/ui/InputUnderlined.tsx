import { cva, VariantProps } from "class-variance-authority";
import { IconExclamationCircle } from "@tabler/icons-react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const inputUnderlinedVariants = cva(
  [
    "bg-transparent",
    "border-b-2",
    "py-2",
    "w-full",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "rounded-sm",
  ],
  {
    variants: {
      variant: {
        primary: [
          "border-base-content",
          "focus:ring-primary-focus",
          "focus:border-primary-focus",
        ],
        error: [
          "text-error",
          "border-error",
          "focus:ring-error",
          "focus:border-error",
          "placeholder:text-error",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

interface Props
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputUnderlinedVariants> {
  id: string;
  errorMessage: string;
  placeholder: string;
}

const InputUnderlined = forwardRef<HTMLInputElement, Props>(
  ({ id, variant, errorMessage, placeholder, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <div className="relative">
          <input
            ref={ref}
            id={id}
            className={twMerge(inputUnderlinedVariants({ variant }), className)}
            placeholder={placeholder}
            {...props}
          />

          {variant === "error" && (
            <IconExclamationCircle className="absolute right-2 top-1/2 -translate-y-1/2 text-error" />
          )}
        </div>

        {variant === "error" && (
          <div className="text-left font-medium text-error">{errorMessage}</div>
        )}
      </div>
    );
  }
);

InputUnderlined.displayName = "InputUnderlined";

export default InputUnderlined;
