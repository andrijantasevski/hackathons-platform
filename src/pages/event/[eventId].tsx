import Button from "@/components/ui/Button";
import InputRadioGroup from "@/components/ui/InputRadioGroup";
import InputUnderlined from "@/components/ui/InputUnderlined";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import ModalFinishedForm from "@/components/ModalFinishedForm";
import { useState } from "react";
import useAddRegistration from "@/utils/useAddRegistration";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import useGetAcademies from "@/utils/useGetAcademies";

export type EventTypes = {
  name: string;
  email: string;
  phone: string;
  academy_id: number;
  group: number;
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

  const { data: academies } = useGetAcademies();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<EventTypes>();

  const onSubmit: SubmitHandler<EventTypes> = (data) => {
    console.log(data);
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
        <Image
          priority
          className="hidden w-full lg:block"
          src="/images/hackathon-hero-image.png"
          width={1920}
          height={270}
          alt="People working at a hackathon behind computers."
        />

        <section className="mx-auto w-11/12 max-w-4xl justify-center py-8 lg:py-10">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 text-center">
              <h1 className="text-3xl font-bold lg:text-4xl">
                Please fill out this form!
              </h1>
              <p className="text-lg">
                Join us for an exhilarating hackathon experience! Fill out the
                form below to register and unlock a world of creativity,
                collaboration, and innovation. Let{"'"}s embark on this exciting
                journey together!
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-6"
            >
              <InputContainer>
                <InputUnderlined
                  {...register("name", { required: true })}
                  intent={errors.name ? "error" : "primary"}
                  errorMessage="Enter your full name"
                  id="fullNameInput"
                  type="text"
                  placeholder="Full name"
                >
                  Name and surname
                </InputUnderlined>
              </InputContainer>

              <InputContainer>
                <InputUnderlined
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Za-z0-9+_.-]+@(.+)$/,
                  })}
                  intent={errors.email ? "error" : "primary"}
                  errorMessage="Enter your email"
                  id="emailInput"
                  type="email"
                  placeholder="example@email.com"
                >
                  E-mail
                </InputUnderlined>
              </InputContainer>

              <InputContainer>
                <InputUnderlined
                  {...register("phone", {
                    required: true,
                    pattern:
                      /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm,
                  })}
                  intent={errors.phone ? "error" : "primary"}
                  errorMessage="Enter your phone number"
                  id="phoneNumberInput"
                  type="tel"
                  placeholder="Phone number"
                >
                  Phone number
                </InputUnderlined>
              </InputContainer>

              <InputContainer>
                <Controller
                  control={control}
                  name="academy_id"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <div className="flex flex-col gap-2">
                      <Label fontWeight="bold" htmlFor="selectAcademy">
                        Select an academy
                      </Label>
                      <Select
                        isError={errors.academy_id}
                        errorMessage="Please select an academy"
                        onValueChange={onChange}
                      >
                        <SelectTrigger
                          id="selectAcademy"
                          intent={
                            errors.academy_id
                              ? "underlined-error"
                              : "underlined"
                          }
                        >
                          <SelectValue placeholder="Select an academy" />
                        </SelectTrigger>
                        <SelectContent>
                          {academies && academies.academies.map((academy) => (
                            <SelectItem
                              key={academy.id}
                              value={String(academy.id)}
                            >
                              {academy.academy_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />
              </InputContainer>

              <InputContainer>
                <Controller
                  control={control}
                  name="group"
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => (
                    <div className="flex flex-col gap-2">
                      <Label fontWeight="bold" htmlFor="selectGroup">
                        Select a group
                      </Label>
                      <Select
                        isError={errors.group}
                        errorMessage="Please select a group"
                        onValueChange={onChange}
                      >
                        <SelectTrigger
                          id="selectGroup"
                          intent={
                            errors.group ? "underlined-error" : "underlined"
                          }
                        >
                          <SelectValue placeholder="Select a group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Group 1</SelectItem>
                          <SelectItem value="2">Group 2</SelectItem>
                          <SelectItem value="3">Group 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />
              </InputContainer>

              <InputContainer>
                <p className="mb-3 text-left font-bold">
                  Are you ready for 48h work and availability during the
                  hackaton?
                </p>
                <Controller
                  control={control}
                  defaultValue={""}
                  name="availability"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <RadioGroup onValueChange={onChange} defaultValue="">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          intent={errors.availability ? "error" : "primary"}
                          value="yes"
                          id="availabilityYes"
                        />
                        <Label
                          intent={errors.availability ? "error" : "primary"}
                          htmlFor="availabilityYes"
                        >
                          Option One
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="availabilityNo" />
                        <Label htmlFor="availabilityNo">Option Two</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </InputContainer>

              <InputContainer>
                <p className="mb-3 text-left font-bold">
                  Will you be joining us online or in person?
                </p>
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
                        { title: "Live", value: "live" },
                      ]}
                    />
                  )}
                />
              </InputContainer>

              <InputContainer>
                <p className="mb-3 text-left font-bold">
                  Tell us your food preferences
                </p>
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
                        {
                          title: "I don't have preferences",
                          value: "no_preferences",
                        },
                      ]}
                    />
                  )}
                />
              </InputContainer>

              <InputContainer>
                <InputUnderlined
                  {...register("comment")}
                  intent={errors.comment ? "error" : "primary"}
                  errorMessage="Enter a message"
                  id="commentInput"
                  type="text"
                  placeholder="Your message"
                >
                  Anything else you would like to mention?
                </InputUnderlined>
              </InputContainer>

              <Button intent="primary" size="lg" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </section>
      </main>

      {isModalShown && (
        <ModalFinishedForm
          isModalShown={isModalShown}
          setIsModalShown={setIsModalShown}
        />
      )}
    </>
  );
};

export default Event;
