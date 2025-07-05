import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
  sessionCode: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setSessionCode: (sessionCode: string) => void;
}

export default function SessionCreatedModal({
  sessionCode,
  isOpen,
  setIsOpen,
  setSessionCode,
}: Props) {
  const router = useRouter();
  const startSession = () => {
    setIsOpen(false);
    router.push(`/Session/${sessionCode}`);
    setSessionCode("");
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => {}}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
              New Game Started
            </DialogTitle>
            <p className="mt-2 text-sm/6 text-white/50">
              Please share the session code with your friends to join the game.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <input
                type="text"
                value={sessionCode}
                readOnly
                className="w-full px-3 py-2 rounded bg-white text-black border border-gray-600 font-mono text-lg"
                style={{ minWidth: "120px" }}
              />

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(sessionCode);
                  toast.success("Code copied!", {
                    position: "bottom-right",
                  });
                }}
                className="p-1 rounded border border-gray-400 hover:border-white transition"
              >
                <DocumentDuplicateIcon className="boarder-2 size-8 fill-white/60 cursor-pointer hover:fill-white transition" />
              </button>
            </div>
            <div className="mt-4">
              <button
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                onClick={startSession}
              >
                Got it, thanks!
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
