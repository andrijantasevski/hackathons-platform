import { useMutation } from "@tanstack/react-query";

export type ForgotPasswordFormData = {
  email: string;
};

export default function useForgotPassword() {
  async function resetPassword(formData: ForgotPasswordFormData) {
    // axios
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("There was an error sending the forgot password request!");
    }

    const dataResponse = await response.json();

    return dataResponse;
  }

  return useMutation<ForgotPasswordFormData, Error, ForgotPasswordFormData>({ mutationFn: (formData) => resetPassword(formData) });
}
