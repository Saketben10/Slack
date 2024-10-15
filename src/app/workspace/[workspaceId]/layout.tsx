"use client";

import { Toolbar } from "./Toolbar";

interface WorkSpaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkSpaceIdLayout = ({ children }: WorkSpaceIdLayoutProps) => {
  return (
    <div className="w-full">
      <Toolbar />
      {children}
    </div>
  );
};

export default WorkSpaceIdLayout;
