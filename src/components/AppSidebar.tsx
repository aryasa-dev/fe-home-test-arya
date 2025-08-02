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
import { usePathname } from "next/navigation";

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
  const pathname = usePathname()
  return (
    <>
      <Sidebar {...props} className="text-white">
        <SidebarHeader>
          <Image
            src={"/images/logo-white.png"}
            alt="logo"
            width={150}
            height={50}
            className="w-auto h-auto max-w-32 max-h-6 object-contain mb-6"
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className={pathname === item.url ? 'bg-blue-500' : ''}>
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
