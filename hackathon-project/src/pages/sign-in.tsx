import Button from "@/components/ui/Button";
import InputRounded from "@/components/ui/InputRounded";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { IconMail, IconUserCircle, IconLock } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import useSignIn, { type SignInFormData } from "@/utils/useSignIn";
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();

  const { isLoading, isSuccess } = useSignIn();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignInFormData>();

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    reset();

    router.push("/dashboard");
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-cloud bg-repeat-round">
      <section className="mx-auto flex w-11/12 max-w-6xl rounded-lg bg-white shadow-lg">
        <div className="flex w-full flex-col gap-6 p-10 lg:w-3/5 lg:px-20 lg:py-20">
          <div className="flex flex-col gap-2 text-center">
            <p className="text-lg font-bold">Hello!</p>
            <p className="text-base">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
            <InputRounded {...register("email", { required: true })} intent={errors.email ? "error" : "primary"} leadingIcon={<IconMail className="h-6 w-6" />} placeholderOffset="pl-14" errorMessage="Enter your email" id="emailInput" type="email" placeholder="Email">
              Email
            </InputRounded>

            <div className="flex flex-col gap-2">
              <InputRounded {...register("password", { required: true, minLength: 8 })} intent={errors.password ? "error" : "primary"} leadingIcon={<IconLock className="h-6 w-6" />} placeholderOffset="pl-14" errorMessage="Enter a password" id="passwordInput" type="password" placeholder="Password">
                Password
              </InputRounded>

              <div className="flex justify-end">
                <Link href="/forgot-password">Forgot password?</Link>
              </div>
            </div>

            <Button intent={isLoading ? "loading" : "primary"} disabled={isLoading} size="lg">
              {!isLoading && !isSuccess && "Sign in"}
              {isLoading && (
                <div className="flex items-center gap-1">
                  <LoadingSpinner />
                  Signing in
                </div>
              )}
              {isSuccess && "Signed in"}
            </Button>
          </form>

          <div className="text-center">
            Don't have an account?
            <Link href="/sign-up" className="text-primary">
              Sign up!
            </Link>
          </div>
        </div>

        <div className="gradient-primary hidden w-2/5 flex-col items-center justify-center gap-4 rounded-lg p-10 lg:flex">
          <p className="text-center text-lg font-bold text-white">Welcome back!</p>

          <p className="text-center text-gray-200">
            Welcome back to our Hackathon app! We{"'"}ve added new features based on your feedback. Whether you{"'"}re planning or participating in a hackathon, our platform is here to support you. Thanks for choosing our app and we can{"'"}t wait to see your next great project!
          </p>
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
