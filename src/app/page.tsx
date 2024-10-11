"use client";

import { useEffect, useMemo } from "react";
import { UserButton } from "./features/auth/components/user-Button";
import { useGetWorkspaces } from "./features/workspaces/use-get-workspaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/render";
import { workspaceStatus } from "@/reducers/render";

const Home = () => {
  const { data, isLoading } = useGetWorkspaces();
  const open = useSelector((state: RootState) => state.render.open);
  const dispatch = useDispatch<AppDispatch>();
  const workspaceId = useMemo(() => {
    return data?.[0]?._id;
  }, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      console.log("current workspace");
    } else if (!open) {
      dispatch(workspaceStatus(true));
      console.log(data);
    } else {
      console.log("create workspaces");
    }
  }, [workspaceId, data, isLoading, open, dispatch]);
  return (
    <>
      <div className="h-full flex justify-center items-center">
        <UserButton size={20} />
      </div>
    </>
  );
};

export default Home;
