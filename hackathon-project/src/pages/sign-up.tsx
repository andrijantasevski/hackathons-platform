import Button from "@/components/ui/Button";
import InputRounded from "@/components/ui/InputRounded";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { IconMail, IconUserCircle, IconLock } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import useSignUp, { SignUpFormData } from "@/utils/useSignUp";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();

  const { mutate, isLoading, isSuccess } = useSignUp();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignUpFormData>();

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();

        router.push("/dashboard");
      },
    });
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-cloud bg-repeat-round">
      <section className="mx-auto flex w-11/12 max-w-6xl rounded-lg bg-white shadow-lg">
        <div className="flex w-full flex-col gap-6 p-10 lg:w-3/5 lg:px-20 lg:py-20">
          <div className="flex flex-col gap-2 text-center">
            <p className="text-lg font-bold">Hello!</p>
            <p className="text-base">Register to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
            <InputRounded {...register("fullName", { required: true })} intent={errors.fullName ? "error" : "primary"} leadingIcon={<IconUserCircle className="h-6 w-6" />} placeholderOffset="pl-14" errorMessage="Enter your full name" id="fullNameInput" type="text" placeholder="Full name">
              Full name
            </InputRounded>

            <InputRounded {...register("email", { required: true })} intent={errors.email ? "error" : "primary"} leadingIcon={<IconMail className="h-6 w-6" />} placeholderOffset="pl-14" errorMessage="Enter your email" id="emailInput" type="email" placeholder="Email">
              Email
            </InputRounded>

            <InputRounded {...register("password", { required: true, minLength: 8 })} intent={errors.password ? "error" : "primary"} leadingIcon={<IconLock className="h-6 w-6" />} placeholderOffset="pl-14" errorMessage="Enter a password" id="emailInput" type="password" placeholder="Password">
              Password
            </InputRounded>

            {/* TODO  */}
            {/* Conditionally change intent and disabled button while we are making request */}
            {/* Status of fetching variable needed */}
            <Button intent="primary" disabled={false} size="lg">
              {!isLoading && !isSuccess && "Create account"}
              {isLoading && (
                <div className="flex items-center gap-1">
                  <LoadingSpinner />
                  Creating account
                </div>
              )}
              {isSuccess && "Account created"}
            </Button>
          </form>

          <div className="text-center">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary">
              Sign in!
            </Link>
          </div>
        </div>

        <div className="gradient-primary hidden w-2/5 flex-col items-center justify-center gap-4 rounded-lg p-10 lg:flex">
          <p className="text-center text-lg font-bold text-white">Welcome!</p>

          <p className="text-center text-gray-200">Welcome to our Hackathon app! Create your own hackathon event with ease. Sign up now and access powerful tools to manage registrations, track progress, and connect with participants. Let's get started and create an amazing hackathon experience together!</p>
        </div>
      </section>

      <div className="absolute bottom-10 flex items-center gap-20">
        <Link href="https://www.brainster.co/">
          <Image src="/icons/Brainster-Logo1.svg" width={150} height={150} alt="Brainster Logo" />
        </Link>

        <Link href="https://scidevcenter.org/">
          <Image src="/icons/LogoSCiDEV1.svg" width={150} height={150} alt="Brainster Logo" />
        </Link>
      </div>
    </main>
  );
}
