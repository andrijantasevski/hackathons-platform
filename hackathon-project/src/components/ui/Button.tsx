import { cva, type VariantProps } from "class-variance-authority";

const button = cva(["font-medium", "transition-colors", "shadow-sm", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "border", "inline-flex", "items-center"], {
  variants: {
    intent: {
      primary: ["bg-blue-500", "text-white", "border-transparent", "hover:bg-blue-600"],
      error: ["bg-red-500", "text-white", "border-gray-400", "hover:bg-gray-100"],
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-4"],
    },
  },
  compoundVariants: [{ intent: "primary", size: "medium" }],
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({ className, intent, size, ...props }) => <button className={button({ intent, size, className })} {...props} />;
