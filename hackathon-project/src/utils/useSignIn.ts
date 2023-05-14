import { useMutation } from "@tanstack/react-query";

export type SignInFormData = {
  email: string;
  password: string;
};

// email: varus.varusanov@mail.com
// password: Admin123#

export default function useSignIn() {
  async function signInUser(formData: SignInFormData) {
    const formDataObj = new FormData();

    formDataObj.set("email", formData.email);
    formDataObj.set("password", formData.password);

    const response = await fetch("https://david-petkovski.sharedwithexpose.com/api/auth/login", {
      method: "POST",
      body: formDataObj,
    });

    if (!response.ok) {
      throw new Error("There was an error signing in the user!");
    }

    console.log(response.json());

    return response.json();
  }

  return useMutation<SignInFormData, Error, SignInFormData>({ mutationFn: (formData) => signInUser(formData) });
}
