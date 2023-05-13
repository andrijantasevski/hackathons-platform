import InputSelect from "@/components/ui/InputSelect";
import InputUnderlined from "@/components/ui/InputUnderlined";
import { EventTypes } from "@/types/types";
import type { NextPage } from "next";
import Head from "next/head";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

const Event: NextPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<EventTypes>();
  const onSubmit: SubmitHandler<EventTypes> = (data) => console.log(data);

  return (
    <>
      <Head>
        <title>Hackathon - Event</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto mt-9 text-center">
        <section className="mx-auto flex w-11/12 max-w-6xl rounded-lg bg-white shadow-lg">
          <div className="flex w-full flex-col gap-6 p-10 lg:w-3/5 lg:px-20 lg:py-20">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-xxl font-bold">Please fill out this form!</h1>
              <p>
                Join us for an exhilarating hackathon experience! Fill out the
                form below to register and unlock a world of creativity,
                collaboration, and innovation. Lets embark on this exciting
                journey together!
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-4"
            >
              <InputUnderlined
                {...register("name", { required: true })}
                intent={errors.name ? "error" : "primary"}
                errorMessage="Enter your full name"
                id="fullNameInput"
                type="text"
                placeholder="Full name"
                hideLabel={true}
              >
                <p className="font-bold">Name and surname:</p>
              </InputUnderlined>
              <InputUnderlined
                {...register("email", { required: true })}
                intent={errors.email ? "error" : "primary"}
                errorMessage="Enter your email"
                id="emailInput"
                type="email"
                placeholder="example@email.com"
                hideLabel={true}
              >
                <p className="font-bold">E-mail:</p>
              </InputUnderlined>
              <InputUnderlined
                {...register("email", { required: true })}
                intent={errors.phoneNumber ? "error" : "primary"}
                errorMessage="Enter your phone number"
                id="phoneNumberInput"
                type="text"
                placeholder="Phone number"
                hideLabel={true}
              >
                <p className="font-bold">Phone number:</p>
              </InputUnderlined>

              <InputSelect
                intent="primary"
                selectOptions={[
                  { title: "Option 1", value: "hi2" },
                  { title: "Option 2", value: "hi3" },
                  { title: "Option 3", value: "hi1" },
                ]}
              />

              <label>Select academy:</label>
              <select {...register("academy", { required: true })}>
                <option value="academy">Academy</option>
              </select>
              <label>Select group:</label>
              <select {...register("group")}>
                <option value="group">Group</option>
              </select>
              <label>
                Are you ready for 48h work and availability during the hackaton
              </label>
              <select {...register("availability", { required: true })}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="other">Other</option>
              </select>
              <label>Will you be joining us online or in person?</label>
              <select {...register("presence", { required: true })}>
                <option value="online">Online</option>
                <option value="inPerson">In person</option>
                <option value="other">Other</option>
              </select>
              <input type="submit" />
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Event;
