import { RadioGroup } from "@headlessui/react";
import { forwardRef } from "react";

type RadioGroupOption = {
  value: string | number | boolean;
  title: string;
};

interface Props {
  intent: "primary" | "error";
  radioGroupOptions: RadioGroupOption[];
  onChangeController: (...event: any[]) => void;
  fieldValue: string;
  errorMessage: string;
}

const InputRadioGroup = forwardRef<HTMLInputElement, Props>(({ intent = "primary", radioGroupOptions, onChangeController, fieldValue, errorMessage }, ref) => {
  return (
    <RadioGroup ref={ref} value={fieldValue} onChange={onChangeController} className="flex flex-col gap-2">
      {radioGroupOptions.map((radioGroupItem, index) => (
        <RadioGroup.Option key={index} className={`flex cursor-pointer items-center gap-2 ${intent === "error" ? "text-red-500" : ""}`} value={radioGroupItem.value}>
          {({ active, checked }) => (
            <>
              <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-950 ${intent === "error" ? "border-red-500" : ""}`}>{checked && <div className={`h-3 w-3 rounded-full transition-colors ${intent === "error" ? "bg-red-500" : "bg-primary"}`} />}</div>
              {radioGroupItem.title}
            </>
          )}
        </RadioGroup.Option>
      ))}
      {intent === "error" && <div className="text-left font-medium text-error-500">{errorMessage}</div>}
    </RadioGroup>
  );
});

InputRadioGroup.displayName = "InputRadioGroup";

export default InputRadioGroup;
