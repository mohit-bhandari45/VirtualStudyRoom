"use client";

import * as React from "react";
import { useEffect } from "react";
import {
  Blocks,
  Calendar,
  Home,
  Inbox,
  MessageCircleQuestion,
  Settings2,
  Trash2,
} from "lucide-react";

import { NavMain } from "./NavMain";
import { NavSecondary } from "./NavSecondary";
import { TeamSwitcher } from "./TeamSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getProfileRoute } from "@/apis/api";
import axios from "axios";

// This is sample data.
const data = {
  navMain: [
    {
      title: "DashBoard",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "StudyRooms",
      url: "#",
      icon: Inbox,
      badge: "10",
    },
  ],
  navSecondary: [
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Templates",
      url: "#",
      icon: Blocks,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [email, setEmail] = React.useState<string>("");
  useEffect(() => {
    const getProfile = async () => {
      const token = sessionStorage.getItem("token");
      console.log(token);

      const response = await axios.get(getProfileRoute, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmail(response.data.getUser.email);
    };
    getProfile();
  }, []);

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher email={email} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
