import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { CogIcon, IdentificationIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function ProfileDropDown() {
  const { data: session } = useSession();

  return (
    <Menu>
      <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700">
        {session ? session.user?.name || "User" : "Guest"}
        <ChevronDownIcon className="size-4 fill-white/60" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
      >
        <MenuItem>
          <Link
            href={"/profile"}
            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
          >
            <IdentificationIcon className="size-4 fill-white/30" />
            Profile
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
              ⌘E
            </kbd>
          </Link>
        </MenuItem>
        <div className="my-1 h-px bg-white/5" />
        <MenuItem>
          <Link
            href={"/profile/settings"}
            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
          >
            <CogIcon className="size-4 fill-white/30" />
            Settings
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
              ⌘D
            </kbd>
          </Link>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
