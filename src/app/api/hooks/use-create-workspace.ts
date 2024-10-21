import { useCallback, useMemo, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import Error from "next/error";

type RequestType = { name: string };
type ResponseType = Id<"workspaces">;

type Options = {
  onSuccess?: (Id: ResponseType) => void;
  onError?: () => void;
  onSettled?: () => void;
  thowError?: boolean;
};

export const useCreateWorkSpace = () => {
  const [data, setData] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const [status, setStatus] = useState<"pending" | "settled" | "error" | null>(
    null
  );

  const isPending = useMemo(() => status === "pending", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);

  const mutation = useMutation(api.workspaces.Create);
  const mutate = useCallback(
    async (values: RequestType, options?: Options) => {
      try {
        setStatus("pending");
        const response = await mutation(values);
        const Response = response.workspaceID;

        options?.onSuccess?.(Response);
        setData(Response);
        return response;
      } catch {
        options?.onError?.();
        if (options?.thowError) {
          throw Error;
        }

        setError(true);
        setStatus("error");
      } finally {
        options?.onSettled?.();
        setStatus("settled");
      }
    },
    [mutation]
  );
  return { mutate, data, isPending, isError, isSettled, error };
};
