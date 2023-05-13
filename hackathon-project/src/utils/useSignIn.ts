import { useQuery } from "@tanstack/react-query";

export type SignInFormData = {
  email: string;
  password: string;
};

export default function useSignIn() {
  async function signInUser() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) {
      throw new Error("There was an error signing in the user!");
    }

    return res.json();
  }
  // TODO
  // Add type of response
  return useQuery({ queryKey: ["user"], queryFn: () => signInUser() });
}
