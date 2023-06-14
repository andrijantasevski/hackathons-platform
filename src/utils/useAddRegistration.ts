import { useMutation } from "@tanstack/react-query";
import { EventTypes } from "@/pages/event/[eventId]";
import { env } from "@/env";

export default function useAddRegistration() {
  async function addHackathon(formData: EventTypes) {
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_BASE_URL}/api/applicants/create`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("There was an error registering you!");
    }

    const dataResponse = await response.json();

    return dataResponse;
  }

  return useMutation<EventTypes, Error, EventTypes>({
    mutationFn: (formData) => addHackathon(formData),
  });
}
