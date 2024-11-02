"use client";

import { useEffect, useMemo } from "react";
import { UserButton } from "./features/auth/components/user-Button";
import { useGetWorkspaces } from "./api/hooks/use-get-workspaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/render";
import { setOpen } from "@/reducers/render";
import { useRouter } from "next/navigation";

const Home = () => {
  const { data, isLoading } = useGetWorkspaces();
  const open = useSelector((state: RootState) => state.render.open);
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const workspaceId = useMemo(() => {
    return data?.[0]?._id;
  }, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
      dispatch(setOpen(false));
    } else if (!open) {
      dispatch(setOpen(true));
    } else {
      console.log("create workspaces");
    }
  }, [workspaceId, data, isLoading, open, dispatch, router]);
  return (
    <>
      <div className="h-full flex justify-center items-center">
        <UserButton />
      </div>
       

    </>
  );
};

export default Home;
