import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = { name: string; id: Id<"workspaces"> };
type ResponseType = Id<"workspaces">;

type options = {
  onSuccess?: (Id: ResponseType) => void;
  onError?: () => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useUpdateWorkspace = () => {
  const [updatadData, setupdatedData] = useState<ResponseType>();
  const [status, setStatus] = useState<"pending" | "error" | "settled">();

  const isPending = useMemo(() => status === "pending", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);

  const updation = useMutation(api.workspaces.Update);

  const update = useCallback(
    async (value: RequestType, options?: options) => {
      try {
        setStatus("pending");
        const response = await updation(value);

        options?.onSuccess?.(value.id);
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
    [updation]
  );

  return { updatadData, update, isError, isPending, isSettled };
};
