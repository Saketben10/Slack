import { useQuery } from "convex/react";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../convex/_generated/api";

interface useGetMembersProps {
  workspaceId: Id<"workspaces">;
}
export const useGetMembers = ({ workspaceId }: useGetMembersProps) => {
  const data = useQuery(api.member.get, { workspaceId });

  const isLoading = data === undefined;
  return { data, isLoading };
};
