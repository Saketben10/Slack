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

import { authStatus, pendingStatus, renderState } from "@/reducers/render";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/render";
import { TriangleAlert } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useToast } from "@/hooks/use-toast";

export const SignUpCard = () => {
  const { toast } = useToast();

  const [ToastConfig, setToastConfig] = useState({
    title: "",
    description: "",
  });

  console.log(ToastConfig);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const showToast = (title: string, description: string) => {
    setToastConfig({
      title,
      description,
    });

    toast({ title, description });
  };

  const [error, setError] = useState("");
  const { signIn } = useAuthActions();
  const dispatch = useDispatch<AppDispatch>();
  const pending = useSelector((state: RootState) => state.render.pending);

  const handleSignInProvider = (value: "github" | "google") => {
    dispatch(pendingStatus(true));
    signIn(value).finally(() => {
      pendingStatus(false);
    });
  };

  //function to handleForm submission
  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password !== form.confirmpassword) {
      setError("password is not matching");
      return;
    }

    dispatch(pendingStatus(true));
    signIn("password", {
      email: form.email,
      password: form.password,

      flow: "signUp",
    })
      .catch((err) => {
        console.log(err);
        setError("invalid Crendtials");
      })
      .finally(() => {
        dispatch(pendingStatus(false));
        dispatch(authStatus(true));
        showToast("Congratulations ", "acccount created");
      });
  };

  return (
    <Card className="w-full h-auto p-8    rounded-lg border border-gray-200 bg-gray-100 bg-opacity-50 backdrop-filter backdrop-blur-md custom-blur text-card-foreground shadow-lg transition duration-200 ease-in-out hover:shadow-x  ">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign-Up to continue</CardTitle>
        <CardDescription className="text-white font-semibold">
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
        <form className="space-y-2.5" onSubmit={onPasswordSignUp}>
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
          {form.password && (
            <Input
              type="password"
              placeholder="confirm-password"
              onChange={(e) => {
                setForm({
                  ...form,
                  confirmpassword: e.target.value,
                });
              }}
              required={true}
            />
          )}
          <Button
            type="submit"
            className="w-full"
            size={"lg"}
            disabled={pending}
            variant={"app"}
          >
            Create Account
          </Button>
        </form>

        <div className="flex flex-col gap-y-2.5 mt-6 ">
          <Button
            className="w-full relative  "
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
            disabled={pending}
            onClick={() => {
              handleSignInProvider("github");
            }}
            variant={"outline"}
            size={"lg"}
          >
            <FaGithub className="size-5 absolute top-2.5 left-2.5" />
            Continue with Github
          </Button>

          <p className="text-xs  text-white font-semibold text-muted-foreground mt-2 mx-3 ">
            Already have an account?
            <span
              className="text-sky-400 hover:underline cursor-pointer hover:text-[#59b5b6]  font-extrabold "
              onClick={() => {
                dispatch(renderState("signin"));
              }}
            >
              Login
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
