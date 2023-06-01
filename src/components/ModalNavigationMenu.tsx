import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { IconX } from "@tabler/icons-react";
import { useRouter } from "next/router";

interface Props {
  isSlideInMenuOpen: boolean;
  closeSlideInMenu: () => void;
}

interface NavbarSlideInMenuItemProps {
  children: React.ReactNode;
  href: string;
  closeSlideInMenu: () => void;
}

const NavbarSlideInMenuItem = ({ children, href, closeSlideInMenu }: NavbarSlideInMenuItemProps) => {
  const router = useRouter();

  return (
    <li>
      <Link onClick={closeSlideInMenu} className={`flex items-center gap-2 px-6 py-2 transition-colors ${href === router.pathname ? "bg-primary text-white" : ""}`} href={href}>
        {children}
      </Link>
    </li>
  );
};

const ModalNavigationMenu = ({ isSlideInMenuOpen, closeSlideInMenu }: Props) => {
  return (
    <Transition.Root appear show={isSlideInMenuOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={closeSlideInMenu}>
        <Transition.Child as={Fragment} enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/30 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-500" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-500" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="relative flex h-full flex-col gap-4 overflow-y-auto bg-gray-100 pt-4 shadow-xl lg:pt-6">
                    <div className="flex justify-end px-4 lg:px-6">
                      <button onClick={closeSlideInMenu} title="Close menu" aria-label="Close menu">
                        <span className="sr-only">Затвори мени</span>
                        <IconX className="h-6 w-6" />
                      </button>
                    </div>

                    <ul className="grid grid-cols-1">
                      <NavbarSlideInMenuItem closeSlideInMenu={closeSlideInMenu} href="/dashboard">
                        Home
                      </NavbarSlideInMenuItem>

                      <NavbarSlideInMenuItem closeSlideInMenu={closeSlideInMenu} href="/dashboard/create">
                        Create
                      </NavbarSlideInMenuItem>

                      <NavbarSlideInMenuItem closeSlideInMenu={closeSlideInMenu} href="/dashboard/academy">
                        Academy
                      </NavbarSlideInMenuItem>

                      <NavbarSlideInMenuItem closeSlideInMenu={closeSlideInMenu} href="/dashboard/tracking">
                        Tracking
                      </NavbarSlideInMenuItem>
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalNavigationMenu;
