import { useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface EmojiProps {
  children: React.ReactNode;
  hint: string;
  onemojiSelect: (emoji: any) => void;
}

export const EmojiPopOver = ({
  children,
  hint = "Emoji",
  onemojiSelect,
}: EmojiProps) => {
  const [tooltipopen, setTooltipopen] = useState(false);
  const [popOveropen, setPoverpopen] = useState(false);
  const onSelect = (emoji: any) => {
    onemojiSelect(emoji);

    setPoverpopen(false);
    setTimeout(() => {
      setTooltipopen(false);
    }, 5000);
  };
  return (
    <TooltipProvider>
      <Popover open={popOveropen} onOpenChange={setPoverpopen}>
        <Tooltip
          open={tooltipopen}
          onOpenChange={setTooltipopen}
          delayDuration={50}
        >
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent className="bg-black text-white border border-white/5">
            <p className="font-medum text-xs">{hint}</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent className="p-0 w-full border-none shadow-none">
          <Picker data={data} onEmojiSelect={onSelect} />
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};
