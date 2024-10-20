import { UserButton } from "@/app/features/auth/components/user-Button";
import { WorKspaceSwitcher } from "./WorkspaceSwitcher";

import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Sidebar = () => {
  return (
    <aside className="w-[70px] h-full bg-[#c610c9] flex  flex-col gap-y-4 p-4 items-center pt-[9px] pb-4 ">
      <WorKspaceSwitcher />
      <div className="space-y-2 mt-3">
        <Button
          variant="outline"
          size={"iconsm"}
          className="hover:bg-transparent hover:text-white"
        >
          <Home className="size-7   hover:text-black cursor-pointer " />
        </Button>
        <Button
          variant="outline"
          size={"iconsm"}
          className="hover:bg-transparent hover:text-white"
        >
          <Bell className="size-7   hover:text-black cursor-pointer " />
        </Button>
        <Button
          variant="outline"
          size={"iconsm"}
          className="hover:bg-transparent hover:text-white"
        >
          <MessageSquare className="size-7  hover:text-black cursor-pointer " />
        </Button>
        <Button
          variant="outline"
          size={"iconsm"}
          className="hover:bg-transparent hover:text-white"
        >
          <MoreHorizontal className="size-7   hover:text-black cursor-pointer " />
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};
