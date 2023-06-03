import { cva, VariantProps } from "class-variance-authority";
import { IconExclamationCircle } from "@tabler/icons-react";
import { forwardRef } from "react";

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
      intent: {
        primary: [
          "border-neutral-900",
          "focus:ring-primary",
          "focus:border-primary",
        ],
        error: [
          "text-error-600",
          "border-error-600",
          "focus:ring-error-500",
          "focus:border-error-500",
          "placeholder:text-error-600",
        ],
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

interface Props
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputUnderlinedVariants> {
  id: string;
  children: React.ReactNode;
  errorMessage: string;
  placeholder: string;
  showLabel?: boolean;
}

const InputUnderlined = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      children,
      intent,
      errorMessage,
      showLabel = true,
      placeholder,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-2">
        <label
          className={`block text-left font-bold ${showLabel ? "" : "sr-only"}`}
          htmlFor={id}
        >
          {children}
        </label>

        <div className="relative">
          <input
            ref={ref}
            id={id}
            className={inputUnderlinedVariants({ intent })}
            placeholder={placeholder}
            {...props}
          />

          {intent === "error" && (
            <IconExclamationCircle className="absolute right-2 top-1/2 -translate-y-1/2 text-error-600" />
          )}
        </div>

        {intent === "error" && (
          <div className="text-left font-medium text-error-500">
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
);

InputUnderlined.displayName = "InputUnderlined";

export default InputUnderlined;
