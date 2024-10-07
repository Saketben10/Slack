"use client";

import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";

const Home = () => {
  const { signOut } = useAuthActions();
  return (
    <>
      <div>this is main pagge</div>

      <Button
        onClick={() => {
          signOut();
        }}
      >
        signOut
      </Button>
    </>
  );
};

export default Home;
