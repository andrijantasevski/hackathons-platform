import Button from "@/components/ui/Button";
import InputRounded from "@/components/ui/InputRounded";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { IconMail, IconUserCircle, IconLock } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import Head from "next/head";
import useForgotPassword, {
  ForgotPasswordFormData,
} from "@/utils/useForgotPassword";
import { toast } from "react-hot-toast";
import { Label } from "@/components/ui/Label";

export default function ForgotPassword() {
  const router = useRouter();

  const { mutate, isLoading } = useForgotPassword();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ForgotPasswordFormData>();

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        toast.success("Email sent succesfully!");
      },
    });
  };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative mx-auto flex min-h-screen w-11/12 flex-col items-center justify-between gap-10 bg-cloud bg-repeat-round py-10">
        <div />
        <section className="mx-auto flex w-full max-w-6xl rounded-lg bg-white shadow-lg">
          <div className="flex w-full flex-col gap-6 px-6 py-8 lg:w-3/5 lg:p-20">
            <div className="flex flex-col gap-2 text-center">
              <p className="text-2xl font-bold">Reset your password</p>
              <p className="text-lg">Enter your email to reset your password</p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-4"
            >
              <div>
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

              <Button
                variant={isLoading ? "loading" : "primary"}
                disabled={isLoading}
                size="lg"
              >
                {!isLoading && "Reset password"}
                {isLoading && (
                  <div className="flex items-center gap-1">
                    <LoadingSpinner />
                    Sending an email
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center">
              <span>Don{"'"}t have an account? </span>

              <Link href="/sign-up" className="text-primary">
                Sign up!
              </Link>
            </div>
          </div>

          <div className="hidden w-2/5 flex-col items-center justify-center gap-4 rounded-lg bg-gradient-primary p-10 lg:flex">
            <p className="text-center text-2xl font-bold text-white">
              Forgot your password?
            </p>

            <p className="text-center text-gray-200">
              Uh-oh, it looks like you{"'"}ve forgotten your password! Don{"'"}t
              worry, it happens to the best of us. To reset your password,
              simply enter your email address associated with your account and
              we{"'"}ll send you a link to reset it. If you have any issues,
              please contact our support team for assistance.
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
