import * as React from "react"

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
} from "@/components/ui/sidebar"
import Image from "next/image"
import { LogOutIcon, NewspaperIcon, TagIcon } from "lucide-react"

const items = [
  {
    title: "Articles",
    url: "/admin/articles",
    icon: NewspaperIcon,
  },
  {
    title: "Category",
    url: "/admin/category",
    icon: TagIcon,
  },
  {
    title: "Logout",
    icon: LogOutIcon,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="text-white">
      <SidebarHeader>
        <Image src={'/images/logo.png'} alt="logo" width={250} height={150} className="w-auto h-auto" />
      </SidebarHeader>
      <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
