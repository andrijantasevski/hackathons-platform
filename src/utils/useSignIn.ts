import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useUserContext } from "./userContext";
import { env } from "@/env";
import axios from "@/utils/axios";

export type SignInFormData = {
  email: string;
  password: string;
};

const responseSchema = z.object({
  message: z.string(),
  status: z.boolean(),
  token: z.string(),
});

const csrf = () => axios.get("/sanctum/csrf-cookie");

export default function useSignIn() {
  const { setUser } = useUserContext();

  async function signInUser(formData: SignInFormData) {
    const formDataObj = new FormData();

    formDataObj.set("email", formData.email);
    formDataObj.set("password", formData.password);

    axios.get("/sanctum/csrf-cookie").then((response) => {
      console.log(response);
      axios
        .post("/api/auth/login", formDataObj, {
          headers: {
            Authorization: "Bearer 37|vuBrhdbptOSI06Ih3gF4FGuXoxZt3NJ9tUZpaOZb",
          },
        })
        .then((response) => console.log(response));
    });

    const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
      method: "POST",
      body: formDataObj,
    });

    if (!response.ok) {
      throw new Error("There was an error signing you in!");
    }

    const responseData = await response.json();

    const parsedResponse = responseSchema.safeParse(responseData);

    if (!parsedResponse.success) {
      throw new Error("There was an error signing you in!");
    }

    localStorage.setItem("token", parsedResponse.data.token);
    setUser({ token: parsedResponse.data.token, isLoggedIn: true });

    return responseData;
  }

  return useMutation<SignInFormData, Error, SignInFormData>({
    mutationFn: (formData) => signInUser(formData),
  });
}
