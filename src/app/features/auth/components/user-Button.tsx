"use client";

import { UseCurrentUser } from "@/app/api/hooks/user-current";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthActions } from "@convex-dev/auth/react";

import { Loader, LogOut } from "lucide-react";

export const UserButton = () => {
  const { signOut } = useAuthActions();
  const { data, isloading } = UseCurrentUser();

  if (isloading) {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  } else if (!data) {
    return null;
  }

  const { name, image } = data;
  const avatarFallBack = name!.charAt(0).toUpperCase();

return (
          <
          >
        
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className={`size-8 hover:opacity-75 transition`}>
          <AvatarImage alt={name} src={image} />
          <AvatarFallback>{avatarFallBack}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="center" side="right">
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="size-4 mr-4" />
          Log out
        </DropdownMenuItem>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>hello :{name}</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
};
