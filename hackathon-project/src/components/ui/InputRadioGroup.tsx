import { RadioGroup } from "@headlessui/react";
import { forwardRef, useState } from "react";

interface Props {
  intent: "primary" | "error";
  radioGroupItems: {
    value: string | number | boolean;
    title: string;
  }[];
}

const InputRadioGroup = forwardRef<HTMLInputElement, Props>(({ intent = "primary", radioGroupItems }, ref) => {
  const [value, setValue] = useState();

  return (
    <RadioGroup ref={ref} value={value} onChange={setValue} className="flex flex-col gap-2">
      {radioGroupItems.map((radioGroupItem, index) => (
        <RadioGroup.Option key={index} className={`flex items-center gap-2 ${intent === "error" ? "text-red-500" : ""}`} value={radioGroupItem.value}>
          {({ active, checked }) => (
            <>
              <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${intent === "error" ? "border-red-500" : ""}`}>{checked && <div className={`h-3 w-3 rounded-full transition-colors ${intent === "error" ? "bg-red-500" : "bg-neutral-900"}`} />}</div>
              {radioGroupItem.title}
            </>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
});

InputRadioGroup.displayName = "InputRadioGroup";

export default InputRadioGroup;
