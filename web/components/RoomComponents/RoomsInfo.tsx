import React from "react";
import { RoomCard } from "./RoomCard";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Room } from "@/context/AppContext";

interface RoomCardProps {
  rooms: Room[] | undefined;
  canJoin: boolean;
}

const RoomsInfo = ({ rooms, canJoin }: RoomCardProps) => {
  return (
    <Carousel>
      <CarouselContent>
        {rooms?.map((room) => (
          <CarouselItem key={room.id} className="basis-1/3 cursor-pointer">
            <RoomCard key={room.id} room={room} canJoin={canJoin} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default RoomsInfo;
