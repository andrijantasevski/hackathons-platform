import { useQuery } from "@tanstack/react-query";

type Group = {
  id: number;
  academy_id: number;
  title: string;
};

const groups = [
  { id: 1, academy_id: 1, title: "Group 1" },
  { id: 2, academy_id: 3, title: "Group 2" },
];

export default function useGetGroups() {
  async function fetchAcademies(): Promise<Group[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(groups), 1500);
    });
  }

  return useQuery<Group[]>({
    queryFn: fetchAcademies,
    queryKey: ["groups"],
  });
}
