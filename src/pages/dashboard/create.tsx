import { useState, type ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import DashboardLayout from "@/layouts/DashboardLayout";
import Head from "next/head";
import InputRounded from "@/components/ui/InputRounded";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Button from "@/components/ui/Button";
import useAddHackathon from "@/utils/useAddHackathon";
import { toast } from "react-hot-toast";
import ModalFinishedCreatingHackathon from "@/components/ModalFinishedCreatingHackathon";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Label } from "@/components/ui/Label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Calendar } from "@/components/ui/Calendar";
import InputDatePicker from "@/components/ui/InputDatePicker";
import { format } from "date-fns";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateBefore } from "react-day-picker";

function checkFileExtension({ fileInput }: { fileInput: FileList }) {
  let isFileExtensionValid = true;

  for (let i = 0; i < fileInput.length; i++) {
    const currentFile = fileInput.item(i);

    const fileExtension = currentFile?.name.split(".").pop();

    if (fileExtension !== "pdf") {
      isFileExtensionValid = false;
      break;
    }
  }

  if (!isFileExtensionValid) {
    return false;
  }

  return true;
}

function checkFilesSizes({
  fileInput,
  fileSizeLimit,
}: {
  fileInput: FileList;
  fileSizeLimit: number;
}) {
  let isFileSizeValid = true;

  const fileSizeLimitToBytes = fileSizeLimit * 1048576;

  for (let i = 0; i < fileInput.length; i++) {
    const currentFile = fileInput.item(i);

    if (!currentFile) {
      isFileSizeValid = false;
      break;
    }

    if (currentFile.size > fileSizeLimitToBytes) {
      isFileSizeValid = false;
      break;
    }
  }

  if (!isFileSizeValid) {
    return false;
  }

  return true;
}

const academies = [
  {
    title: "Graphic design academy",
    value: "1",
  },
  {
    title: "UX/UI Design academy",
    value: "2",
  },
  {
    title: "Marketing academy",
    value: "3",
  },
  {
    title: "Front-end academy",
    value: "4",
  },
  {
    title: "QA academy",
    value: "5",
  },
  {
    title: "Full-stack academy",
    value: "6",
  },
  {
    title: "Product management academy",
    value: "7",
  },
];

const hackathonFormSchema = z
  .object({
    title: z.string().min(1, { message: "Please enter a name for the event!" }),
    application_deadline: z.date({
      required_error: "Please select a deadline for application!",
    }),
    start_date: z.date({
      required_error: "Please select a start date for the hackathon!",
    }),
    end_date: z.date({
      required_error: "Please select an end date for the hackathon!",
    }),
    type_id: z.string().min(1, { message: "Please select a hackathon type!" }),
    description: z
      .string()
      .min(1, { message: "Please enter information about the event/client!" }),
    academies: z.array(z.string(), {
      required_error: "Please select at least one academy!",
    }),
    file: z
      .custom<FileList>()
      .refine((files) => checkFileExtension({ fileInput: files }), {
        message: "Please choose .pdf files only!",
      })
      .refine(
        (files) => checkFilesSizes({ fileInput: files, fileSizeLimit: 8 }),
        {
          message: "Please choose files smaller than 8MB!",
        }
      )
      .optional(),
  })
  .refine(
    (data) =>
      data.application_deadline < data.start_date &&
      data.application_deadline < data.end_date,
    {
      message: "Application deadline must be before start and end date!",
      path: ["application_deadline"],
    }
  )
  .refine(
    (data) =>
      data.start_date > data.application_deadline &&
      data.start_date <= data.end_date,
    {
      message:
        "Start date must be after application deadline and before end date!",
      path: ["start_date"],
    }
  )
  .refine(
    (data) =>
      data.end_date > data.application_deadline &&
      data.end_date >= data.start_date,
    {
      message: "End date must be after application deadline and start date!",
      path: ["end_date"],
    }
  );

export type HackathonFormData = {
  title: string;
  application_deadline: string;
  start_date: string;
  end_date: string;
  type_id: string;
  description: string;
  academies: string[];
  file: FileList;
};

const DashboardCreate: NextPageWithLayout = () => {
  const [isModalShown, setIsModalShown] = useState(false);

  const [selectedAcademies, setSelectedAcademies] = useState<string[]>([]);

  const { mutate } = useAddHackathon();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<HackathonFormData>({
    resolver: zodResolver(hackathonFormSchema),
  });

  const onSubmit: SubmitHandler<HackathonFormData> = (data) => {
    mutate(data, {
      onSuccess: () => {
        setIsModalShown(true);
      },
      onError: () => toast.error("There was an error creating the hackathon!"),
    });

    setIsModalShown(true);
  };

  function toggleAcademy(academy: string) {
    if (selectedAcademies.includes(academy)) {
      const filteredAcadamies = selectedAcademies.filter(
        (academyFiltered) => academy !== academyFiltered
      );

      setSelectedAcademies(filteredAcadamies);
    } else {
      setSelectedAcademies((prevSelectedAcadamies) => [
        ...prevSelectedAcadamies,
        academy,
      ]);
    }
  }

  function toggleAcademies(academy: string) {
    if (selectedAcademies.includes(academy)) {
      const filteredAcadamies = selectedAcademies.filter(
        (academyFiltered) => academy !== academyFiltered
      );

      return filteredAcadamies;
    }

    return [...selectedAcademies, academy];
  }

  const applicationDeadline = watch("application_deadline");
  const startDate = watch("start_date");

  const applicationDeadlinePlusOneDay = new Date(applicationDeadline).setDate(
    new Date(applicationDeadline).getDate() + 1
  );

  const applicationDeadlineMatcher: DateBefore = { before: new Date() };
  const startDateMatcher: DateBefore = {
    before: new Date(applicationDeadlinePlusOneDay),
  };
  const endDateMatcher: DateBefore = { before: new Date(startDate) };

  return (
    <>
      <Head>
        <title>Dashboard - Create</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-auto flex w-11/12 max-w-4xl flex-col items-center gap-10 py-10 lg:py-20">
        <div className="flex flex-col items-center gap-4">
          <p className="text-3xl font-bold lg:text-4xl">
            Create a new hackathon
          </p>
          <p className="text-center text-lg">
            Create an extraordinary hackathon experience with our creation page.
            Customize challenges, formats, and settings to inspire innovation
            and collaboration. Unleash your creativity and shape a remarkable
            event that cultivates talent. Get started today!
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-6 lg:flex-row lg:gap-0"
        >
          <div className="flex w-full flex-col gap-4 lg:w-7/12 lg:pr-10">
            <div className="flex flex-col gap-3">
              <Label htmlFor="nameInput" fontWeight="bold">
                Name
              </Label>

              <InputRounded
                variant={errors.title ? "error" : "primary"}
                {...register("title")}
                errorMessage={errors.title?.message}
                id="nameInput"
                type="text"
                placeholder="Name of the event"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-bold">Deadline for application</p>

              <Controller
                name="application_deadline"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <div className="flex flex-col gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <InputDatePicker
                            variant={
                              value && !errors.application_deadline
                                ? "primary"
                                : errors.application_deadline
                                ? "primary-error"
                                : "primary-placeholder"
                            }
                          >
                            {value
                              ? format(new Date(value), "d MMMM y")
                              : "Deadline for application"}
                          </InputDatePicker>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto">
                          <Calendar
                            mode="single"
                            selected={new Date(value)}
                            onSelect={onChange}
                            disabled={applicationDeadlineMatcher}
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.application_deadline && (
                        <p className="text-left font-medium text-error">
                          {errors.application_deadline.message}
                        </p>
                      )}
                    </div>
                  );
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-bold">Start of hackathon</p>
              <Controller
                name="start_date"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <div className="flex flex-col gap-2">
                      <Popover>
                        <PopoverTrigger disabled={!applicationDeadline} asChild>
                          <InputDatePicker
                            variant={
                              value && !errors.start_date
                                ? "primary"
                                : errors.start_date
                                ? "primary-error"
                                : "primary-placeholder"
                            }
                          >
                            {value
                              ? format(new Date(value), "d MMMM y")
                              : "Start of hackathon"}
                          </InputDatePicker>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto">
                          <Calendar
                            mode="single"
                            selected={new Date(value)}
                            onSelect={onChange}
                            disabled={startDateMatcher}
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.start_date && (
                        <p className="text-left font-medium text-error">
                          {errors.start_date.message}
                        </p>
                      )}
                    </div>
                  );
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-bold">End of hackathon</p>
              <Controller
                name="end_date"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <div className="flex flex-col gap-2">
                      <Popover>
                        <PopoverTrigger disabled={!startDate} asChild>
                          <InputDatePicker
                            variant={
                              value && !errors.end_date
                                ? "primary"
                                : errors.end_date
                                ? "primary-error"
                                : "primary-placeholder"
                            }
                          >
                            {value
                              ? format(new Date(value), "d MMMM y")
                              : "End of hackathon"}
                          </InputDatePicker>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto">
                          <Calendar
                            mode="single"
                            selected={new Date(value)}
                            onSelect={onChange}
                            disabled={endDateMatcher}
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.end_date && (
                        <p className="text-left font-medium text-error">
                          {errors.end_date.message}
                        </p>
                      )}
                    </div>
                  );
                }}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="hackathonTypeInput" fontWeight="bold">
                Hackathon type
              </Label>
              <Controller
                control={control}
                defaultValue={""}
                name="type_id"
                render={({ field: { onChange } }) => (
                  <div className="flex flex-col gap-2">
                    <RadioGroup
                      id="hackathonTypeInput"
                      onValueChange={onChange}
                      direction="horizontal"
                      className="gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          variant={errors.type_id ? "error" : "primary"}
                          value="live"
                          id="live"
                        />
                        <Label
                          variant={errors.type_id ? "error" : "primary"}
                          htmlFor="live"
                        >
                          Live
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          variant={errors.type_id ? "error" : "primary"}
                          value="online"
                          id="online"
                        />
                        <Label
                          variant={errors.type_id ? "error" : "primary"}
                          htmlFor="online"
                        >
                          Online
                        </Label>
                      </div>
                    </RadioGroup>
                    <div>
                      {errors.type_id && (
                        <p className="text-left font-medium text-error">
                          Please select a hackathon type
                        </p>
                      )}
                    </div>
                  </div>
                )}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="informationClientInput" fontWeight="bold">
                Information about the event/client
              </Label>
              <textarea
                {...register("description")}
                id="informationClientInput"
                cols={10}
                rows={10}
                className={`resize-none rounded-lg border p-4 shadow-lg focus:outline-none focus:ring-1 ${
                  errors.description
                    ? "border-error focus:border-error focus:ring-error"
                    : "focus:border-primary focus:ring-primary"
                }`}
              ></textarea>
              <div>
                {errors.description && (
                  <span className="font-medium text-error"></span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Label htmlFor="fileInput" fontWeight="bold">
                Upload resources from the client (if provided)
              </Label>
              <InputRounded
                {...register("file")}
                variant={errors.file ? "error-file" : "primary-file"}
                id="fileInput"
                type="file"
                placeholder=""
                accept=".pdf"
                multiple
              />
              {errors.file && (
                <p className="font-medium text-error">{errors.file.message}</p>
              )}
            </div>
          </div>

          <div className="flex w-full flex-col justify-between gap-8 border-primary lg:w-5/12 lg:border-l-2 lg:pl-10">
            <div className="flex flex-col justify-between gap-3">
              <p className="font-bold">Select academies</p>

              <Controller
                name="academies"
                rules={{ required: true }}
                control={control}
                render={({ field: { onChange } }) => {
                  return (
                    <div className="flex flex-col gap-10">
                      {academies.map((academy) => (
                        <button
                          type="button"
                          onClick={() => {
                            toggleAcademy(academy.value);
                            onChange(toggleAcademies(academy.value));
                          }}
                          key={academy.value}
                          className={`flex w-full cursor-pointer justify-center rounded-lg border p-3 shadow-lg transition-colors hover:border-transparent hover:bg-primary hover:text-white ${
                            selectedAcademies.includes(academy.value)
                              ? "border-transparent bg-primary text-white"
                              : errors.academies
                              ? "border-error bg-white text-error"
                              : "border-transparent bg-white"
                          }`}
                        >
                          {academy.title}
                        </button>
                      ))}
                    </div>
                  );
                }}
              />
              {errors.academies && (
                <p className="font-medium text-error">
                  {errors.academies.message}
                </p>
              )}
            </div>

            <Button size="lg">Submit</Button>
          </div>
        </form>
      </div>
      {isModalShown && (
        <ModalFinishedCreatingHackathon
          isModalShown={isModalShown}
          setIsModalShown={setIsModalShown}
        />
      )}
    </>
  );
};

DashboardCreate.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardCreate;
