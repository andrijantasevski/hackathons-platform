import { useQuery } from "@tanstack/react-query";
import { env } from "@/env";
import { Certificate } from "@/pages/api/certificates";

export default function useGetCertificates({
  isQueryEnabled,
  email,
}: {
  isQueryEnabled: boolean;
  email: string;
}) {
  const queryKey = email ? ["certificates", email] : ["certificates"];

  async function fetchCertificates() {
    const response = await fetch(`/api/certificates?email=${email}`);

    if (!response.ok) {
      new Error("There was an error fetching the certificates!");
    }

    const responseData = await response.json();

    return responseData;
  }

  return useQuery<{ data: Certificate[] | null; message: string }>({
    queryFn: fetchCertificates,
    queryKey,
    enabled: isQueryEnabled,
    refetchOnWindowFocus: false,
  });
}
