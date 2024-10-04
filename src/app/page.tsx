"use client";

import { Provider } from "react-redux";

import { AuthScreen } from "./features/auth/components/auth-screen";
import { store } from "@/store/render";

const Home = () => {
  return (
    <>
      <Provider store={store}>
        <AuthScreen />
      </Provider>
    </>
  );
};

export default Home;
