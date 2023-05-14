import { HackathonFormData } from "@/pages/dashboard/create";
import { useMutation } from "@tanstack/react-query";
import { useUserContext } from "./userContext";

export default function useAddHackathon() {
  const { user } = useUserContext();

  async function addHackathon(formData: HackathonFormData) {
    const hackathonFormData = new FormData();

    hackathonFormData.set("acadamies", String(formData.academies));
    hackathonFormData.set("application_deadline", formData.application_deadline);
    hackathonFormData.set("description", formData.description);
    hackathonFormData.set("end_date", formData.end_date);
    hackathonFormData.set("hackathonType", formData.hackathonType);
    hackathonFormData.set("start_date", formData.start_date);
    hackathonFormData.set("title", formData.title);

    const response = await fetch("https://david-petkovski.sharedwithexpose.com/api/event/create", {
      method: "POST",
      body: hackathonFormData,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${user.token}`,
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
