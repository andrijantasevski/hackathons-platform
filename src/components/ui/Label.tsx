import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const labelVariants = cva(
  "text-left leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      fontWeight: {
        normal: "font-normal",
        bold: "font-bold",
      },
      intent: {
        primary: ["text-neutral-950"],
        error: ["text-red-500"],
      },
    },
    defaultVariants: {
      fontWeight: "normal",
      intent: "primary",
    },
  }
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, fontWeight, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={twMerge(labelVariants({ fontWeight }), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
