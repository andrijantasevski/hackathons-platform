import { useQuery } from "@tanstack/react-query";
import { Student } from "@/pages/dashboard/tracking";
import hackathonData from "../../data/hackathonData.json";

export default function useGetStudents() {
  async function fetchStudents() {
    const response = await fetch("https://david-petkovski.sharedwithexpose.com/api/applicants?event_id=3");

    const responseData = await response.json();

    return hackathonData;
  }

  return useQuery<Student[]>({ queryFn: fetchStudents, queryKey: ["students"] });
}
