"use client";

import { useGetChannel } from "@/app/features/channels/api/hooks/use-current-channel";
import { useChannelId } from "@/hooks/use-channelId";
import { AlertTriangle } from "lucide-react";
import { Triangle } from "react-loader-spinner";
import { Header } from "./Header";
import { ChatInput } from "./ChatInput";

const ChannelPage = () => {
  const channelId = useChannelId();

  const { data: channel, isLoading: channelIsLoading } = useGetChannel({
    channelId,
  });

  if (channelIsLoading) {
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <Triangle
          visible={true}
          height="80"
          width="80"
          color="#9b59b6"
          ariaLabel="triangle-loading"
        />
      </div>
    );
  } else if (!channel) {
    return (
      <div>
        <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
          <AlertTriangle className="size-4 animate-spin text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Channel not found
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <Header channelName={channel.name} />
      <div className="flex-1" />
      <ChatInput />
    </div>
  );
};

export default ChannelPage;
