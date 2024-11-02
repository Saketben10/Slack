import { useState } from "react";
import { useDeleteWorkspace } from "@/app/api/hooks/use-delete-workspace";
import { useUpdateWorkspace } from "@/app/api/hooks/use-update-worksapces";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { TrashIcon } from "lucide-react";

import { Id } from "../../../../convex/_generated/dataModel";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";

interface PreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
  id: Id<"workspaces">;
}

export const PreferencesModal = ({
  open,
  setOpen,
  initialValue,
  id,
}: PreferencesModalProps) => {
  const [value, setValue] = useState(initialValue);
  const [editOpen, setEditOpen] = useState(false);
const  [setconfirm,ConfirmDialog]=useConfirm('are you sure?',
  'This Action is ireverssible'
)
  const router = useRouter();

  const { update: updateWorkspace, isPending: updateisPending } =
    useUpdateWorkspace();
  const { remove: removeWorkspace, isPending: removeisPending } =
    useDeleteWorkspace();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateWorkspace(
      { name: value, id },
      {
        onSuccess: () => {
          setEditOpen(false);
          toast.success("WorkSpace updated");
        },
        onError: () => {
          toast.error("Failed to update workspace");
        },
      }
    );
  };

  const handleDelete = async () => {
    const ok = await setconfirm()
    if(!ok) return
    removeWorkspace(
      { id },
      {
        onSuccess: () => {
          router.replace("/");
          toast.success("Workspaces Deleted");
        },
        onError: () => {
          toast.error("error occured while deleting");
        },
      }
    );
  };

  return (
    <>
   < ConfirmDialog/>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-gray-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <div className="flex items-center justify-between ">
                <p className="text-sm font-semibold">workspace Name</p>

                <DialogTrigger asChild>
                  <p className="text-sm text-[#821d1d]  hover:underline font-semibold">
                    Edit
                  </p>
                </DialogTrigger>
              </div>
              <p className="text-sm  ">{value}</p>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit workspace</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <Input
                    disabled={updateisPending}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={90}
                    placeholder="workspace name eg: 'Work' , 'Personal' 'Home' "
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant={"outline"} disabled={updateisPending}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button disabled={updateisPending}>Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <button
            disabled={removeisPending}
            onClick={handleDelete}
            className="flex items-center gap-x-2 px-4 py-5 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
          >
            <TrashIcon className="size-4 " />
            <p className="text-sm font-semibold">Delete workspace</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};
