import { useQuery } from "convex/react";

import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";

interface useCurrentMemberProps {
  workspaceId: Id<"workspaces">;
}

export const useCurrentMember = ({
  workspaceId: workspaceId,
}: useCurrentMemberProps) => {
  const data = useQuery(api.member.Current, { workspaceId: workspaceId });
  const isLoading = data === undefined;

  return { data, isLoading };
};
