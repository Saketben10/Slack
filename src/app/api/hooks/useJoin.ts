import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

interface RequestType {
  id: Id<"workspaces">;
  joincode: string;
}
type ResponseType = Id<"workspaces">;

type options = {
  onSuccess?: (Id?: ResponseType) => void;
  onError?: () => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useJoin = () => {
  const [updatadData, setupdatedData] = useState<ResponseType>();
  const [status, setStatus] = useState<"pending" | "error" | "settled">();

  const isPending = useMemo(() => status === "pending", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);

  const join = useMutation(api.workspaces.join);

  const mutate = useCallback(
    async (value: RequestType, options?: options) => {
      try {
        setStatus("pending");
        const response = await join(value);

        options?.onSuccess?.(value?.id);
        setupdatedData(response);
      } catch (err) {
        options?.onError?.();
        console.log("use join error", err);
        if (options?.throwError) {
          throw Error;
        }
        setStatus("error");
      } finally {
        setStatus("settled");
        options?.onSettled?.();
      }
    },
    [join]
  );

  return { updatadData, mutate, isError, isPending, isSettled };
};
