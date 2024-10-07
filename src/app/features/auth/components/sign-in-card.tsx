"use client";

import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import { FaGithub } from "react-icons/fa";
// import { SignInFlow } from "../types";
import { pendingStatus, renderState } from "@/reducers/render";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/render";

import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";

export const SignInCrad = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const { signIn } = useAuthActions();
  //sign form convex

  const pending = useSelector((state: RootState) => state.render.pending);
  // using redux to update state of pending buttons and forms
  const dispatch = useDispatch<AppDispatch>();

  //fucntion to habndle login from github and google
  const handleSignInProvider = (value: "github" | "google") => {
    dispatch(pendingStatus(true));
    signIn(value).finally(() => {
      pendingStatus(false);
    });
  };

  //function to handleForm submission
  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(pendingStatus(true));
    signIn("password", {
      email: form.email,
      password: form.password,
      flow: "signIn",
    })
      .catch((err) => {
        console.log(err);
        setError("invalid Crendtials");
      })
      .finally(() => dispatch(pendingStatus(false)));
  };

  return (
    <Card className="w-full h-90 p-8    rounded-lg border border-gray-200 bg-gray-100 bg-opacity-50 backdrop-filter backdrop-blur-md custom-blur text-card-foreground shadow-lg transition duration-200 ease-in-out hover:shadow-x  ">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription className="font-semibold text-white">
          use your email or another service to continue
        </CardDescription>
      </CardHeader>

      {error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 test-sm">
          <TriangleAlert className="size-4 mb-2" />
          <p>{error}</p>
        </div>
      )}
      <CardContent>
        <form className="space-y-2.5" onSubmit={onPasswordSignIn}>
          <Input
            disabled={pending}
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setForm({
                ...form,
                email: e.target.value,
              });
            }}
            required={true}
          />
          <Input
            disabled={pending}
            type="password"
            placeholder="password"
            onChange={(e) => {
              setForm({
                ...form,
                password: e.target.value,
              });
            }}
            required={true}
          />
          <Button
            type="submit"
            className="w-full"
            size={"lg"}
            disabled={pending}
          >
            Login
          </Button>
        </form>

        <div className="flex flex-col gap-y-2.5 mt-6 ">
          <Button
            className="w-full relative"
            disabled={pending}
            onClick={() => {
              handleSignInProvider("google");
            }}
            variant={"outline"}
            size={"lg"}
          >
            <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
            Continue with Google
          </Button>
          <Button
            className="w-full relative"
            onClick={() => handleSignInProvider("github")}
            variant={"outline"}
            size={"lg"}
            disabled={pending}
          >
            <FaGithub className="size-5 absolute top-2.5 left-2.5" />
            Continue with Github
          </Button>

          <p className="text-xs text-white font-semibold  mt-2 mx-3 ">
            Don&apos;t have an account?
            <span
              className="text-sky-400 hover:underline cursor-pointer hover:text-[#59b5b6]  font-extrabold "
              onClick={() => {
                dispatch(renderState("sign-up"));
              }}
            >
              sign-up
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
