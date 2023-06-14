import Button from "@/components/ui/Button";
import InputRounded from "@/components/ui/InputRounded";
import { Label } from "@/components/ui/Label";
import { IconSearch } from "@tabler/icons-react";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";

type CertificateFormInputs = {
  email: string;
};

export default function Certificates() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CertificateFormInputs>();

  const onSubmit: SubmitHandler<CertificateFormInputs> = () => {};

  return (
    <>
      <Head>
        <title>Certificates</title>
      </Head>
      <main className="min-h-screen bg-cloud bg-cover py-20">
        <div className="mx-auto flex w-11/12 max-w-screen-xl flex-col items-center justify-center">
          <section className="flex w-full flex-col gap-6 text-center">
            <h1 className="text-6xl font-bold uppercase">welcome</h1>

            <p className="text-xl font-medium">
              Enter your email address and find your certificate
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto flex w-full max-w-screen-sm flex-col gap-4"
            >
              <div>
                <Label htmlFor="emailInput" srOnly>
                  Email
                </Label>

                <InputRounded
                  {...register("email", { required: true })}
                  leadingIcon={<IconSearch />}
                  placeholderOffset="pl-12"
                  id="emailInput"
                  placeholder="Email"
                  type="email"
                  variant={errors.email ? "error" : "primary"}
                />
              </div>

              <Button>Search</Button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
