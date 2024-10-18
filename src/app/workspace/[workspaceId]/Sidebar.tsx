import { UserButton } from "@/app/features/auth/components/user-Button";
import { WorKspaceSwitcher } from "./WorkspaceSwitcher";

import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react";

export const Sidebar = () => {
  return (
    <aside className="w-[70px] h-full bg-[#c610c9] flex  flex-col gap-y-p4 items-center pt-[9px] pb-4 ">
      <WorKspaceSwitcher />
      <div className="space-y-2 mt-3">
        <Home className="size-7 text-white hover:text-black cursor-pointer " />
        <Bell className="size-7 text-white hover:text-black cursor-pointer " />
        <MessageSquare className="size-7 text-white hover:text-black cursor-pointer " />
        <MoreHorizontal className="size-7 text-white hover:text-black cursor-pointer " />
      </div>
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};
