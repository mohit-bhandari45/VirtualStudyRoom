"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/* Shadcn Components */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import {  LayoutGrid } from "lucide-react";
import source from "./data";

/* React Components */
import { CreateRoom } from "@/components/RoomComponents/CreateRoom";
import ActiveRoomCard from "@/components/DashBoardComponents/ActiveRoomCard";
import EventCard from "@/components/DashBoardComponents/EventCard";
import RecentActivity from "@/components/DashBoardComponents/RecentActivity";
import TotalRoomCard from "@/components/DashBoardComponents/TotalRoomCard";
import TotalUserCard from "@/components/DashBoardComponents/TotalUserCard";
import { api, getRoomsRoute } from "@/apis/api";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import Loader from "@/components/RoomComponents/Loader";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const { setRooms } = useAppContext();

  const { pageRefresh } = useAppContext();

  useEffect(() => {
    const token: string | null = sessionStorage.getItem("token");
    setToken(token);

    if (!token) {
      router.push("/auth/login");
    } else {
      setLoading(false);
    }
  }, [loading, router]);

  useEffect(() => {
    const getRooms = async () => {
      const response = await api.get(getRoomsRoute);
      setRooms(response.data.rooms);
    };

    getRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageRefresh]);

  return pageRefresh ? (
    <Loader />
  ) : (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      {loading ? (
        <div className="min-h-screen">
          <Skeleton className="w-full h-full" count={1} />
        </div>
      ) : (
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="container mx-auto">
            {/* Quick Actions */}
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-800 flex items-center">
                <LayoutGrid className="mr-3 text-primary" size={24} />
                DashBoard
              </h1>
              <CreateRoom />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Link href={"/rooms"}>
                <TotalRoomCard />
              </Link>
              <Link href={"/rooms"}>
                <ActiveRoomCard />
              </Link>
              <TotalUserCard />
              <EventCard scheduledEvents={source.scheduledEvents} />
            </div>
            <RecentActivity recentActivity={source.recentActivity} />
          </div>
        </div>
      )}
    </SidebarInset>
  );
}
