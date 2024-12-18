"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room, UserRoom } from "@/context/AppContext";
import { formatDistanceToNow } from "date-fns";
import { Activity, Calendar, Crown, MessageCircle, Users } from "lucide-react";
import { JoinRoom } from "./JoinRoom";
import { useEffect, useState } from "react";
import { api, getJoinedRoomsRoute } from "@/apis/api";

export function RoomCard({
  room,
  canJoin = false,
}: {
  room: Room;
  canJoin: boolean;
}) {
  const [joinedRooms, setJoinedRooms] = useState<UserRoom[] | undefined>(
    undefined
  );
  const [joined, setJoined] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const getJoinedRooms = async () => {
      const response = await api.get(getJoinedRoomsRoute);
      setJoinedRooms(response.data);
    };
    if (canJoin == true) {
      getJoinedRooms();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (canJoin == true) {
      const isJoined = joinedRooms?.find(
        (joinedRoom) => joinedRoom.roomId === room.id
      );
      if (isJoined != null) {
        setJoined(true);
      } else {
        setJoined(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinedRooms]);

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <CardHeader className="flex flex-col space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 min-w-0 w-full flex justify-between items-center flex-row">
            {" "}
            {/* min-w-0 helps with text truncation */}
            <div className="roomdetails">
              <CardTitle className="text-base sm:text-lg font-semibold line-clamp-1">
                {room.name}
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={room.isActive ? "default" : "secondary"}
                  className="px-2 py-0.5 text-xs"
                >
                  {room.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
            <div className="join">
              <CardTitle className="text-base sm:text-lg font-semibold line-clamp-1">
                {canJoin && joined === false ? <JoinRoom id={room.id} /> : null}
                {canJoin && joined ? (
                  <Badge variant={"secondary"} className="px-2 py-0.5 text-xs">
                    Joined
                  </Badge>
                ) : null}
              </CardTitle>
            </div>
          </div>
        </div>
        <CardDescription className="text-sm line-clamp-2">
          {room.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow p-4 pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 flex-shrink-0" />
            {room.participants.length === 1 ? (
              <span className="truncate">
                {room.participants.length} participant
              </span>
            ) : (
              <span className="truncate">
                {room.participants.length} participants
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageCircle className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">0 messages</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Crown className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">Unknown</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">
              {formatDistanceToNow(room.createdAt)} ago
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground sm:col-span-2">
            <Activity className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">No recent activity</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
