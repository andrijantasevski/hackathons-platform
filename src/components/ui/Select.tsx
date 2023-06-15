import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { twMerge } from "tailwind-merge";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { cva, type VariantProps } from "class-variance-authority";
import { FieldError } from "react-hook-form";

interface SelectProps extends SelectPrimitive.SelectProps {
  children: React.ReactNode;
  errorMessage: string;
  isError: FieldError | undefined;
}

const Select = ({ children, errorMessage, isError, ...props }: SelectProps) => {
  return (
    <SelectPrimitive.Root {...props}>
      {children}

      {isError && <p className="text-left text-error">{errorMessage}</p>}
    </SelectPrimitive.Root>
  );
};

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const selectTriggerVariants = cva(
  [
    "ring-offset-background",
    "flex",
    "w-full",
    "items-center",
    "justify-between",
    "bg-white",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-primary",
    "focus:ring-offset-2",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: [
          "p-3",
          "shadow-lg",
          "rounded-md",
          "data-[placeholder]:text-base-400",
        ],
        underlined: [
          "rounded-sm",
          "border-b-2",
          "border-base-content",
          "py-3 pr-3",
          "data-[placeholder]:text-base-400",
        ],
        error: [],
        "underlined-error": [
          "border-b-2",
          "border-error",
          "py-3",
          "pr-3",
          "text-error",
          "data-[placeholder]:text-error",
        ],
      },
      defaultVariants: {
        variant: "primary",
      },
    },
  }
);

interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, variant, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={twMerge(selectTriggerVariants({ variant }), className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <IconChevronDown className="h-4 w-4" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content ref={ref} position={position} {...props}>
      <ScrollArea.Root className="h-full w-full" type="auto">
        <SelectPrimitive.Viewport asChild>
          <ScrollArea.Viewport
            style={{ overflowY: undefined }}
            className="mt-1 max-h-56 w-full min-w-[var(--radix-select-trigger-width)] rounded-lg bg-white p-3 shadow-lg"
          >
            {children}
          </ScrollArea.Viewport>
        </SelectPrimitive.Viewport>
        <ScrollArea.Scrollbar
          className="w-3 px-0.5 py-1"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="rounded-md bg-base-200" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={twMerge("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={twMerge(
      "relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 outline-none focus:bg-primary focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <IconCheck className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectContent,
  SelectTrigger,
  SelectItem,
};
