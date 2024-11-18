"use client";

// import { useGetInfo } from "@/app/api/hooks/useGetinfo";
import { useJoin } from "@/app/api/hooks/useJoin";
import { useWorkspaceId } from "@/hooks/use-params";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
// import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import VerificationInput from "react-verification-input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { useNewGetInfo } from "@/app/api/hooks/usenewGetInfo";
// import { useNewGetInfo } from "@/app/api/hooks/usenewGetInfo";

const JoinPage = () => {
  const { mutate, isPending } = useJoin();
  const router = useRouter();
  const workspaceid = useWorkspaceId();
  console.log("workspace id using hook", workspaceid);

  const { data } = useNewGetInfo({ id: workspaceid });

  const handleJoin = (value: string) => {
    mutate(
      { id: workspaceid, joincode: value },
      {
        onSuccess: (id) => {
          router.replace(`/worksapce/${id}`);
          toast.success("joined succesfully!");
        },
        onError: () => {
          toast.error("error joining");
        },
      }
    );
  };

  return (
    <div className=" h-full flex flex-col gap-y-8  items-center justify-center bg-white p-8 rounded-lg shadow-sm">
      <Image src={"/logo.svg"} width={60} height={60} alt="log" />
      <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-2xl font-bold">Join Workspaces</h1>
          <p className="text-md text-muted-foreground">
            Enter Workspace code to join {data?.name}
          </p>
        </div>
        <VerificationInput
          onComplete={handleJoin}
          classNames={{
            container: cn(
              "flex gap-x-2",
              isPending && "opacity-50 cursor-not-allowed"
            ),
            character:
              "uppercasen h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500",
            characterInactive: "bg-muted",
            characterSelected: "bg-white text-black",
            characterFilled: "bg-white text-black",
          }}
          autoFocus
        />
      </div>
      <div className="flex gap-x-4">
        <Button size="lg" variant={"outline"} asChild>
          <Link href={"/"}>Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default JoinPage;
