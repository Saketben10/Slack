import { useQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";

export const UseCurrentUser = () => {
  const data = useQuery(api.users.current);
  const isloading = data === undefined;

  return { data, isloading };
};
