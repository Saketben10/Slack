import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";

type RequestType = { name: string; workspaceId: Id<"workspaces"> };
type ResponseType = Id<"channels"> | null;

interface Options {
  onSuccess?: (channelid: string) => void;
  onError?: () => void;
  onSetttled?: () => void;
  thowError?: boolean;
}

export const useCreateChannel = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<boolean>(false);
  const [status, setStatus] = useState<"settled" | "pending" | "error" | null>(
    null
  );

  const isLoading = useMemo(() => status === "pending", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);

  const mutate = useMutation(api.channel.create);
  const create = useCallback(
    async ({ name, workspaceId }: RequestType, options?: Options) => {
      try {
        setStatus("pending");
        const response = await mutate({ name, workspaceId });
        const channelId = response.channelid;
        options?.onSuccess?.(channelId);
        setData(channelId);
      } catch {
        options?.onError?.();
        if (options?.thowError) {
          throw Error;
        }
        setStatus("error");
        setError(true);
      } finally {
        setStatus("settled");
        options?.onSetttled?.();
      }
    },
    [mutate]
  );

  return { create, isLoading, isError, isSettled, error, data };
};
