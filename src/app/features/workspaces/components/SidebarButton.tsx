import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

import { IconType } from "react-icons/lib";

interface SidebarButtonProps {
  icon: LucideIcon | IconType;
  label: string;
  isActive?: boolean;
}

export const SidebarButton = ({
  icon: Icon,
  label,
  isActive,
}: SidebarButtonProps) => {
  return (
    <div className="flex flex-col item-center justify-center gap-x-2 cursor-pointer group:">
      <Button
        variant={"default"}
        className={cn(
          "size-9 p-2 group-hover:bg-accent/20",
          isActive && "bg-accent/20"
        )}
      >
        <Icon className="size-5 text-white group-hover:scale-110 transition-all" />
        <span className="text=[11px] text-white group-hover:text-accent">
          {label}
        </span>
      </Button>
    </div>
  );
};
