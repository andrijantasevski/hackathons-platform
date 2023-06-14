import Image from "next/image";
import Link from "next/link";
import {
  IconHome,
  IconCirclePlus,
  IconGraph,
  IconBackpack,
  IconMenu,
  IconDoorExit,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import ModalNavigationMenu from "@/components/ModalNavigationMenu";
import { useEffect, useState } from "react";
import { useUserContext } from "@/utils/userContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Separator } from "@/components/ui/Separator";
import { Slot } from "@radix-ui/react-slot";
import { twMerge } from "tailwind-merge";

// ${
//   router.pathname === href ? "bg-primary text-white" : ""
// }

interface DashboardSidebarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

function DashboardSidebarButton({
  asChild,
  className,
  ...props
}: DashboardSidebarButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={twMerge(
        "flex w-full items-center gap-2 rounded-lg p-3 transition-colors hover:bg-primary-100 hover:text-white",
        className
      )}
      {...props}
    />
  );
}

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();

  const [isSlideInMenuOpen, setIsSlideInMenuOpen] = useState(false);

  const openSlideInMenu = () => setIsSlideInMenuOpen(true);
  const closeSlideInMenu = () => setIsSlideInMenuOpen(false);

  const { user, isLoading } = useUserContext();

  useEffect(() => {
    if (!user.isLoggedIn && !isLoading) {
      router.push("/");
    }
  }, [isLoading, user]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <>
      {!isLoading && user.isLoggedIn && (
        <main className="relative flex min-h-screen flex-col bg-cloud bg-repeat-round pt-6 lg:flex-row lg:pt-0">
          <nav className="mx-auto flex w-11/12 items-center justify-between rounded-lg bg-white p-4 shadow-lg lg:hidden">
            <Link href="/dashboard" className="flex items-center gap-2">
              {/* TODO  */}
              {/* ADD LOGO */}

              {/* <img src="/logo.svg" className="h-9 w-9" /> */}
              <span className="text-lg font-bold">Hackathon</span>
            </Link>

            <button onClick={openSlideInMenu}>
              <IconMenu className="h-6 w-6" />
            </button>
          </nav>

          <aside className="sticky top-0 hidden h-screen w-80 shrink-0 flex-col items-center gap-6 bg-white px-6 py-10 shadow-xl lg:flex 2xl:w-96">
            <div className="flex w-full items-center gap-6">
              <Image
                priority
                src="/images/user-image.png"
                width={70}
                height={70}
                alt="user image"
              />
              <p className="text-lg font-bold">Andrijan Tasevski</p>
            </div>

            <Separator />

            <div className="flex h-full w-full flex-col justify-between">
              <div className="flex w-full flex-col gap-2">
                <DashboardSidebarButton
                  asChild
                  className={
                    router.pathname === "/dashboard"
                      ? "bg-primary text-white"
                      : ""
                  }
                >
                  <Link href="/dashboard">
                    <IconHome />
                    Home
                  </Link>
                </DashboardSidebarButton>

                <DashboardSidebarButton
                  asChild
                  className={
                    router.pathname === "/dashboard/create"
                      ? "bg-primary text-white"
                      : ""
                  }
                >
                  <Link href="/dashboard/create">
                    <IconCirclePlus />
                    Create
                  </Link>
                </DashboardSidebarButton>

                <DashboardSidebarButton
                  asChild
                  className={
                    router.pathname === "/dashboard/academy"
                      ? "bg-primary text-white"
                      : ""
                  }
                >
                  <Link href="/dashboard/academy">
                    <IconBackpack />
                    Academy
                  </Link>
                </DashboardSidebarButton>

                <DashboardSidebarButton
                  asChild
                  className={
                    router.pathname === "/dashboard/tracking"
                      ? "bg-primary text-white"
                      : ""
                  }
                >
                  <Link href="/dashboard/tracking">
                    <IconGraph />
                    Tracking
                  </Link>
                </DashboardSidebarButton>
              </div>

              <div>
                <DashboardSidebarButton>
                  <IconDoorExit />
                  Log out
                </DashboardSidebarButton>
              </div>
            </div>
          </aside>

          <section className="w-full">{children}</section>

          {isSlideInMenuOpen && (
            <ModalNavigationMenu
              isSlideInMenuOpen={isSlideInMenuOpen}
              closeSlideInMenu={closeSlideInMenu}
            />
          )}
        </main>
      )}
    </>
  );
}
