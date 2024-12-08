"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { api, createRoomRoute } from "@/apis/api";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

interface RoomDetails {
  name: string;
  description: string;
  duration: number;
  features: {
    video: boolean;
  };
}

export function CreateRoom() {
  const router = useRouter();
  const { toast } = useToast();
  const [roomDetails, setRoomDetails] = useState<RoomDetails>({
    name: "",
    description: "",
    duration: 0,
    features: {
      video: false,
    },
  });

  const { setPageRefresh } = useAppContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    if (id == "video") {
      const { checked } = e.target;
      setRoomDetails({
        ...roomDetails,
        features: { ...roomDetails.features, [id]: checked },
      });
    } else {
      const { value } = e.target;
      setRoomDetails({ ...roomDetails, [id]: value });
    }
  };

  const handleSubmit = async () => {
    setPageRefresh(true);

    const response = await api.post(createRoomRoute, {
      name: roomDetails.name,
      description: roomDetails.description,
      duration: roomDetails.duration,
      features: {
        video: roomDetails.features.video,
      },
    });
    
    router.push(`/rooms/${response.data.room.id}`);

    toast({
      description: "Your room has been created",
    });
    setPageRefresh(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"default"}>
          <PlusCircle className="mr-2" size={20} />
          Create Room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
          <DialogDescription>
            Make rooms with your colleagues and make your time productive.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              className="col-span-3"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="video" className="text-right">
              Video
            </Label>
            <Input
              type="checkbox"
              id="video"
              defaultValue="false"
              className="col-span-3 h-4 w-4 cursor-pointer" // Smaller checkbox
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duration
            </Label>
            <Input
              id="duration"
              type="number"
              placeholder="Duration (hours)"
              className="col-span-3"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            Create Room
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
