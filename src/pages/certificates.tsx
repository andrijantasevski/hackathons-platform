import Button from "@/components/ui/Button";
import InputRounded from "@/components/ui/InputRounded";
import { Label } from "@/components/ui/Label";
import useGetCertificates from "@/utils/useGetCertificates";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconDownload,
  IconSearch,
} from "@tabler/icons-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Certificate } from "./api/certificates";

function CertificateCardLoading() {
  return (
    <div className="flex w-full animate-pulse flex-col items-center justify-center gap-4 rounded-lg bg-white p-6 shadow-lg">
      <div className="h-48 w-full animate-pulse rounded-lg bg-white shadow-2xl" />

      <div className="mx-auto h-9 w-1/2 animate-pulse rounded-lg bg-white shadow-2xl" />

      <div className="mx-auto h-10 w-1/2 animate-pulse rounded-lg bg-white shadow-2xl" />

      <div className="mx-auto h-4 w-1/2 animate-pulse rounded-lg bg-white shadow-2xl" />

      <div className="flex w-full items-center gap-2">
        {[...Array(3)].map((_, i) => (
          <div className="h-7 w-7 animate-pulse rounded-lg bg-white shadow-2xl" />
        ))}
      </div>
    </div>
  );
}

type CertificateCardProps = {
  certificate: Certificate;
};

function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-white p-6 shadow-lg">
      <Image
        src="/images/certificate-example.jpg"
        width={300}
        height={208}
        alt=""
        className="w-full rounded-lg"
      />

      <p className="text-xl font-bold">{certificate.hackathon_name}</p>

      <Button>
        <Link
          href={certificate.certificate_url}
          className="flex items-center gap-1"
        >
          Download
          <IconDownload className="h-5 w-5" />
        </Link>
      </Button>

      <div className="flex flex-col gap-2 text-center">
        <p>Share to:</p>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            title="Share certificate to LinkedIn"
            aria-label="Share certificate to LinkedIn"
          >
            <IconBrandLinkedin className="h-7 w-7 text-primary" />
          </Link>

          <Link
            href="/"
            title="Share certificate to Instagram"
            aria-label="Share certificate to Instagram"
          >
            <IconBrandInstagram className="h-7 w-7 text-primary" />
          </Link>

          <Link
            href=""
            title="Share certificate to Facebook"
            aria-label="Share certificate to Facebook"
          >
            <IconBrandFacebook className="h-7 w-7 text-primary" />
          </Link>
        </div>
      </div>
    </div>
  );
}

type CertificateFormInputs = {
  email: string;
};

export default function Certificates() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CertificateFormInputs>({
    defaultValues: { email: "demo@gmail.com" },
  });

  const [email, setEmail] = useState("");
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);

  const onSubmit: SubmitHandler<CertificateFormInputs> = (formData) => {
    !isQueryEnabled && setIsQueryEnabled(true);
    setEmail(formData.email);
  };
  const onError: SubmitErrorHandler<CertificateFormInputs> = (errors) => {
    if (errors.email) {
      toast.error("Please enter an email to find your certificates!");
    }
  };

  const { data: certificates, fetchStatus } = useGetCertificates({
    isQueryEnabled,
    email,
  });

  return (
    <>
      <Head>
        <title>Certificates</title>
      </Head>
      <main className="min-h-screen bg-cloud bg-cover py-20">
        <div className="mx-auto flex w-11/12 max-w-screen-xl flex-col items-center justify-center gap-10">
          <section className="flex w-full flex-col gap-6 text-center">
            <h1 className="text-6xl font-bold uppercase">welcome</h1>

            <p className="text-xl font-medium">
              Enter your email address and find your certificate
            </p>

            <form
              onSubmit={handleSubmit(onSubmit, onError)}
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

              <Button size="lg">Search</Button>
            </form>
          </section>

          <section className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {fetchStatus !== "fetching" &&
              certificates &&
              certificates.data?.map((certificate) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                />
              ))}
            {fetchStatus === "fetching" &&
              [...Array(3)].map((_, i) => <CertificateCardLoading key={i} />)}
          </section>

          {fetchStatus !== "fetching" &&
            certificates?.message !== "Success" && (
              <section>
                <p className="text-xl font-bold">{certificates?.message}</p>
              </section>
            )}
        </div>
      </main>
    </>
  );
}
