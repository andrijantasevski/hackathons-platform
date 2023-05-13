import { Button } from "@/components/ui/Button";
import InputRounded from "@/components/ui/InputRounded";
import InputUnderlined from "@/components/ui/InputUnderlined";
import { IconMail } from "@tabler/icons-react";

export default function Home() {
  return (
    <main className="p-4">
      <div>STATES FOR UNDERLINED INPUT</div>
      <InputUnderlined intent="primary" errorMessage="Error message for nameInput" id="nameInput" type="text" placeholder="Hi">
        Label
      </InputUnderlined>

      <InputUnderlined intent="error" errorMessage="Error message for surnameInput" id="surnameInput" type="text" placeholder="Hi">
        Hi
      </InputUnderlined>

      <div>
        <div>STATES FOR ROUNDED INPUT</div>
        <InputRounded leadingIcon={<IconMail className="h-5 w-5" />} placeholderOffset="pl-9" intent="primary" errorMessage="Error message for nameInput" id="nameInput" type="text" placeholder="Hi">
          Label
        </InputRounded>

        <InputRounded leadingIcon={<IconMail className="h-5 w-5" />} placeholderOffset="pl-9" intent="error" errorMessage="Error message for nameInput" id="nameInput" type="text" placeholder="Hi">
          Label
        </InputRounded>
      </div>
    </main>
  );
}
