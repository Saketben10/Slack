import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Doc } from "../../../../../convex/_generated/dataModel";
import { ChevronDown, ListFilter, SquarePen } from "lucide-react";
import { Hint } from "@/components/ui/hint";
import { PreferencesModal } from "@/app/workspace/[workspaceId]/Preferences-modal";
import { useState } from "react";
import { InviteModal } from "@/app/workspace/[workspaceId]/Invite-modal";

interface workspaceHeaderProps {
  workspace: Doc<"workspaces"> | null | undefined;
  isAdmin: boolean;
}

export const WorkSpaceHeader = ({
  workspace,
  isAdmin,
}: workspaceHeaderProps) => {
  const [Preferencesopen, setPreferencesOpen] = useState(false);
  const [inviteopen, setInviteopen] = useState(false);
  return (
    <>
      <InviteModal open={inviteopen} setOpen={setInviteopen} />
      <PreferencesModal
        initialValue={workspace?.name}
        open={Preferencesopen}
        setOpen={setPreferencesOpen}
        id={workspace?._id}
      />
      <div className="flex items-center justify-between px-4 h-[49px] gap-0.5   ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="font-semibold text-lg w-auto p-1.5 overflow-hidden  "
              variant={"app"}
            >
              <span className="truncate  ">{workspace?.name}</span>
              <ChevronDown className="size-4 ml-1 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start" className="w-64">
            <DropdownMenuItem className="cursor-pointer capitalize">
              <div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl  rounded-md flex items-center justify-center mr-2">
                {workspace?.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col items-start">
                <p className="font-bold">{workspace?.name}</p>
                <p className="text-green-400">Active Workspace</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {isAdmin && (
              <>
                <DropdownMenuItem
                  className="cursor-pointer py-2  "
                  onClick={() => setInviteopen(true)}
                >
                  Invite people to {workspace?.name}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer py-2  "
                  onClick={() => setPreferencesOpen(true)}
                >
                  Prefrences
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-1">
          <Hint side="bottom" label="Filter conversations">
            <Button variant="app" size={"iconsm"} className=" bg-transparent  ">
              <ListFilter className="size-6" />
            </Button>
          </Hint>
          <Hint label="New Message" side="bottom">
            <Button variant="app" size={"iconsm"} className=" bg-transparent  ">
              <SquarePen className="size-6" />
            </Button>
          </Hint>
        </div>
      </div>
    </>
  );
};
