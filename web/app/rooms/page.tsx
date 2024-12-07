"use client";

import React, { useEffect, useState } from "react";

/* Shadcn Components */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutGrid } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { api, getAllRoomsRoute, getRoomsRoute } from "@/apis/api";
import RoomsInfo from "@/components/RoomComponents/RoomsInfo";
import { CreateRoom } from "@/components/RoomComponents/CreateRoom";

const Rooms = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const { allRooms, rooms, setAllRooms, setRooms } = useAppContext();

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
    const getAllRooms = async () => {
      const response = await api.get(getAllRoomsRoute, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllRooms(response.data.allRooms);
    };
    const getRooms = async () => {
      const response = await api.get(getRoomsRoute, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRooms(response.data.rooms);
    };
    getRooms();
    getAllRooms();
  }, [token]);

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Room</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      {loading ? (
        <div className="flex justify-center w-full h-full items-center">
          <Skeleton width={1200} height={680} count={1} />
        </div>
      ) : (
        <div className="p-6 bg-gray-50 min-h-screen flex flex-col gap-10">
          <div className="container mx-auto">
            {/* Quick Actions */}
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-800 flex items-center">
                <LayoutGrid className="mr-3 text-primary" size={24} />
                Rooms
              </h1>
              <CreateRoom token={token} />
            </div>

            <div className="grid grid-cols-1">
              <RoomsInfo rooms={rooms} canJoin={false} />
            </div>
          </div>

          <div className="container mx-auto">
            {/* Quick Actions */}
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-800 flex items-center">
                <LayoutGrid className="mr-3 text-primary" size={24} />
                Active Rooms
              </h1>
            </div>

            <div className="grid grid-cols-1">
              <RoomsInfo
                rooms={rooms?.filter((room) => room.isActive === true)} canJoin={false}
              />
            </div>
          </div>

          <div className="container mx-auto">
            {/* Quick Actions */}
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-800 flex items-center">
                <LayoutGrid className="mr-3 text-primary" size={24} />
                Join Rooms
              </h1>
            </div>

            <div className="grid grid-cols-1">
              {allRooms?.map((room) => {
                return <RoomsInfo rooms={room} canJoin={true}/>;
              })}
            </div>
          </div>
        </div>
      )}
    </SidebarInset>
  );
};

export default Rooms;
