import { useMutation } from "@tanstack/react-query";
import { EventTypes } from "@/pages/event/[eventId]";

export default function useAddRegistration() {
  async function addHackathon(formData: EventTypes) {
    const response = await fetch("https://david-petkovski.sharedwithexpose.com/api/applicants/create", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("There was an error registering you!");
    }

    const dataResponse = await response.json();

    return dataResponse;
  }

  return useMutation<EventTypes, Error, EventTypes>({ mutationFn: (formData) => addHackathon(formData) });
}
