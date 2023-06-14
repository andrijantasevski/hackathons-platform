import { useQuery } from "@tanstack/react-query";
import { Student } from "@/pages/dashboard/tracking";
import { env } from "@/env";

type Academy = {
    created_at: null | Date;
    updated_at: null | Date;
    academy_name: string;
    id: number;
}

export default function useGetAcademies() {
  async function fetchAcademies() {
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_BASE_URL}/api/academies`
    );

    if (!response.ok) {
      return new Error("Error!");
    }

    const responseData = await response.json();

    return responseData;
  }

  return useQuery<{academies: Academy[]}>({
    queryFn: fetchAcademies,
    queryKey: ["academies"],
  });
}
