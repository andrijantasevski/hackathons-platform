import Separator from "@/components/ui/Separator";
import Image from "next/image";
import Link from "next/link";
import { IconHome, IconCirclePlus, IconGraph, IconBackpack, IconMenu } from "@tabler/icons-react";
import { useRouter } from "next/router";
import * as Menubar from "@radix-ui/react-menubar";

type Props = {
  children: React.ReactNode;
};

type DashboardLinkProps = {
  href: string;
  children: React.ReactNode;
};

function DashboardLink({ href, children }: DashboardLinkProps) {
  const router = useRouter();

  return (
    <Link href={href} className={`flex w-full items-center gap-2 rounded-lg p-3 transition-colors hover:bg-primary-100 hover:text-white ${router.pathname === href ? "bg-primary text-white" : ""}`}>
      {children}
    </Link>
  );
}

export default function DashboardLayout({ children }: Props) {
  return (
    <main className="relative flex min-h-screen flex-col bg-cloud bg-repeat-round lg:flex-row">
      <nav className="mx-auto flex w-11/12 items-center justify-between rounded-lg bg-white p-4 pt-10 shadow-lg lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          {/* TODO  */}
          {/* ADD LOGO */}

          {/* <img src="/logo.svg" className="h-9 w-9" /> */}
          <span className="text-lg font-bold">Hackathon</span>
        </Link>

        <Menubar.Root>
          <Menubar.Menu>
            <Menubar.Trigger className="flex items-center justify-center">
              <IconMenu className="h-6 w-6" />
            </Menubar.Trigger>

            <Menubar.Content className="z-50 w-56 rounded-lg bg-white p-1 shadow-lg" align="end" side="bottom" sideOffset={4}>
              <Link href="/dashboard" className="hover:text-primary-400 flex w-full items-center p-2 transition-colors">
                <Menubar.Item className="inline-flex w-full items-center gap-2">
                  <IconHome className="h-4 w-4" />
                  Home
                </Menubar.Item>
              </Link>

              <Link href="/dashboard/create" className="hover:text-primary-400 flex w-full items-center p-2 transition-colors">
                <Menubar.Item className="inline-flex w-full items-center gap-2">
                  <IconGraph className="h-4 w-4" />
                  Create
                </Menubar.Item>
              </Link>

              <Link href="/dashboard/academy" className="hover:text-primary-400 flex w-full items-center p-2 transition-colors">
                <Menubar.Item className="inline-flex w-full items-center gap-2">
                  <IconBackpack className="h-4 w-4" />
                  Academy
                </Menubar.Item>
              </Link>

              <Link href="/dashboard/tracking" className="hover:text-primary-400 flex w-full items-center p-2 transition-colors">
                <Menubar.Item className="inline-flex w-full items-center gap-2">
                  <IconGraph className="h-4 w-4" />
                  Tracking
                </Menubar.Item>
              </Link>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar.Root>
      </nav>

      <aside className="sticky top-0 hidden h-screen w-80 shrink-0 flex-col items-center gap-6 bg-white px-6 py-10 shadow-xl lg:flex 2xl:w-96">
        <div className="flex w-full items-center gap-6">
          <Image priority src="/images/user-image.png" width={70} height={70} alt="user image" />
          <p className="text-lg font-bold">Andrijan Tasevski</p>
        </div>

        <Separator />

        <div className="flex w-full flex-col gap-2">
          <DashboardLink href="/dashboard">
            <IconHome />
            Home
          </DashboardLink>

          <DashboardLink href="/dashboard/create">
            <IconCirclePlus />
            Create
          </DashboardLink>

          <DashboardLink href="/dashboard/academy">
            <IconBackpack />
            Academy
          </DashboardLink>

          <DashboardLink href="/dashboard/tracking">
            <IconGraph />
            Tracking
          </DashboardLink>
        </div>
      </aside>

      <section className="w-full">{children}</section>
    </main>
  );
}
