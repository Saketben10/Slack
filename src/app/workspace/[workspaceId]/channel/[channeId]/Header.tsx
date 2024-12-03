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
import { useChannelId } from "@/hooks/use-channelId";
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setValue(value);
  };
  const channelid = useChannelId();
  const { update, isLoading: updatedChannelIsLoading } = useUpdateChannel();
  const { remove, isPending: deletedChannelIsLoading } = useRemoveChannel();

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    update(
      { name: value, channelid: channelid },
      {
        onSuccess: () => {
          toast.success("channel updated");
          setValue("");
        },
        onError: () => {
          toast.error("failed to update channel");
        },
      }
    );
  };

  const handleRemove = () => {
    remove(
      { channelid: channelid },
      {
        onSuccess: () => {
          toast.success("channel is deleted");
        },
        onError: () => {
          toast.error("failed to delete the channel");
        },
      }
    );
  };

  return (
    <div className="bg-whiten border-b h-[49px] flex items-center px-4 overflow-hidden">
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
            <Dialog open={oepn} onOpenChange={setOpen}>
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
