import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { setConfig } from "next/config";
import { useState } from "react";

export const useConfirm = (
  title: string,
  message: string
): [() => Promise<unknown>, JSX.Element] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const setconfirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleCancel = () => {
    if (promise) {
      promise.resolve(false);
      handleClose();
    }
  };

  const handleConfirm = () => {
    if (promise) {
      promise.resolve(true);
      handleClose();
    }
  };

  // Confirm dialog component
  const ConfirmDialog = () => {
    return (
      <Dialog open={promise !== null} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-2">
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  // Return the dialog JSX element directly, instead of a function
  return [setconfirm, ConfirmDialog];
};
