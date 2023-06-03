import { type ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import DashboardLayout from "@/layouts/DashboardLayout";
import Image from "next/image";
import Head from "next/head";
import Button from "@/components/ui/Button";
import Link from "next/link";

type KanbanItemProps = {
  backgroundColor: string;
  numberOfPeople: string;
  date: string;
  title: string;
};

function KanbanItem({
  backgroundColor,
  numberOfPeople,
  date,
  title,
}: KanbanItemProps) {
  return (
    <div className={`${backgroundColor} flex flex-col gap-2 rounded-lg p-3`}>
      <div className="flex items-center justify-between">
        <p>{numberOfPeople} people</p>

        <p>{date}</p>
      </div>

      <div className="text-lg">{title}</div>
    </div>
  );
}

const Dashboard: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-auto flex w-11/12 flex-col gap-10 py-10 lg:gap-20 lg:pt-20">
        <div className="flex flex-col-reverse gap-12 lg:flex-row">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <p className="text-4xl font-bold">Take action!</p>
              <p className="text-lg leading-7">
                Unleash your administrative potential with our personalized
                admin page. Gain insights, take control, and optimize your tasks
                with ease. Experience efficiency and convenience in one
                platform. Elevate your administrative capabilities today.
              </p>
            </div>

            <div>
              <Button asChild size="lg">
                <Link href="/dashboard/create">Create event</Link>
              </Button>
            </div>
          </div>

          <Image
            priority
            src="/images/dashboard-welcome-image.png"
            width={600}
            height={400}
            alt="People working behind their computers at a hackathon."
            className="w-full rounded-lg"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <p className="text-lg font-bold">To Do</p>

            <div className="flex flex-col gap-4">
              <KanbanItem
                numberOfPeople="170"
                title="Online platform"
                date="17 March"
                backgroundColor="gradient-green"
              />
              <KanbanItem
                numberOfPeople="170"
                title="Online platform"
                date="17 March"
                backgroundColor="gradient-green"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-lg font-bold">In progress</p>

            <div className="flex flex-col gap-4">
              <KanbanItem
                numberOfPeople="170"
                title="Online platform"
                date="17 March"
                backgroundColor="gradient-purple"
              />
              <KanbanItem
                numberOfPeople="170"
                title="Online platform"
                date="17 March"
                backgroundColor="gradient-purple"
              />
              <KanbanItem
                numberOfPeople="170"
                title="Online platform"
                date="17 March"
                backgroundColor="gradient-purple"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-lg font-bold">Done</p>

            <div className="flex flex-col gap-4">
              <KanbanItem
                numberOfPeople="170"
                title="Online platform"
                date="17 March"
                backgroundColor="gradient-orange"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;
