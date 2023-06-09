import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { twMerge } from "tailwind-merge";
import { IconCircleFilled } from "@tabler/icons-react";
import { cva, type VariantProps } from "class-variance-authority";

const radioGroupVariants = cva(["flex", "gap-2.5"], {
  variants: {
    /**
     * To override the gap between each item, use className="gap-8", for example.
     */
    direction: {
      horizontal: ["flex-row"],
      vertical: ["flex-col"],
    },
  },
  defaultVariants: {
    direction: "vertical",
  },
});

interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    VariantProps<typeof radioGroupVariants> {}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, direction, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={twMerge(radioGroupVariants({ direction }), className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const radioGroupItemVariants = cva(
  [
    "ring-offset-background",
    "focus-visible:ring-ring",
    "aspect-square",
    "h-5",
    "w-5",
    "rounded-full",
    "border-2",
    "focus:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: ["border-neutral-950", "text-primary"],
        error: ["border-error-500"],
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioGroupItemVariants> {}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, variant, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={twMerge(radioGroupItemVariants({ variant }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <IconCircleFilled className="h-3 w-3 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

type RadioGroupTitleProps = {
  children: React.ReactNode;
};

const RadioGroupTitle = ({ children }: RadioGroupTitleProps) => {
  return <p className="mb-3 text-left font-bold">{children}</p>;
};

export { RadioGroup, RadioGroupItem, RadioGroupTitle };
