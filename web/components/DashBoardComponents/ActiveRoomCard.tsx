import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { VideoIcon } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const ActiveRoomCard = () => {
  const { rooms } = useAppContext();

  const activeRooms = rooms?.filter((room) => room.isActive === true);

  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          Active Rooms
        </CardTitle>
        <VideoIcon className="text-muted-foreground" size={20} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-green-600">
          {activeRooms?.length}
        </div>
        <p className="text-xs text-gray-500">Currently in use</p>
      </CardContent>
    </Card>
  );
};

export default ActiveRoomCard;
