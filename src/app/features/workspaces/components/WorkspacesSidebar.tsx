import { useWorkspaceId } from "@/hooks/use-params";
import { useCurrentMember } from "../../members/api/hooks/use-current-member";

import { useCurrentWorkspaces } from "@/app/api/hooks/use-current-workspace";
import { AlertTriangle, Loader } from "lucide-react";
import { WorkSpaceHeader } from "./WorkSpaceHeader";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const { data: member, isLoading: memberisLoading } = useCurrentMember({
    workspaceId,
  });

  const { data: currentworkspace, isLoading: workspaceisLoading } =
    useCurrentWorkspaces({ id: workspaceId });

  if (workspaceisLoading || memberisLoading) {
    return (
      <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!currentworkspace || !member) {
    return (
      <div className="flex flex-col  gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-white text-sm">workspaces not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#5E2C5F]">
      <WorkSpaceHeader
        workspace={currentworkspace}
        isAdmin={member?.role === "admin"}
      />
    </div>
  );
};
