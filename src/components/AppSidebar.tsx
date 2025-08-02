"use client";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { LogOutIcon, NewspaperIcon, TagIcon } from "lucide-react";
import { LogoutDialog } from "./LogoutDialog";

const items = [
  {
    title: "Articles",
    url: "/dashboard/articles",
    icon: NewspaperIcon,
  },
  {
    title: "Category",
    url: "/dashboard/category",
    icon: TagIcon,
  },
  {
    title: "Logout",
    icon: LogOutIcon,
  },
];


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  return (
    <>
      <Sidebar {...props} className="text-white">
        <SidebarHeader>
          <Image
            src={"/images/logo.png"}
            alt="logo"
            width={250}
            height={150}
            className="w-auto h-auto"
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      {item.url ? (
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      ) : (
                        <div
                          onClick={() => setShowLogoutModal(true)}
                          className="cursor-pointer"
                        >
                          <item.icon /> <span>{item.title}</span>
                        </div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <LogoutDialog
        openDialog={showLogoutModal}
        setOpenDialog={setShowLogoutModal}
      />
    </>
  );
}
