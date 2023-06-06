import { useMutation } from "@tanstack/react-query";
import { EventTypes } from "@/pages/event/[eventId]";

export default function useAddRegistration() {
  async function addHackathon(formData: EventTypes) {
    fetch(
      "https://hackathonplatform-production.up.railway.app/sanctum/csrf-cookie"
    );

    const response = await fetch(
      "https://hackathonplatform-production.up.railway.app/api/applicants/create",
      {
        method: "POST",
        body: JSON.stringify({
          name: "Andrijan",
          email: "andrijan@email.com",
          phone: "070242141",
          academy_id: 1,
          group: "1",
          availability: "yes",
          presence: "live",
          food: "vegetarian",
          comment: "no comment",
          event_id: 4,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
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
