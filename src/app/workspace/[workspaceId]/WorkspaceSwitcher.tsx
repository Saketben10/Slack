import { useCurrentWorkspaces } from "@/app/api/hooks/use-current-workspace";
import { useGetWorkspaces } from "@/app/api/hooks/use-get-workspaces";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  //   DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkspaceId } from "@/hooks/use-worksapceid";
import { setOpen } from "@/reducers/render";

import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export const WorKspaceSwitcher = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces();
  const { data: workspace, isLoading: workspaceLoading } = useCurrentWorkspaces(
    { id: workspaceId }
  );
  const filterWorkspaces = workspaces?.filter(
    (workspc) => workspc._id !== workspace?._id
  );

  const dispatch = useDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-9 relative overflow-hidden bh-[#ABABAD]  hover:[#ABABAD]/79 text-slate-100 font-semibold text-xl  ">
          {workspaceLoading ? (
            <Loader className="size-4 animate-spin shrink-0 " />
          ) : (
            workspace?.name.charAt(0).toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuItem
          className="cursor-pointer flex justify-around gap-x-2 capitalize"
          onClick={() => router.push(`/workspace/${workspaceId}`)}
        >
          <span className="font-bold font-mono ">
            {workspacesLoading ? "Loading..." : workspace?.name}
          </span>
          <span className="text-xs text-green-400">Active Workspaces</span>
        </DropdownMenuItem>
        {filterWorkspaces?.map((workspace) => (
          <DropdownMenuItem
            key={workspace._id}
            className="cursor-pointer capitalize"
            onClick={() => router.push(`/workspace/${workspace._id}`)}
          >
            <div className="size-9 relative overflow-hidden bg-[#fbff03] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
              {workspace.name.charAt(0).toUpperCase()}
            </div>
            {workspace?.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          className="cursor-pointer "
          onClick={() => dispatch(setOpen(true))}
        >
          <div className="size-9 relative overflow-hidden bg-[#f2f2f2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2 ">
            <Plus />
          </div>
          Create a new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
