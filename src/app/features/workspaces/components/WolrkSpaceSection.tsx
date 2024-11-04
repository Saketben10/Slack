import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import { useToggle } from "@/hooks/useToggle";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { ReactNode } from "react";
import { FaCaretDown } from "react-icons/fa";

interface WorkSpaceSectionProps {
  children: ReactNode;
  hint: string;
  label: string;
  onNew?: () => void;
}

export const WorkSpaceSection = ({
  children,
  onNew,
  label,
  hint,
}: WorkSpaceSectionProps) => {
  const [on, toggle] = useToggle(true);

  return (
    <div className="flex flex-col mt-3  px-2">
      <div className="flex items-center px-3.5 group">
        <Button
          onClick={toggle}
          variant={"app"}
          className="p-0.5 mr-2 text-sm text-[#f9edffcc] shrink-0 size-6"
        >
          <FaCaretDown className={cn("size-4", !on && "-rotate-90")} />
        </Button>
        <Button
          variant={"app"}
          size={"sm"}
          className="group px-1.5 text-sm text-[#f9edffcc] h-[28px] justify-start overflow-hidden items-center"
        >
          <span className="truncate">{label}</span>
        </Button>
        {onNew && (
          <Hint label={hint} align="center" side="top">
            <Button
              variant={"app"}
              onClick={onNew}
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-auto p-0.5 text-sm text-[#f9edffcc] size-6 shrink-0"
            >
              <PlusIcon className="w-4 h-4 text-white" />
            </Button>
          </Hint>
        )}
      </div>

      <div className="mt-1">{on && children}</div>
    </div>
  );
};
