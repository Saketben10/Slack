import { useMutation } from "convex/react";

import { useCallback, useMemo, useState } from "react";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";

type RequestType = { channelId: Id<"channels"> };
type ResponseType = Id<"channels">;

type options = {
  onSuccess?: (Id?: ResponseType) => void;
  onError?: () => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useDeleteChannel = () => {
  const [updatadData, setupdatedData] = useState<ResponseType>();
  const [status, setStatus] = useState<"pending" | "error" | "settled">();

  const isPending = useMemo(() => status === "pending", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);

  const deletion = useMutation(api.channel.Remove);

  const remove = useCallback(
    async (value: RequestType, options?: options) => {
      try {
        setStatus("pending");
        const response = await deletion(value);

        options?.onSuccess?.(value?.channelId);
        setupdatedData(response);
      } catch {
        options?.onError?.();
        if (options?.throwError) {
          throw Error;
        }
        setStatus("error");
      } finally {
        setStatus("settled");
        options?.onSettled?.();
      }
    },
    [deletion]
  );

  return { updatadData, remove, isError, isPending, isSettled };
};
