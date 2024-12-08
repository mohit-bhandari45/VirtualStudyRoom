"use client";

import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";

const TotalUserCard = () => {
  const [totalParticipants, setTotalParticipants] = useState<
    number | undefined
  >(0);
  const { rooms } = useAppContext();

  useEffect(() => {
    const total = rooms?.reduce(
      (total, room) => total + room.participants.length,
      0
    );
    setTotalParticipants(total);
  }, [rooms]);
    
  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          Total Participants
        </CardTitle>
        <Users className="text-muted-foreground" size={20} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-purple-600">
          {totalParticipants}
        </div>
        <p className="text-xs text-gray-500">Across all rooms</p>
      </CardContent>
    </Card>
  );
};

export default TotalUserCard;
