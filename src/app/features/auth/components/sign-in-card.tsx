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

export const SignInCrad = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-2.5">
          <Input
            disabled={false}
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
          <Button type="submit" className="w-full" size={"lg"} disabled={false}>
            Continue
          </Button>
        </form>

        <div className="flex flex-col gap-y-2.5 mt-4 ">
          <Button
            className="w-full relative"
            disabled={false}
            onClick={() => {}}
            variant={"outline"}
            size={"lg"}
          >
            <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
            Continue with Google
          </Button>
          <Button
            className="w-full relative"
            disabled={false}
            onClick={() => {}}
            variant={"outline"}
            size={"lg"}
          >
            <FaGithub className="size-5 absolute top-2.5 left-2.5" />
            Continue with Github
          </Button>

          <p className="text-xs text-muted-foreground mt-2 mx-3 ">
            Don&apos;t have an account?
            <span className="text-sky-700 hover:underline cursor-pointer">
              sign-up
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
