import { forwardRef, useState } from "react";
import { Listbox } from "@headlessui/react";
import { IconCheck } from "@tabler/icons-react";

interface Props {
  selectOptions: {
    value: string | number | boolean;
    title: string;
  }[];
  intent: "primary" | "error";
  label: string;
  onChangeController: (...event: any[]) => void;
}

const InputSelect = forwardRef<HTMLInputElement, Props>(({ intent = "primary", selectOptions, label, onChangeController }, ref) => {
  const [value, setValue] = useState(selectOptions[0]);

  return (
    <Listbox
      ref={ref}
      value={value}
      onChange={(e) => {
        setValue(e);
        onChangeController(e.value);
      }}
      as="div"
      className="relative"
    >
      <div>
        <Listbox.Label className="mb-1 text-left font-bold" as="div">
          {label}
        </Listbox.Label>
      </div>
      <Listbox.Button className={`relative mb-4 w-full border-b-2 border-black py-3 text-left ${intent === "error" ? "border-error-500" : "border-error-500"}`}>{value.title}</Listbox.Button>

      {/* TODO */}
      {/* FIX KEY PROP */}
      <Listbox.Options className="absolute z-10 mt-4 w-full rounded-lg bg-white p-2 shadow-xl">
        {selectOptions.map((selectOption, index) => (
          <Listbox.Option className={({ active }) => `relative cursor-pointer select-none rounded-lg py-2 pl-10 pr-4 text-left transition-colors ${active ? "bg-primary text-white" : "text-gray-900"}`} key={index} value={selectOption}>
            {({ selected, active }) => (
              <>
                <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{selectOption.title}</span>
                {selected ? (
                  <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-primary"}`}>
                    <IconCheck className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : null}
              </>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
});

InputSelect.displayName = "InputSelect";

export default InputSelect;
