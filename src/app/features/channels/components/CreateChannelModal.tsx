import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { channelToggle } from "@/reducers/render";
import { AppDispatch, RootState } from "@/store/render";

import { useDispatch, useSelector } from "react-redux";

export const ChannelModal = () => {
  const toggle = useSelector((state: RootState) => state.render.channel);
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => dispatch(channelToggle(false));
  console.log(toggle);
  return (
    <>
      <Dialog open={toggle} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a channel</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
