import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Building } from "lucide-react";

const TotalRoomCard = ({ totalRooms }: { totalRooms: number }) => {
  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          Total Rooms
        </CardTitle>
        <Building className="text-muted-foreground" size={20} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-blue-600">{totalRooms}</div>
        <p className="text-xs text-gray-500">Created rooms</p>
      </CardContent>
    </Card>
  );
};

export default TotalRoomCard;
