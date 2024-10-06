"use client";

import { SignInCrad } from "./sign-in-card";
import { images } from "@/assets/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/render";
import { SignUpCard } from "./sign-up-card";
import Image from "next/image";

export const AuthScreen = () => {
  const state = useSelector((state: RootState) => state.render.state);

  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Image as a background */}
      <Image
        src={images.space} // Use the imported image here
        alt="Nature"
        layout="fill" // This makes the image fill its container
        objectFit="cover" // This makes the image cover the entire container
        className="z-0" // Ensure the image stays in the background
      />

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Auth Card Container */}
      <div className="md:h-auto md:w-[420px] z-20 relative">
        {state === "signin" ? <SignInCrad /> : <SignUpCard />}
      </div>
    </div>
  );
};
