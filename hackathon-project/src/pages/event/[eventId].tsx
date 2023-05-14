import Button from "@/components/ui/Button";
import InputRadioGroup from "@/components/ui/InputRadioGroup";
import InputSelect from "@/components/ui/InputSelect";
import InputUnderlined from "@/components/ui/InputUnderlined";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import ModalFinishedForm from "@/components/ModalFinishedForm";
import { useState } from "react";
import useAddRegistration from "@/utils/useAddRegistration";

export type EventTypes = {
  name: string;
  email: string;
  phoneNumber: string;
  academy: string;
  group: string;
  availability: string;
  presence: string;
  food: string;
  comment: string;
};

function InputContainer({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg bg-white p-6 shadow-lg">{children}</div>;
}

const Event: NextPage = () => {
  const router = useRouter();

  const { eventId } = router.query;

  const [isModalShown, setIsModalShown] = useState(false);

  const { mutate } = useAddRegistration();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<EventTypes>();

  const onSubmit: SubmitHandler<EventTypes> = (data) => {
    const formData = { ...data, event_id: eventId };
    mutate(formData, { onSuccess: () => setIsModalShown(true) });
  };

  return (
    <>
      <Head>
        <title>Hackathon - Event</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-cloud bg-repeat-round text-center">
        <Image priority className="hidden w-full lg:block" src="/images/hackathon-hero-image.png" width={1920} height={270} alt="People working at a hackathon behind computers." />

        <section className="mx-auto w-11/12 max-w-4xl justify-center py-8 lg:py-10">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 text-center">
              <h1 className="text-3xl font-bold lg:text-4xl">Please fill out this form!</h1>
              <p className="text-lg">Join us for an exhilarating hackathon experience! Fill out the form below to register and unlock a world of creativity, collaboration, and innovation. Let{"'"}s embark on this exciting journey together!</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
              <InputContainer>
                <InputUnderlined {...register("name", { required: true })} intent={errors.name ? "error" : "primary"} errorMessage="Enter your full name" id="fullNameInput" type="text" placeholder="Full name" hideLabel={true}>
                  Name and surname
                </InputUnderlined>
              </InputContainer>

              <InputContainer>
                <InputUnderlined {...register("email", { required: true, pattern: /^[A-Za-z0-9+_.-]+@(.+)$/ })} intent={errors.email ? "error" : "primary"} errorMessage="Enter your email" id="emailInput" type="email" placeholder="example@email.com" hideLabel={true}>
                  E-mail
                </InputUnderlined>
              </InputContainer>

              <InputContainer>
                <InputUnderlined {...register("phoneNumber", { required: true, pattern: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm })} intent={errors.phoneNumber ? "error" : "primary"} errorMessage="Enter your phone number" id="phoneNumberInput" type="tel" placeholder="Phone number" hideLabel={true}>
                  Phone number
                </InputUnderlined>
              </InputContainer>

              <InputContainer>
                <Controller
                  defaultValue={""}
                  control={control}
                  name="academy"
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => (
                    <InputSelect
                      onChangeController={onChange}
                      label="Select academy:"
                      intent={errors.academy ? "error" : "primary"}
                      errorMessage="Select an academy"
                      selectOptions={[
                        { title: "Select an academy", value: "", disabled: true },
                        { title: "Option 1", value: "hi2", disabled: false },
                        { title: "Option 2", value: "hi3", disabled: false },
                        { title: "Option 3", value: "hi1", disabled: false },
                      ]}
                    />
                  )}
                />
              </InputContainer>

              <InputContainer>
                <Controller
                  control={control}
                  defaultValue={""}
                  name="group"
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => (
                    <InputSelect
                      onChangeController={onChange}
                      label="Select group:"
                      intent={errors.group ? "error" : "primary"}
                      errorMessage="Select a group"
                      selectOptions={[
                        { title: "Select a group", value: "", disabled: true },
                        { title: "Group 1", value: "1", disabled: false },
                        { title: "Group 2", value: "2", disabled: false },
                        { title: "Group 3", value: "3", disabled: false },
                        { title: "Group 4", value: "4", disabled: false },
                        { title: "Group 5", value: "5", disabled: false },
                      ]}
                    />
                  )}
                />
              </InputContainer>

              <InputContainer>
                <p className="mb-3 text-left font-bold">Are you ready for 48h work and availability during the hackaton?</p>
                <Controller
                  control={control}
                  defaultValue={""}
                  name="availability"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <InputRadioGroup
                      fieldValue={value}
                      onChangeController={onChange}
                      intent={errors.availability ? "error" : "primary"}
                      errorMessage="Select availability"
                      radioGroupOptions={[
                        { title: "Yes", value: "yes" },
                        { title: "No", value: "no" },
                      ]}
                    />
                  )}
                />
              </InputContainer>

              <InputContainer>
                <p className="mb-3 text-left font-bold">Will you be joining us online or in person?</p>
                <Controller
                  control={control}
                  name="presence"
                  defaultValue={""}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <InputRadioGroup
                      fieldValue={value}
                      onChangeController={onChange}
                      intent={errors.presence ? "error" : "primary"}
                      errorMessage="Select presence"
                      radioGroupOptions={[
                        { title: "Online", value: "online" },
                        { title: "In person", value: "inPerson" },
                      ]}
                    />
                  )}
                />
              </InputContainer>

              <InputContainer>
                <p className="mb-3 text-left font-bold">Tell us your food preferences</p>
                <Controller
                  control={control}
                  name="food"
                  defaultValue={""}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <InputRadioGroup
                      fieldValue={value}
                      onChangeController={onChange}
                      intent={errors.food ? "error" : "primary"}
                      errorMessage="Select food"
                      radioGroupOptions={[
                        { title: "Vegetarian", value: "vegetarian" },
                        { title: "Vegan", value: "vegan" },
                        { title: "I don't have preferences", value: "noPreferences" },
                      ]}
                    />
                  )}
                />
              </InputContainer>

              <InputContainer>
                <InputUnderlined {...register("comment")} intent={errors.comment ? "error" : "primary"} errorMessage="Enter a message" id="commentInput" type="text" placeholder="Your message" hideLabel={true}>
                  Anything else you would like to mention?
                </InputUnderlined>
              </InputContainer>

              <Button intent="primary" rounded="sm" size="lg" type="submit">
                Confirm
              </Button>
            </form>
          </div>
        </section>
      </main>

      {isModalShown && <ModalFinishedForm isModalShown={isModalShown} setIsModalShown={setIsModalShown} />}
    </>
  );
};

export default Event;
