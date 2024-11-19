import { UserButton } from "@/app/features/auth/components/user-Button";
import { WorKspaceSwitcher } from "./WorkspaceSwitcher";

import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react";

import { IconButton } from "@/app/components/IconButton";

export const Sidebar = () => {
  return (
    <aside className="w-[70px] h-full bg-[#c610c9] flex  flex-col gap-y-4 p-4 items-center pt-[9px] pb-4 ">
      <WorKspaceSwitcher />
      <div className="space-y-2 mt-3">
        <IconButton
          className="hover:bg-transparent hover:text-white"
          size={"iconsm"}
          Variant="outline"
          Icon={Home}
        />

        <IconButton
          className="hover:bg-transparent hover:text-white"
          size={"iconsm"}
          Variant="outline"
          Icon={Bell}
        />

        <IconButton
          className="hover:bg-transparent hover:text-white"
          size={"iconsm"}
          Variant="outline"
          Icon={MessageSquare}
        />

        <IconButton
          className="hover:bg-transparent hover:text-white"
          size={"iconsm"}
          Variant="outline"
          Icon={MoreHorizontal}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};
