"use client";

import { useChannelId } from "@/hooks/use-channelId";

const ChannelPage = () => {
  const id = useChannelId();
  console.log("channelid", id);
  return <div className="h-full font-bold">channelid:{id} </div>;
};

export default ChannelPage;
