import { type ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import DashboardLayout from "@/layouts/DashboardLayout";
import Image from "next/image";
import Head from "next/head";
import Button from "@/components/ui/Button";
import Link from "next/link";
import useGetHackathons from "@/utils/useGetHackathons";
import KanbanItem, {
  KanbanItemLoadingSkeleton,
} from "@/components/common/KanbanItem";

const Dashboard: NextPageWithLayout = () => {
  const { data: hackathons, status } = useGetHackathons();

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-auto flex w-11/12 flex-col gap-10 py-10 lg:gap-20 lg:pt-20">
        <div className="flex flex-col-reverse gap-12 lg:flex-row">
          <div className="flex flex-col gap-10 lg:w-6/12">
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

          <div className="lg:w-6/12">
            <Image
              priority
              src="/images/dashboard-welcome-image.png"
              width={600}
              height={400}
              alt="People working behind their computers at a hackathon."
              className="w-full rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <p className="text-lg font-bold">To Do</p>

            <div className="flex flex-col gap-4">
              {status === "loading" &&
                [...Array(3)].map((_, i) => (
                  <KanbanItemLoadingSkeleton variant="to-do" key={i} />
                ))}

              {hackathons &&
                hackathons[0].event_data.map((kanbanItem) => (
                  <KanbanItem
                    key={kanbanItem.id}
                    kanbanItem={kanbanItem}
                    variant={hackathons[0].status}
                  />
                ))}

              {hackathons && hackathons[0].event_data.length === 0 && (
                <div>No drafted hackathons.</div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-lg font-bold">In progress</p>

            <div className="flex flex-col gap-4">
              {status === "loading" &&
                [...Array(3)].map((_, i) => (
                  <KanbanItemLoadingSkeleton variant="in-progress" key={i} />
                ))}

              {hackathons &&
                hackathons[1].event_data.map((kanbanItem) => (
                  <KanbanItem
                    key={kanbanItem.id}
                    kanbanItem={kanbanItem}
                    variant={hackathons[1].status}
                  />
                ))}

              {hackathons && hackathons[1].event_data.length === 0 && (
                <div>No hackathons in progress.</div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-lg font-bold">Done</p>

            <div className="flex flex-col gap-4">
              {status === "loading" &&
                [...Array(3)].map((_, i) => (
                  <KanbanItemLoadingSkeleton variant="done" key={i} />
                ))}

              {hackathons &&
                hackathons[2].event_data.map((kanbanItem) => (
                  <KanbanItem
                    key={kanbanItem.id}
                    kanbanItem={kanbanItem}
                    variant={hackathons[2].status}
                  />
                ))}

              {hackathons && hackathons[2].event_data.length === 0 && (
                <div>No finished hackathons.</div>
              )}
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
