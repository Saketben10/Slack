import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { channelToggle } from "@/reducers/render";
import { AppDispatch, RootState } from "@/store/render";

import { ChangeEvent, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useWorkspaceId } from "@/hooks/use-worksapceid";
import { useCreateChannel } from "../api/hooks/use-Create-Channel";
import { toast } from "sonner";
// import { useCreateChannel } from "../api/hooks/use-Create-Channel";

export const ChannelModal = () => {
  const { isLoading: channelisLoading, create } = useCreateChannel();

  // const {data,isLoading,create,error}= useCreateChannel()

  const toggle = useSelector((state: RootState) => state.render.channel);
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    setName("");
    dispatch(channelToggle(false));
  };

  const [name, setName] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setName(value);
  };
  const workspaceId = useWorkspaceId();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    create(
      { name, workspaceId },
      {
        onSuccess: () => {
          //TODO: redirect to channel
          toast.success("channel Created");
          handleClose();
        },
        onError: () => {
          toast.error("failed to create a channel");
        },
      }
    );
  };

  return (
    <>
      {
        <Dialog open={toggle} onOpenChange={handleClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a channel</DialogTitle>
            </DialogHeader>
            <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
              <Input
                disabled={channelisLoading}
                value={name}
                placeholder="e.g plan a budget"
                required
                autoFocus
                minLength={3}
                maxLength={80}
                onChange={handleChange}
              />
              <div className="flex justify-end mt-1">
                <Button
                  variant={"default"}
                  size={"sm"}
                  disabled={channelisLoading}
                >
                  Create
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      }
    </>
  );
};
