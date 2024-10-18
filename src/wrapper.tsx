"use client";

import { Provider } from "react-redux";
import { store } from "./store/render";
import { cn } from "./lib/utils";

interface WrapperPorps {
  className: string;
  children: React.ReactNode;
}

export const Wrapper = ({ className, children }: WrapperPorps) => {
  return (
    <>
      <Provider store={store}>
        <div className={cn(className)}>{children}</div>{" "}
      </Provider>
    </>
  );
};
