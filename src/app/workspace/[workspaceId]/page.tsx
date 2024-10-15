"use client";
import { useCurrentWorkspaces } from "@/app/api/hooks/use-current-workspace";
import { useWorkspaceId } from "@/hooks/use-params";

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useCurrentWorkspaces({ id: workspaceId });

  return (
    <div className=" ">
      <div className=" ">
        data :{JSON.stringify(data)}
        <div>id:{workspaceId}</div>
      </div>
    </div>
  );
};

export default WorkspaceIdPage;
