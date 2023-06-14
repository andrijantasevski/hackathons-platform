import { HackathonFormData } from "@/pages/dashboard/create";
import { useMutation } from "@tanstack/react-query";
import { useUserContext } from "./userContext";
import { env } from "@/env";

export default function useAddHackathon() {
  const { user } = useUserContext();

  async function addHackathon(formData: HackathonFormData) {
    const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/api/event/create`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("There was an error signing up!");
    }

    const dataResponse = await response.json();

    return dataResponse;
  }

  return useMutation<HackathonFormData, Error, HackathonFormData>({ mutationFn: (formData) => addHackathon(formData) });
}
