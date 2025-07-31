"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useApi } from "@/hooks/useApi";
import { User } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

type NavbarProps = {
  isAdmin?: boolean;
};

export function Navbar({ isAdmin = false }: NavbarProps) {
  const { data } = useApi<User>({
    method: "GET",
    path: "auth/profile",
    auth: true,
  });

  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    Cookies.remove("ACCESS_TOKEN");
    Cookies.remove("USER_ROLE")
    window.location.href = "/login"
  };
  return (
    <header
      className={`absolute top-0 left-0 right-0 w-full py-3 border-b h-16 flex flex-col justify-center ${isAdmin && 'pl-64'} ${
        pathname !== "/articles" ? "border-b-slate-200" : "border-b-transparent"
      }`}
    >
      <nav className="bg-transparent">
        <div className="container">
          <div className="flex items-center justify-between">
            {!isAdmin ? (
              <Link href={"/"}>
                <Image
                  src={"/images/logo.png"}
                  alt="logo"
                  width={200}
                  height={150}
                  className="w-auto h-auto"
                />
              </Link>
            ) : (
              <h2>{pathname}</h2>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-x-2">
                <Avatar>
                  <AvatarFallback className="bg-blue-200 text-blue-900 font-medium">
                    {data?.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="font-medium underline text-white">
                  {data?.username}
                </p>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => router.push("/profile")}
                >
                  My Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center gap-x-1.5 text-red-500 cursor-pointer group"
                  onClick={handleLogout}
                >
                  <LogOutIcon className="text-red-500" />
                  <span className="group-hover:text-red-500">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </header>
  );
}
