import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import NextLink, { LinkProps } from "next/link";

const buttonLink = cva(["font-medium", "transition-colors", "shadow-sm", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "border", "inline-flex", "items-center", "justify-center"], {
  variants: {
    intent: {
      primary: ["bg-primary", "text-white", "border-transparent", "hover:bg-primary-100", "focus:ring-primary-100"],
      error: ["bg-error-500", "text-white", "border-error-600", "hover:bg-error-600", "focus:ring-error-600"],
      loading: ["bg-primary-50", "text-white"],
    },
    rounded: {
      sm: ["rounded-md"],
      xl: ["rounded-xl"],
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
  compoundVariants: [{ intent: "primary", size: "base" }],
  defaultVariants: {
    intent: "primary",
    size: "base",
    rounded: "sm",
  },
});

export interface ButtonLinkProps extends LinkProps, VariantProps<typeof buttonLink> {
  children: React.ReactNode;
}

const ButtonLink = ({ intent, size, rounded, uppercase, children, href, ...props }: ButtonLinkProps) => (
  <NextLink href={href} className={buttonLink({ intent, size, rounded, uppercase })} {...props}>
    {children}
  </NextLink>
);

export default ButtonLink;
