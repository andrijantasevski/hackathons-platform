import { useQuery } from "@tanstack/react-query";
import { Student } from "@/pages/dashboard/tracking";
import hackathonData from "../../data/hackathonData.json";

export default function useGetStudents() {
  async function fetchStudents() {
    return hackathonData;
  }

  return useQuery<Student[]>({ queryFn: fetchStudents, queryKey: ["students"] });
}
