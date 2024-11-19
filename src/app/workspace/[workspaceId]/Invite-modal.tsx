import { useConfirm } from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/hooks/use-worksapceid";
import { useCurrentWorkspaces } from "@/app/api/hooks/use-current-workspace";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CopyIcon, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { DialogClose } from "@radix-ui/react-dialog";
import { useNewJoinCode } from "@/app/api/hooks/use-Create-newcode";

interface InviteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const InviteModal = ({ open, setOpen }: InviteModalProps) => {
  const [setconfirm, ConfirmDialog] = useConfirm();
  const workspaceId = useWorkspaceId();
  const { data } = useCurrentWorkspaces({ id: workspaceId });
  const { update, isPending } = useNewJoinCode();

  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/Join/${workspaceId}`;

    navigator.clipboard
      .writeText(inviteLink)
      .then(() => toast.success("Invite Link Copied TO ClipBoard"));
  };

  const handleCode = async () => {
    const ok = await setconfirm();
    if (!ok) return;
    await update(
      { id: workspaceId },
      {
        onSuccess: () => {
          toast.success("Code has beeen updated");
        },
      }
    );
  };
  return (
    <>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite People in {data?.name}</DialogTitle>
          </DialogHeader>
          <div className=" flex flex-col gap-y-4 items-center py-10 justify-center ">
            <p className="text-4xl font-bold tracking-widest uppercase">
              {data?.joinCode}
            </p>
            <Button variant={"ghost"} size="sm" onClick={handleCopy}>
              Copy Link
              <CopyIcon className="size-4 ml-2" />
            </Button>
          </div>

          <div className="flex items-center justify-between w-full">
            <Button
              variant={"outline"}
              onClick={handleCode}
              disabled={isPending}
            >
              New code <RefreshCcw className="size-4 ml-2" />
            </Button>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
