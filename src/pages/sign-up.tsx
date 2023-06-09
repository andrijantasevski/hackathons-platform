import Button from "@/components/ui/Button";
import InputRounded from "@/components/ui/InputRounded";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { IconMail, IconUserCircle, IconLock } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import useSignUp, { SignUpFormData } from "@/utils/useSignUp";
import { useRouter } from "next/router";
import Head from "next/head";
import { toast } from "react-hot-toast";

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

        toast.success("Account created successfully!");

        setTimeout(() => router.push("/dashboard"), 400);
      },
      onError: () => {
        toast.error("There was an error signing you up!");
      },
    });
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative mx-auto flex min-h-screen w-11/12 flex-col items-center justify-between gap-10 bg-cloud bg-repeat-round py-10">
        <div className="w-full" />

        <section className="mx-auto flex w-full max-w-6xl rounded-lg bg-white shadow-lg">
          <div className="flex w-full flex-col gap-6 px-6 py-8 lg:w-3/5 lg:p-20">
            <div className="flex flex-col gap-2 text-center">
              <p className="text-2xl font-bold">Hello!</p>
              <p className="text-lg">Register to your account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
              <InputRounded withIcon={true} {...register("fullName", { required: true })} intent={errors.fullName ? "error" : "primary"} leadingIcon={<IconUserCircle className="h-6 w-6" />} placeholderOffset="pl-14" errorMessage="Enter your full name" id="fullNameInput" type="text" placeholder="Full name">
                Full name
              </InputRounded>

              <InputRounded withIcon={true} {...register("email", { required: true })} intent={errors.email ? "error" : "primary"} leadingIcon={<IconMail className="h-6 w-6" />} placeholderOffset="pl-14" errorMessage="Enter your email" id="emailInput" type="email" placeholder="Email">
                Email
              </InputRounded>

              <InputRounded withIcon={true} {...register("password", { required: true, minLength: 8 })} intent={errors.password ? "error" : "primary"} leadingIcon={<IconLock className="h-6 w-6" />} placeholderOffset="pl-14" errorMessage="Enter a password" id="passwordInput" type="password" placeholder="Password">
                Password
              </InputRounded>

              <Button intent={isLoading ? "loading" : "primary"} disabled={isLoading} size="lg">
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
              <span>Already have an account? </span>
              <Link href="/" className="text-primary">
                Sign in!
              </Link>
            </div>
          </div>

          <div className="gradient-primary hidden w-2/5 flex-col items-center justify-center gap-4 rounded-lg p-10 lg:flex">
            <p className="text-center text-2xl font-bold text-white">Welcome!</p>

            <p className="text-center text-gray-200">Welcome to our Hackathon app! Create your own hackathon event with ease. Sign up now and access powerful tools to manage registrations, track progress, and connect with participants. Let{"'"}s get started and create an amazing hackathon experience together!</p>
          </div>
        </section>

        <div className="flex items-center gap-20">
          <Link href="https://www.brainster.co/">
            <Image src="/icons/Brainster-Logo1.svg" width={150} height={150} alt="Brainster Logo" />
          </Link>

          <Link href="https://scidevcenter.org/">
            <Image src="/icons/LogoSCiDEV1.svg" width={150} height={150} alt="Brainster Logo" />
          </Link>
        </div>
      </main>
    </>
  );
}
