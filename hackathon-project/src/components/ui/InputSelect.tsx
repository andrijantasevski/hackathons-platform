import { forwardRef, useState } from "react";
import { Listbox } from "@headlessui/react";

interface Props {
  selectOptions: {
    value: string | number | boolean;
    title: string;
  }[];
  intent: "primary" | "error";
}

// TODO
// Check if type is HTMLInputElement

const InputSelect = forwardRef<HTMLInputElement, Props>(({ intent = "primary", selectOptions }, ref) => {
  const [value, setValue] = useState(selectOptions[0]);

  return (
    <Listbox ref={ref} value={value} onChange={setValue} as="div" className="relative">
      <Listbox.Button className="relative mb-4 w-full border-b-2 border-black p-3 text-left">{value.title}</Listbox.Button>

      {/* TODO */}
      {/* FIX KEY PROP */}
      <Listbox.Options className="rounded-lg p-2 shadow-md">
        {selectOptions.map((selectOption, index) => (
          <Listbox.Option className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-200" key={index} value={selectOption}>
            {selectOption.title}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
});

InputSelect.displayName = "InputSelect";

export default InputSelect;
