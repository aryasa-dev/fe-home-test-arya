"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
import { usePathname, useRouter } from "next/navigation";
import { getPageTitle } from "@/lib/utils";
import { LogoutDialog } from "./LogoutDialog";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";

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
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (data) {
      localStorage.setItem("user", data.username)
    }
  }, [data])

  return (
    <>
      <header
        className={`absolute top-0 left-0 right-0 w-full py-3 border-b h-16 flex flex-col justify-center bg-gray-50 ${
          isAdmin && "text-slate-900"
        } ${
          pathname !== "/articles"
            ? "border-b-slate-200"
            : "border-b-transparent"
        }`}
      >
        <nav className="bg-transparent">
          <div className="container">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                {isAdmin && (
                  <>
                    <SidebarTrigger className="-ml-2" />
                    <Separator
                      orientation="vertical"
                      className="mx-1 data-[orientation=vertical]:h-4"
                    />
                  </>
                )}
                {!isAdmin ? (
                  <Link href={"/"}>
                    <Image
                      src={"/images/logo.png"}
                      alt="logo"
                      width={200}
                      height={150}
                      className="w-32 h-6 object-contain"
                    />
                  </Link>
                ) : (
                  <h2 className="font-semibold text-xl text-slate-900">
                    {getPageTitle(pathname)}
                  </h2>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-x-2 cursor-pointer">
                  <Avatar>
                    <AvatarFallback className="bg-blue-200 text-blue-900 font-medium">
                      {data?.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-medium underline text-inherit text-sm">
                    {data?.username}
                  </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() =>
                      router.push(
                        pathname.includes("/dashboard")
                          ? "/dashboard/user-profile"
                          : "/profile"
                      )
                    }
                  >
                    My Account
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex items-center gap-x-1.5 text-red-500 cursor-pointer group"
                    onClick={() => setShowLogoutModal(true)}
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
      <LogoutDialog
        openDialog={showLogoutModal}
        setOpenDialog={setShowLogoutModal}
      />
    </>
  );
}
