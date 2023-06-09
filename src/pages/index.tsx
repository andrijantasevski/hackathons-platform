import Button from "@/components/ui/Button";
import InputRounded from "@/components/ui/InputRounded";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { IconMail, IconLock } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import useSignIn, { type SignInFormData } from "@/utils/useSignIn";
import { useRouter } from "next/router";
import Head from "next/head";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/Select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Label } from "@/components/ui/Label";

export default function SignIn() {
  const router = useRouter();

  const { mutate, isLoading, isSuccess } = useSignIn();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "varus.varusanov@mail.com",
      password: "Admin123#",
    },
  });

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();

        toast.success("Successful login!");

        setTimeout(() => router.push("/dashboard"), 200);
      },
      onError: () => {
        toast.error("There was an error signing you in!");
      },
    });
  };

  return (
    <>
      <Head>
        <title>Hackathon - Sign in</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative mx-auto flex min-h-screen w-11/12 flex-col items-center justify-between gap-10 bg-cloud bg-repeat-round py-10">
        <div className="w-full" />
        <section className="mx-auto flex w-full max-w-6xl rounded-lg bg-white shadow-lg">
          <div className="flex w-full flex-col gap-6 px-6 py-8 lg:w-3/5 lg:p-20">
            <div className="flex flex-col gap-2 text-center">
              <p className="text-2xl font-bold">Hello!</p>
              <p className="text-lg">Sign in to your account</p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-4"
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="emailInput" srOnly>
                  Email
                </Label>

                <InputRounded
                  {...register("email", { required: true })}
                  variant={errors.email ? "error" : "primary"}
                  leadingIcon={<IconMail className="h-6 w-6" />}
                  placeholderOffset="pl-14"
                  errorMessage="Enter your email"
                  id="emailInput"
                  type="email"
                  placeholder="Email"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="passwordInput" srOnly>
                    Email
                  </Label>

                  <InputRounded
                    {...register("password", { required: true, minLength: 8 })}
                    variant={errors.password ? "error" : "primary"}
                    leadingIcon={<IconLock className="h-6 w-6" />}
                    placeholderOffset="pl-14"
                    errorMessage="Enter a password"
                    id="passwordInput"
                    type="password"
                    placeholder="Password"
                  />
                </div>

                <div className="flex justify-end">
                  <Link href="/forgot-password">Forgot password?</Link>
                </div>
              </div>

              <Button
                intent={isLoading ? "loading" : "primary"}
                disabled={isLoading}
                size="lg"
              >
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
              <span>Don{"'"}t have an account? </span>

              <Link href="/sign-up" className="text-primary">
                Sign up!
              </Link>
            </div>
          </div>

          <div className="gradient-primary hidden w-2/5 flex-col items-center justify-center gap-4 rounded-lg p-10 lg:flex">
            <p className="text-center text-2xl font-bold text-white">
              Welcome back!
            </p>

            <p className="text-center text-gray-200">
              Welcome back to our Hackathon app! We{"'"}ve added new features
              based on your feedback. Whether you{"'"}re planning or
              participating in a hackathon, our platform is here to support you.
              Thanks for choosing our app and we can{"'"}t wait to see your next
              great project!
            </p>
          </div>
        </section>

        <div className="flex items-center gap-6 lg:gap-20">
          <Link
            className="block h-[48px] w-[150px]"
            href="https://www.brainster.co/"
          >
            <Image
              src="/images/logos/brainster-logo.png"
              width={150}
              height={48}
              alt="Brainster Logo"
              fetchPriority="high"
            />
          </Link>

          <Link
            className="block h-[48px] w-[150px]"
            href="https://scidevcenter.org/"
          >
            <Image
              src="/images/logos/scidev-logo.png"
              alt="SCIDev Logo"
              width={150}
              height={48}
              priority
            />
          </Link>
        </div>
      </main>
    </>
  );
}
