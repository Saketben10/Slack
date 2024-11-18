import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface useGetInfoPorps {
  id: Id<"workspaces">;
}

export const useNewGetInfo = ({ id }: useGetInfoPorps) => {
  const data = useQuery(api.newjoin.newGetInfo, { id });

  const isLoading = data === undefined || null;

  return { data, isLoading };
};
