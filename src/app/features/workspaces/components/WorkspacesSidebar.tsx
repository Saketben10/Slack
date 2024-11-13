import { useWorkspaceId } from "@/hooks/use-params";
import { useCurrentMember } from "../../members/api/hooks/use-current-member";
import { useCurrentWorkspaces } from "@/app/api/hooks/use-current-workspace";
import { useCurrentChannels } from "../../channels/api/hooks/use-get-channels";
import { useGetMembers } from "../../members/api/hooks/use-get-member";

import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizontal,
} from "lucide-react";

import { SidebarItem } from "@/app/workspace/[workspaceId]/SidebarItem";
import { UserItem } from "@/app/workspace/[workspaceId]/UserItem";

import { WorkSpaceHeader } from "./WorkSpaceHeader";
import { WorkSpaceSection } from "./WolrkSpaceSection";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const { data: channels, isLoading: channelisLoading } = useCurrentChannels({
    workspaceId,
  });

  const { data: member, isLoading: memberisLoading } = useCurrentMember({
    workspaceId,
  });

  const { data: members } = useGetMembers({
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

      <div className="flex flex-col px-2 mt-3 space-y-2 ">
        <SidebarItem
          Icon={MessageSquareText}
          label={"Threads"}
          id="threads"
          variant={"default"}
        />
        <SidebarItem
          Icon={SendHorizontal}
          label={"Draft and Sent"}
          id="drafts"
          variant={"default"}
        />
      </div>

      <WorkSpaceSection hint="New Channel" label="channels" onNew={() => {}}>
        {channels?.map((item) => (
          <div key={item._id}>
            <SidebarItem
              Icon={HashIcon}
              label={!channelisLoading ? item.name : "Loading channel name...."}
              id={item._id}
              variant={"default"}
            />
          </div>
        ))}
      </WorkSpaceSection>
      <WorkSpaceSection
        hint="New direct message"
        label="DirectMessage"
        onNew={() => {}}
      >
        {members?.map((item) => (
          <UserItem
            key={item._id}
            id={item._id}
            label={item.user.name}
            image={item.user.image}
          />
        ))}
      </WorkSpaceSection>
    </div>
  );
};
