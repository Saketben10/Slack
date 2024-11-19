import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-params";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { IconType } from "react-icons/lib";

interface IconButtonProps {
  Variant: "app" | "default" | "destructive" | "ghost" | "link" | "outline";
  size: "default" | "icon" | "iconsm" | "sm";
  className: string;
  Icon: LucideIcon | IconType;
  channelId?: string;
}

export const IconButton = ({
  Variant,
  size,
  Icon,
  channelId,
  className,
}: IconButtonProps) => {
  const worksapceid = useWorkspaceId();
  return (
    <Button variant={Variant} size={size} className={className} asChild>
      <Link href={`/workspace/${worksapceid}/channel/${channelId}`}>
        <Icon className="size-7   hover:text-black cursor-pointer " />
      </Link>
    </Button>
  );
};
