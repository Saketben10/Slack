import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-params";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { IconType } from "react-icons/lib";

interface SidebarItemProps {
  label: string;
  id: string;
  Icon: LucideIcon | IconType;
  variant?: VariantProps<typeof sideBarVariant>["variant"];
}

const sideBarVariant = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#481349] bg-white/90 hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const SidebarItem = ({ label, id, Icon, variant }: SidebarItemProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <Button
      className={cn(sideBarVariant({ variant }))}
      variant="app"
      size="sm"
      asChild
    >
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <div className="flex items-center gap-2">
          <Icon className="size-3.5 mr-1 shrink-0" />
          <span className="text-sm truncate">{label}</span>
        </div>
      </Link>
    </Button>
  );
};
