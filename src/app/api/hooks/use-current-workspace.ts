import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface useGetWorkspacesPorps {
  id: Id<"workspaces">;
}

export const useCurrentWorkspaces = ({ id }: useGetWorkspacesPorps) => {
  const data = useQuery(api.workspaces.GetbyId, { id });
  const isLoading = data === undefined;

  return { data, isLoading };
};
