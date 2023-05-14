import { cva, VariantProps } from "class-variance-authority";
import { IconExclamationCircle } from "@tabler/icons-react";
import { forwardRef } from "react";

const inputUnderlined = cva(["bg-transparent", "border-b-2", "py-2", "w-full", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "rounded-sm"], {
  variants: {
    intent: {
      primary: ["border-neutral-900", "focus:ring-primary", "focus:border-primary"],
      error: ["text-error-600", "border-error-600", "focus:ring-error-500", "focus:border-error-500", "placeholder:text-error-600"],
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

interface Props extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputUnderlined> {
  id: string;
  children: React.ReactNode;
  type: "text" | "email" | "password" | "url" | "tel" | "number";
  errorMessage: string;
  placeholder: string;
  hideLabel?: boolean;
}

const InputUnderlined = forwardRef<HTMLInputElement, Props>(({ id, children, intent, errorMessage, hideLabel, placeholder, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        {hideLabel && (
          <label className="block font-bold" htmlFor={id}>
            {children}
          </label>
        )}
      </div>

      <div className="relative">
        <input ref={ref} id={id} className={inputUnderlined({ intent })} placeholder={placeholder} {...props} />

        {intent === "error" && <IconExclamationCircle className="absolute right-2 top-1/2 -translate-y-1/2 text-red-600" />}
      </div>

      <div className="text-left">{intent === "error" && <span className="font-medium text-red-500">{errorMessage}</span>}</div>
    </div>
  );
});

InputUnderlined.displayName = "InputUnderlined";

export default InputUnderlined;
