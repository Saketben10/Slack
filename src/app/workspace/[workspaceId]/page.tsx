"use client";

import { useCurrentWorkspaces } from "@/app/api/hooks/use-current-workspace";
import { useCurrentChannels } from "@/app/features/channels/api/hooks/use-get-channels";
import { useWorkspaceId } from "@/hooks/use-worksapceid";
import { channelToggle } from "@/reducers/render";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/store/render";
import { Triangle } from "react-loader-spinner";
import { AlertTriangle } from "lucide-react";
import { useCurrentMember } from "@/app/features/members/api/hooks/use-current-member";

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();
  const { data: channels, isLoading: channelIsLoading } = useCurrentChannels({
    workspaceId,
  });
  const { data: workspaces, isLoading: workspaceIsLoading } =
    useCurrentWorkspaces({ id: workspaceId });

  const { data: currentMember, isLoading: memberisLoading } = useCurrentMember({
    workspaceId,
  });
  const channeId = useMemo(() => channels?.[0]?._id, [channels]);

  const dispatch = useDispatch<AppDispatch>();
  const channelState = useSelector((state: RootState) => state.render.channel);
  const router = useRouter();

  useEffect(() => {
    if (
      workspaceIsLoading ||
      channelIsLoading ||
      !workspaces ||
      memberisLoading ||
      !currentMember
    ) {
      return;
    }

    if (channeId) {
      router.push(`/workspace/${workspaceId}/channel/${channeId}`);
    } else if (currentMember?.role === "member") {
      return;
    } else if (!channelState) {
      dispatch(channelToggle(true));
    }
  }, [
    dispatch,
    workspaceIsLoading,
    channelIsLoading,
    workspaces,
    router,
    channeId,
    workspaceId,
    channelState,
    currentMember,
    memberisLoading,
  ]);

  return workspaceIsLoading || channelIsLoading || memberisLoading ? (
    <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#9b59b6"
        ariaLabel="triangle-loading"
      />
    </div>
  ) : !workspaces || !currentMember ? (
    <div>
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <AlertTriangle className="size-4 animate-spin text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Workspace not found
        </span>
      </div>
    </div>
  ) : null;
};

export default WorkspaceIdPage;
