import { Button } from "@/components/ui/Button";
import InputUnderlined from "@/components/ui/InputUnderlined";

export default function Home() {
  return (
    <main className="p-4">
      <div>INPUT STATES FOR UNDERLINED INPUT</div>
      <InputUnderlined intent="primary" errorMessage="Error message for nameInput" id="nameInput" type="text" placeholder="Hi">
        Label
      </InputUnderlined>

      <InputUnderlined intent="error" errorMessage="Error message for surnameInput" id="surnameInput" type="text" placeholder="Hi">
        Hi
      </InputUnderlined>
    </main>
  );
}
