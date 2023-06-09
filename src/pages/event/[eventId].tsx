import Button from "@/components/ui/Button";
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
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupTitle,
} from "@/components/ui/RadioGroup";
import useGetAcademies from "@/utils/useGetAcademies";
import useGetGroups from "@/utils/useGetGroups";
import { twMerge } from "tailwind-merge";

export type EventTypes = {
  name: string;
  email: string;
  phone: string;
  academy_id: string;
  group: string;
  availability: string;
  presence: string;
  food: string;
  comment: string;
};

function InputContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={twMerge("rounded-lg bg-white p-6 shadow-lg", className)}>
      {children}
    </div>
  );
}

const Event: NextPage = () => {
  const router = useRouter();

  const { eventId } = router.query;

  const [isModalShown, setIsModalShown] = useState(false);

  const { mutate } = useAddRegistration();

  const { data: academies } = useGetAcademies();

  const { data: groups } = useGetGroups();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    watch,
  } = useForm<EventTypes>();

  const selectedAcademyId = watch("academy_id");

  const groupsPerSelectedAcademy =
    selectedAcademyId &&
    groups &&
    groups.filter((group) => group.academy_id === Number(selectedAcademyId));

  const isGroupsPerSelectedAcademyEmpty =
    Array.isArray(groupsPerSelectedAcademy) &&
    groupsPerSelectedAcademy.length === 0;

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
          src="/images/hackathon-hero-image.jpg"
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
              <InputContainer className="flex flex-col gap-2">
                <Label htmlFor="fullNameInput" fontWeight="bold">
                  Full name
                </Label>

                <InputUnderlined
                  {...register("name", { required: true })}
                  variant={errors.name ? "error" : "primary"}
                  errorMessage="Enter your full name"
                  id="fullNameInput"
                  type="text"
                  placeholder="Full name"
                />
              </InputContainer>

              <InputContainer className="flex flex-col gap-2">
                <Label htmlFor="emailInput" fontWeight="bold">
                  Email
                </Label>

                <InputUnderlined
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Za-z0-9+_.-]+@(.+)$/,
                  })}
                  variant={errors.email ? "error" : "primary"}
                  errorMessage="Enter your email"
                  id="emailInput"
                  type="email"
                  placeholder="example@email.com"
                />
              </InputContainer>

              <InputContainer className="flex flex-col gap-2">
                <Label htmlFor="phoneNumberInput" fontWeight="bold">
                  Phone number
                </Label>

                <InputUnderlined
                  {...register("phone", {
                    required: true,
                    pattern:
                      /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm,
                  })}
                  variant={errors.phone ? "error" : "primary"}
                  errorMessage="Enter your phone number"
                  id="phoneNumberInput"
                  type="tel"
                  placeholder="Phone number"
                />
              </InputContainer>

              <InputContainer>
                <Controller
                  control={control}
                  name="academy_id"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <div className="flex flex-col gap-2.5">
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
                          variant={
                            errors.academy_id
                              ? "underlined-error"
                              : "underlined"
                          }
                        >
                          <SelectValue placeholder="Select an academy" />
                        </SelectTrigger>
                        <SelectContent>
                          {academies &&
                            academies.academies.slice(0, 10).map((academy) => (
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
                    <div className="flex flex-col gap-2.5">
                      <Label fontWeight="bold" htmlFor="selectGroup">
                        Select a group
                      </Label>
                      <Select
                        disabled={
                          (!selectedAcademyId && !groupsPerSelectedAcademy) ||
                          isGroupsPerSelectedAcademyEmpty
                        }
                        isError={errors.group}
                        errorMessage="Please select a group"
                        onValueChange={onChange}
                      >
                        <SelectTrigger
                          id="selectGroup"
                          variant={
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
                <RadioGroupTitle>
                  Are you ready for 48h work and availability during the
                  hackaton?
                </RadioGroupTitle>
                <Controller
                  control={control}
                  defaultValue={""}
                  name="availability"
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => (
                    <RadioGroup id="availabilityInput" onValueChange={onChange}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          variant={errors.availability ? "error" : "primary"}
                          value="yes"
                          id="availabilityYes"
                        />
                        <Label
                          variant={errors.availability ? "error" : "primary"}
                          htmlFor="availabilityYes"
                        >
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          variant={errors.availability ? "error" : "primary"}
                          value="no"
                          id="availabilityNo"
                        />
                        <Label
                          variant={errors.availability ? "error" : "primary"}
                          htmlFor="availabilityNo"
                        >
                          No
                        </Label>
                      </div>
                      <div>
                        {errors.availability && (
                          <p className="text-left text-error-500">
                            Please choose availability
                          </p>
                        )}
                      </div>
                    </RadioGroup>
                  )}
                />
              </InputContainer>

              <InputContainer>
                <RadioGroupTitle>
                  Will you be joining us online or in person?
                </RadioGroupTitle>
                <Controller
                  control={control}
                  name="presence"
                  defaultValue={""}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <RadioGroup onValueChange={onChange} defaultValue="">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          variant={errors.presence ? "error" : "primary"}
                          value="live"
                          id="live"
                        />
                        <Label
                          variant={errors.presence ? "error" : "primary"}
                          htmlFor="live"
                        >
                          Live
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          variant={errors.presence ? "error" : "primary"}
                          value="no"
                          id="online"
                        />
                        <Label
                          variant={errors.presence ? "error" : "primary"}
                          htmlFor="online"
                        >
                          Online
                        </Label>
                      </div>
                      <div>
                        {errors.availability && (
                          <p className="text-left text-error-500">
                            Please select presence
                          </p>
                        )}
                      </div>
                    </RadioGroup>
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
                  render={({ field: { onChange } }) => (
                    <RadioGroup onValueChange={onChange}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          variant={errors.food ? "error" : "primary"}
                          value="vegetarian"
                          id="vegetarian"
                        />
                        <Label
                          variant={errors.food ? "error" : "primary"}
                          htmlFor="vegetarian"
                        >
                          Vegetarian
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          variant={errors.food ? "error" : "primary"}
                          value="vegan"
                          id="vegan"
                        />
                        <Label
                          variant={errors.food ? "error" : "primary"}
                          htmlFor="vegan"
                        >
                          Vegan
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          variant={errors.food ? "error" : "primary"}
                          value="no_preferences"
                          id="noPreferences"
                        />
                        <Label
                          variant={errors.food ? "error" : "primary"}
                          htmlFor="noPreferences"
                        >
                          No preferences
                        </Label>
                      </div>
                      <div>
                        {errors.availability && (
                          <p className="text-left text-error-500">
                            Select presence
                          </p>
                        )}
                      </div>
                    </RadioGroup>
                  )}
                />
              </InputContainer>

              <InputContainer className="flex flex-col gap-2">
                <Label htmlFor="commentInput" fontWeight="bold">
                  Anything else you would like to mention?
                </Label>

                <InputUnderlined
                  {...register("comment")}
                  variant={errors.comment ? "error" : "primary"}
                  errorMessage="Enter a message"
                  id="commentInput"
                  type="text"
                  placeholder="Your message"
                />
              </InputContainer>

              <Button variant="primary" size="lg" type="submit">
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
