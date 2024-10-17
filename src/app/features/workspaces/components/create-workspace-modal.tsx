"use client";

import { useCreateWorkSpace } from "@/app/api/hooks/use-create-workspace";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useToast } from "@/hooks/use-toast";
import { setOpen } from "@/reducers/render";
import { AppDispatch, RootState } from "@/store/render";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ToastConfig {
  variant: "done" | "destructive" | "default";
  title: string;
  description: string;
}
export const CreateWorkspaceModal = () => {
  const [name, setName] = useState("");
  const { mutate, isPending } = useCreateWorkSpace();
  const [ToastConfig, setToastConfig] = useState<ToastConfig>({
    variant: "default",
    title: "",
    description: "",
  });
  console.log(ToastConfig);
  const { toast } = useToast();
  const router = useRouter();

  const showToast = (
    variant: "done" | "destructive" | "default",
    title: string,
    description: string
  ) => {
    setToastConfig({
      variant,
      title,
      description,
    });
    toast({ title, description, variant });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const iD = mutate(
      { name },
      {
        onSuccess(id) {
          router.push(`/workspace/${id}`);
          dispatch(setOpen(false));
          showToast("done", "Congratulations !", "workSpace Created");
        },
      }
    );

    iD.then((res) => console.log("data of promise:", res));
  };
  const open = useSelector((state: RootState) => state.render.open);
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ADD a Workspaces</DialogTitle>
        </DialogHeader>
        <form className="space-y-2.5" onSubmit={handleSubmit}>
          <Input
            onChange={(e) => setName(e.target.value)}
            autoFocus={true}
            placeholder="create-workspase form here"
            value={name}
            disabled={isPending}
            required
            minLength={3}
          />

          <div className="flex justify-center">
            <Button
              className="w-full"
              variant={"destructive"}
              disabled={isPending}
            >
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
