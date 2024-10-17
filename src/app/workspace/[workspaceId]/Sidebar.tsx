import { UserButton } from "@/app/features/auth/components/user-Button";
import { WorKspaceSwitcher } from "./WorkspaceSwitcher";

export const Sidebar = () => {
  return (
    <aside className="w-[70px] h-full bg-[#c610c9] flex  flex-col gap-y-p4 items-center pt-[9px] pb-4 ">
      <WorKspaceSwitcher />

      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};
