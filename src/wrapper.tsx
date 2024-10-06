"use client";

import { Provider } from "react-redux";
import { store } from "./store/render";

interface WrapperPorps {
  className: string;
  children: React.ReactNode;
}

export const Wrapper = ({ className, children }: WrapperPorps) => {
  return (
    <>
      <Provider store={store}>
        <div className={`h-full w-full mx-2 ${className}`}>{children}</div>{" "}
      </Provider>
    </>
  );
};
