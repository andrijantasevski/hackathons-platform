import Button from "@/components/ui/Button";
import InputRounded from "@/components/ui/InputRounded";
import InputUnderlined from "@/components/ui/InputUnderlined";
import InputRadioGroup from "@/components/ui/InputRadioGroup";
import { IconMail } from "@tabler/icons-react";
import InputSelect from "@/components/ui/InputSelect";

export default function Home() {
  return (
    <main className="flex flex-col gap-10 p-4">
      <div>
        <div>STATES FOR UNDERLINED INPUT</div>
        <InputUnderlined intent="primary" errorMessage="Error message for nameInput" id="nameInput" type="text" placeholder="Hi">
          Label
        </InputUnderlined>

        <InputUnderlined intent="error" errorMessage="Error message for surnameInput" id="surnameInput" type="text" placeholder="Hi">
          Hi
        </InputUnderlined>
      </div>

      <div>
        <div>STATES FOR ROUNDED INPUT</div>
        <InputRounded leadingIcon={<IconMail className="h-5 w-5" />} placeholderOffset="pl-9" intent="primary" errorMessage="Error message for nameInput" id="nameInput" type="text" placeholder="Hi">
          Label
        </InputRounded>

        <InputRounded leadingIcon={<IconMail className="h-5 w-5" />} placeholderOffset="pl-9" intent="error" errorMessage="Error message for nameInput" id="nameInput" type="text" placeholder="Hi">
          Label
        </InputRounded>
      </div>

      <div>
        <div>STATES FOR RADIO GROUP</div>
        <InputRadioGroup
          intent="primary"
          radioGroupItems={[
            { title: "Option 1", value: "hi2" },
            { title: "Option 2", value: "hi3" },
            { title: "Option 3", value: "hi1" },
          ]}
        />

        <InputRadioGroup
          intent="error"
          radioGroupItems={[
            { title: "Option 1", value: "hi2" },
            { title: "Option 2", value: "hi3" },
            { title: "Option 3", value: "hi1" },
          ]}
        />
      </div>

      <div>
        <div>STATES FOR SELECT INPUT</div>
        <InputSelect
          intent="primary"
          selectOptions={[
            { title: "Option 1", value: "hi2" },
            { title: "Option 2", value: "hi3" },
            { title: "Option 3", value: "hi1" },
          ]}
        />
      </div>

      <div>
        <div>STATES FOR BUTTONS</div>
        <Button intent="primary" rounded="sm" size="sm">
          Button 1
        </Button>
        .
        <Button intent="primary" rounded="xl" size="base">
          Button 1
        </Button>
        <Button intent="error" rounded="sm" size="lg">
          Button 1
        </Button>
        .
        <Button intent="error" rounded="xl" size="lg">
          Button 1
        </Button>
        <Button intent="error" rounded="xl" size="lg" uppercase>
          Button 1
        </Button>
      </div>
    </main>
  );
}
