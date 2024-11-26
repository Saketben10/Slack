import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";

interface useGetChannelProps {
  channelId: Id<"channels">;
}
export const useGetChannel = ({ channelId }: useGetChannelProps) => {
  const data = useQuery(api.channel.getById, { channelId });

  const isLoading = data === undefined;

  return { data, isLoading };
};
