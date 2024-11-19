import { useWorkspaceId } from "@/hooks/use-worksapceid";
import { useCurrentMember } from "../../members/api/hooks/use-current-member";
import { useCurrentWorkspaces } from "@/app/api/hooks/use-current-workspace";
import { useCurrentChannels } from "../../channels/api/hooks/use-get-channels";
import { useGetMembers } from "../../members/api/hooks/use-get-member";

import {
  AlertTriangle,
  HashIcon,
  MessageSquareText,
  SendHorizontal,
} from "lucide-react";

import { Triangle } from "react-loader-spinner";
import { SidebarItem } from "@/app/workspace/[workspaceId]/SidebarItem";
import { UserItem } from "@/app/workspace/[workspaceId]/UserItem";

import { WorkSpaceHeader } from "./WorkSpaceHeader";
import { WorkSpaceSection } from "./WolrkSpaceSection";
import { channelToggle } from "../../../../reducers/render";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/render";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const { data: channels, isLoading: channelisLoading } = useCurrentChannels({
    workspaceId,
  });

  const { data: currentmember, isLoading: memberisLoading } = useCurrentMember({
    workspaceId,
  });

  const { data: members } = useGetMembers({
    workspaceId,
  });

  const { data: currentworkspace, isLoading: workspaceisLoading } =
    useCurrentWorkspaces({ id: workspaceId });

  const dispatch = useDispatch<AppDispatch>();

  if (workspaceisLoading || memberisLoading) {
    return (
      <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
        <Triangle
          visible={true}
          height="80"
          width="80"
          color="#9b59b6"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (!currentworkspace || !currentmember) {
    return (
      <div className="flex flex-col  gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-white text-sm">workspaces not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col bg-[#5E2C5F]">
        <WorkSpaceHeader
          workspace={currentworkspace}
          isAdmin={currentmember?.role === "admin"}
        />
        <div className="flex flex-col px-2 mt-3 space-y-2 ">
          <SidebarItem
            Icon={MessageSquareText}
            label={"Threads"}
            channeId="threads"
            variant={"default"}
          />
          <SidebarItem
            Icon={SendHorizontal}
            label={"Draft and Sent"}
            channeId="drafts"
            variant={"default"}
          />
        </div>

        <WorkSpaceSection
          hint="New Channel"
          label="channels"
          onNew={
            currentmember.role === "admin"
              ? () => dispatch(channelToggle(true))
              : undefined
          }
        >
          {channels?.map((item) => (
            <div key={item._id} className="mt-1">
              <SidebarItem
                Icon={HashIcon}
                label={
                  !channelisLoading ? item.name : "Loading channel name...."
                }
                channeId={item._id}
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
    </>
  );
};
