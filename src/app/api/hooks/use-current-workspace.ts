import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface useCurrentWorkspacesPorps {
  id: Id<"workspaces">;
}

export const useCurrentWorkspaces = ({ id }: useCurrentWorkspacesPorps) => {
  const data = useQuery(api.workspaces.GetbyId, { id });
  const isLoading = data === undefined;

  return { data, isLoading };
};
