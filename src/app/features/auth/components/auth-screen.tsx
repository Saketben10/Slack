"use Client";

import { useState } from "react";
import { SignInCrad } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";
import { Fallback } from "./fall-back";

export const AuthScreen = () => {
  const [state, setState] = useState("signin");
  return (
    <div className="h-full flex items-center justify-center font-bold  text-white bg-[#5c3b58]">
      <div className="md:h-auto md:w-[420px]">
        {state === "signin" ? (
          <SignInCrad />
        ) : state === "signup" ? (
          <SignUpCard />
        ) : (
          <Fallback />
        )}
      </div>
    </div>
  );
};
