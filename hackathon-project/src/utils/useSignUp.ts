import { useMutation } from "@tanstack/react-query";

export type SignUpFormData = {
  fullName: string;
  email: string;
  password: string;
};

export default function useSignUp() {
  async function signUpUser(formData: SignUpFormData) {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("There was an error signing up!");
    }

    const dataResponse = await response.json();

    return dataResponse;
  }

  return useMutation<SignUpFormData, Error, SignUpFormData>({ mutationFn: (formData) => signUpUser(formData) });
}
