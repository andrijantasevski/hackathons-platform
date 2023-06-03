import { cva, VariantProps } from "class-variance-authority";
import { IconExclamationCircle } from "@tabler/icons-react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const inputRoundedVariants = cva(
  [
    "bg-white",
    "rounded-lg",
    "shadow-md",
    "p-3",
    "w-full",
    "focus:outline-none",
    "focus:ring-1",
    "border",
  ],
  {
    variants: {
      intent: {
        primary: [
          "border-transparent",
          "focus:ring-primary",
          "focus:border-primary-100",
          "placeholder:text-neutral-400",
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
    VariantProps<typeof inputRoundedVariants> {
  id: string;
  children: React.ReactNode;
  errorMessage: string;
  placeholder: string;
  showLabel?: boolean;
  /**
   * Icon to show before the placeholder/input text.
   */
  leadingIcon?: React.ReactNode;
  /**
   * Offset for the placeholder so that the text/placeholder starts after the icon.
   *
   * The placeholder offset must be a Tailwind pl-[value]
   */
  placeholderOffset?:
    | "pl-4"
    | "pl-5"
    | "pl-6"
    | "pl-7"
    | "pl-8"
    | "pl-9"
    | "pl-10"
    | "pl-11"
    | "pl-12"
    | "pl-14"
    | "pl-16"
    | "pl-20"
    | "pl-24"
    | "pl-28"
    | "pl-32"
    | "pl-36"
    | "pl-40";
}

const InputRounded = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      children,
      intent,
      errorMessage,
      showLabel = true,
      placeholder,
      leadingIcon,
      placeholderOffset,
      className,
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
          {leadingIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">
              {leadingIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            className={twMerge(
              `${inputRoundedVariants({ intent })} ${
                placeholderOffset ? placeholderOffset : ""
              }`,
              className
            )}
            placeholder={placeholder}
            {...props}
          />

          {intent === "error" && (
            <IconExclamationCircle className="absolute right-2 top-1/2 -translate-y-1/2 text-red-600" />
          )}
        </div>

        {intent === "error" && (
          <div className="font-medium text-red-500">{errorMessage}</div>
        )}
      </div>
    );
  }
);

InputRounded.displayName = "InputRounded";

export default InputRounded;
