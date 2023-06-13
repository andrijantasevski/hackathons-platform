import { Hackathon } from "@/pages/api/hackathons";
import { useQuery } from "@tanstack/react-query";

export default function useGetHackathons() {
  async function fetcHackathons() {
    const response = await fetch("/api/hackathons");

    if (!response.ok) {
        throw new Error("There was an error fetching the hackathons!")
    }

    const responseData = await response.json();

    return responseData;
  }

  return useQuery<{
    id: number;
    status: "to-do" | "in-progress" | "done",
    event_data: Hackathon[]
  }[]>({ queryFn: fetcHackathons, queryKey: ["hackathons"] });
}
