import { forwardRef, useState } from "react";
import { Listbox } from "@headlessui/react";

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];

interface Props {
  selectItems: {
    value: string | number | boolean;
    title: string;
  }[];
  intent: "primary" | "error";
}

// TODO
// Check if type is HTMLInputElement

const InputSelect = forwardRef<HTMLInputElement, Props>(({ intent = "primary", selectItems }, ref) => {
  const [value, setValue] = useState(people[0]);

  return (
    <Listbox ref={ref} value={value} onChange={setValue} as="div" className="relative">
      <Listbox.Button className="relative mb-4 w-full rounded-lg p-3 shadow-md">{value.name}</Listbox.Button>

      <Listbox.Options className="rounded-lg p-2 shadow-md">
        {people.map((person) => (
          <Listbox.Option className="rounded-lg p-2 transition-colors hover:bg-gray-200" key={person.id} value={person} disabled={person.unavailable}>
            {person.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
});

InputSelect.displayName = "InputSelect";

export default InputSelect;
