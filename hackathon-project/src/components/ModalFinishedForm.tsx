import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import Button from "./ui/Button";
import { IconX, IconDownload } from "@tabler/icons-react";

type Props = {
  isModalShown: boolean;
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModalFinishedForm({ isModalShown, setIsModalShown }: Props) {
  let closeButtonRef = useRef(null);

  function closeModal() {
    setIsModalShown(false);
  }

  function openModal() {
    setIsModalShown(true);
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button type="button" onClick={openModal} className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          Open dialog
        </button>
      </div>

      <Transition appear show={isModalShown} as={Fragment}>
        <Dialog initialFocus={closeButtonRef} as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="flex w-full max-w-2xl transform flex-col gap-4 rounded-lg bg-white p-6 text-left shadow-xl transition-all">
                  <div className="flex justify-end">
                    <button ref={closeButtonRef} onClick={closeModal} title="Close" aria-label="Close">
                      <IconX className="h-7 w-7 text-gray-950 transition-colors hover:text-gray-500" />
                    </button>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Dialog.Title as="h3" className="text-center text-2xl font-bold leading-6 text-gray-900">
                      You have registered successfully for the hackathon!
                    </Dialog.Title>

                    <p className="text-center text-lg font-medium">Please check your email!</p>
                  </div>

                  <div className="flex justify-center">
                    <Button onClick={closeModal} size="lg">
                      Confirm
                    </Button>
                  </div>

                  <div className="flex justify-center">
                    <Button size="lg">
                      <div className="flex items-center gap-1">
                        Download
                        <IconDownload className="h-4 w-4" />
                      </div>
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
