"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { workspaceStatus } from "@/reducers/render";
import { AppDispatch, RootState } from "@/store/render";
import { useDispatch, useSelector } from "react-redux";

export const CreateWorkspaceModal = () => {
  const open = useSelector((state: RootState) => state.render.open);
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    dispatch(workspaceStatus(false));
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ADD a Workspaces</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
