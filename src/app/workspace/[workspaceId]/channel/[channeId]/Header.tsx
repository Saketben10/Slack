import { useConfirm } from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/hooks/use-worksapceid";
import { useRouter } from "next/navigation";
import { useCurrentMember } from "@/app/features/members/api/hooks/use-current-member";
import { useChannelId } from "@/hooks/use-channelId";
import { useRemoveChannel } from "@/app/features/channels/api/hooks/use-remove-channels";
import { useUpdateChannel } from "@/app/features/channels/api/hooks/use-update-channel";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "lucide-react";

import { ChangeEvent, useState } from "react";

import { FaChevronDown } from "react-icons/fa";
import { toast } from "sonner";

interface HeaderProps {
  channelName: string;
}

export const Header = ({ channelName }: HeaderProps) => {
  const [oepn, setOpen] = useState(false);
  const [value, setValue] = useState<string>(channelName);
  const [confirm, ConfirmDialog] = useConfirm(
    "Delete this channel?",
    "you are about to delete this channel , this action is irreversible"
  );
  const worksapceId = useWorkspaceId();
  const router = useRouter();
  const { data: member } = useCurrentMember({ workspaceId: worksapceId });
  const channelid = useChannelId();

  const { update, isLoading: updatedChannelIsLoading } = useUpdateChannel();
  const { remove, isPending: deletedChannelIsLoading } = useRemoveChannel();

  // text from input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setValue(value);
  };

  const handleEditOpen = (value: boolean) => {
    if (member?.role !== "admin") {
      return;
    }
    setOpen(value);
  };
  // method to handle update of channel
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    update(
      { name: value, channelid: channelid },
      {
        onSuccess: () => {
          toast.success("channel updated");
          setValue("");
          setOpen(false);
        },
        onError: () => {
          toast.error("failed to update channel");
          setOpen(false);
        },
      }
    );
  };

  // method to handle deletion of channel
  const handleRemove = async () => {
    const ok = await confirm();
    if (!ok) {
      return;
    }

    remove(
      { channelid: channelid },
      {
        onSuccess: () => {
          toast.success("channel is deleted");
          router.push(`/workspace/${worksapceId}`);
        },
        onError: () => {
          toast.error("failed to delete the channel");
        },
      }
    );
  };

  return (
    <div className="bg-whiten border-b h-[49px] flex items-center px-4 overflow-hidden">
      <ConfirmDialog />
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="text-lg font-semibold px-2 overflow-hidden"
          >
            <span className="truncate">#{channelName}</span>
            <FaChevronDown className="size-2.5 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle># {channelName}</DialogTitle>
          </DialogHeader>

          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={oepn} onOpenChange={handleEditOpen}>
              <DialogTrigger asChild>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Channel Name</p>
                    <p className="text-sm text-[#1264a3]  hover:underline font-semibold">
                      Edit
                    </p>
                  </div>

                  <p className="text-sm">#{channelName}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename This Channel</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleUpdate}>
                  <Input
                    value={value}
                    disabled={updatedChannelIsLoading}
                    onChange={handleChange}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder="e.g plan-budget"
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant={"outline"} disabled={false}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button disabled={false}>Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <button
              className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer border hover:bg-gray-50 text-rose-600"
              onClick={handleRemove}
              disabled={deletedChannelIsLoading}
            >
              <TrashIcon className="size-4" />
              <p className="text-sm font-semibold">Delete Channel</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
