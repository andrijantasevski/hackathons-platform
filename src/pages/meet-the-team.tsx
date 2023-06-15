import {
  IconBrandDribbble,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import Link from "next/link";
import teamMembers from "../../data/team-members.json";
import Head from "next/head";

export default function MeetTheTeam() {
  return (
    <>
      <Head>
        <title>Meet the team</title>
      </Head>

      <main className="min-h-screen bg-cloud bg-cover py-20">
        <div className="mx-auto flex w-11/12 max-w-screen-xl flex-col gap-8">
          <section className="flex flex-col gap-8">
            <h1 className="text-4xl font-bold lg:text-5xl">Meet the team</h1>

            <p className="text-lg lg:text-xl">
              Welcome to our Hackathon Platform Team! We{"'"}re thrilled to have
              you on board as we embark on an exciting journey to revolutionize
              the world of innovation and collaboration. Our mission is to
              create a cutting-edge platform that empowers teams to unleash
              their creativity, problem-solving skills, and passion for
              technology.
            </p>
          </section>

          <section className="flex flex-col gap-12">
            {teamMembers.map((academy) => (
              <div key={academy.id} className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold lg:text-3xl">
                  {academy.academy}
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {academy.team_members.map((teamMember) => (
                    <div
                      key={teamMember.id}
                      className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-6 shadow-lg"
                    >
                      <div className="h-20 w-20 rounded-full bg-primary"></div>

                      <div className="text-center">
                        <p className="text-xl font-bold">
                          {teamMember.first_name} {teamMember.last_name}
                        </p>
                        <p className="text-lg text-neutral-400">
                          {teamMember.title}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Link href="/" title="Open Instagram">
                          <IconBrandInstagram className="h-7 w-7" />
                        </Link>

                        <Link href="/" title="Open Dribble">
                          <IconBrandDribbble className="h-7 w-7" />
                        </Link>

                        <Link href="/" title="Open Dribble">
                          <IconBrandLinkedin className="h-7 w-7" />
                        </Link>

                        <Link href="/" title="Open Dribble">
                          <IconBrandGithub className="h-7 w-7" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
