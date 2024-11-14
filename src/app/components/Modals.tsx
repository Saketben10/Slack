"use client";

import { useEffect, useState } from "react";
import { CreateWorkspaceModal } from "../features/workspaces/components/create-workspace-modal";
import { ChannelModal } from "../features/channels/components/CreateChannelModal";

export const Modals = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      <ChannelModal />
      <CreateWorkspaceModal />;
    </>
  );
};
