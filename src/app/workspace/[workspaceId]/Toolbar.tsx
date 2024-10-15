import { useCurrentWorkspaces } from "@/app/api/hooks/use-current-workspace";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-params";
import { Info, Search } from "lucide-react";

export const Toolbar = () => {
  const workspaceId = useWorkspaceId();

  const { data, isLoading } = useCurrentWorkspaces({ id: workspaceId });

  return (
    <nav className="bg-[#360549] w-full flex justify-center items-center h-14 p-1.5 ">
      <div className="flex-1">
        <div className="min-w-[280px] max-[642px] grow-[2]  shrink">
          <Button
            size={"default"}
            className="bg-accent/25  hover:bg-accent/25 flex w-[400px] justify-start h-8 px-2"
          >
            <Search className="size-4 text-white mr-2" />
            <span className="text-white text-xs">
              Search {isLoading ? "..." : data?.name}
            </span>
          </Button>
        </div>
      </div>
      <div className="ml-auto flex-1a flex items-center justify-end">
        <Button variant={"app"} size={"iconsm"}>
          <Info className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
};
