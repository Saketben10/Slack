import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";

interface useCurrenChannelProps {
  workspaceId: Id<"workspaces">;
}
export const useCurrentChannels = ({ workspaceId }: useCurrenChannelProps) => {
  const data = useQuery(api.channel.get, { workspaceId });

  const isLoading = data === undefined;

  return { data, isLoading };
};
