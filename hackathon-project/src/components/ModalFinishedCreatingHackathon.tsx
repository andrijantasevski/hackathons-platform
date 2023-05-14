import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
import { IconX, IconCircleCheck, IconLink } from "@tabler/icons-react";
import { toast } from "react-hot-toast";

type Props = {
  isModalShown: boolean;
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModalFinishedCreatingHackathon({ isModalShown, setIsModalShown }: Props) {
  let closeButtonRef = useRef(null);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  function closeModal() {
    setIsModalShown(false);
  }

  function openModal() {
    setIsModalShown(true);
  }

  function copyLink() {
    navigator.clipboard.writeText("https://hackathonlink.com/event/afasfafsaf");
    toast.success("Link copied!");
    setIsLinkCopied(true);
  }

  useEffect(() => {
    if (isLinkCopied) {
      setTimeout(() => setIsLinkCopied(false), 2000);
    }
  }, [isLinkCopied]);

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

                  <div className="mb-4 flex flex-col gap-4">
                    <div className="flex justify-center">
                      <IconCircleCheck className="h-20 w-20 text-primary" />
                    </div>

                    <Dialog.Title as="h3" className="text-center text-2xl font-bold leading-6 text-gray-900">
                      Hackathon created sucessfully!
                    </Dialog.Title>
                  </div>

                  <div className="flex justify-between gap-2 rounded-lg bg-white px-3 py-2 shadow-2xl">
                    <div className="flex items-center gap-2">
                      <IconLink />

                      <p>https://hackathonlink.com/event/afasfafsaf</p>
                    </div>

                    <Button onClick={copyLink}>{isLinkCopied ? "Copied" : "Copy"}</Button>
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
