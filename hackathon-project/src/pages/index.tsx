import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function Home() {
  return (
    <main className="p-4">
      <div>INPUT STATES FOR UNDERLINED INPUT</div>
      <Input intent="primary" errorMessage="Error message for nameInput" id="nameInput" type="text" placeholder="Hi">
        Label
      </Input>

      <Input intent="error" errorMessage="Error message for surnameInput" id="surnameInput" type="text" placeholder="Hi">
        Hi
      </Input>
    </main>
  );
}
