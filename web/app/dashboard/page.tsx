// import TotalRoomsCard from "@/components/DashBoardComponents/TotalRoomCard";
import TotalRoomCard from "@/components/DashBoardComponents/TotalRoomCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutGrid, PlusCircle } from "lucide-react";
import source from "./data";
import ActiveRoomCard from "@/components/DashBoardComponents/ActiveRoomCard";
import TotalUserCard from "@/components/DashBoardComponents/TotalUserCard";
import EventCard from "@/components/DashBoardComponents/EventCard";
import RecentActivity from "@/components/DashBoardComponents/RecentActivity";
// import { roomStats } from "./data";

export default function Page() {
  return (
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

              {/* <BreadcrumbSeparator className="hidden md:block" /> */}
              {/* <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem> */}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="container mx-auto">
          {/* Quick Actions */}
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800 flex items-center">
              <LayoutGrid className="mr-3 text-primary" size={24} />
              DashBoard
            </h1>
            <Button className="bg-black hover:bg-gray-800 text-white">
              <PlusCircle className="mr-2" size={20} />
              Create New Room
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <TotalRoomCard totalRooms={source.totalRooms} />
            <ActiveRoomCard activeRooms={source.activeRooms} />
            <TotalUserCard totalParticipants={source.totalParticipants} />
            <EventCard scheduledEvents={source.scheduledEvents} />
          </div>
          <RecentActivity recentActivity={source.recentActivity} />
        </div>
      </div>
    </SidebarInset>
  );
}
