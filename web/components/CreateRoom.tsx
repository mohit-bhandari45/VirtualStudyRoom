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

interface RoomDetails {
  name: string;
  description: string;
  features: {
    video: boolean;
  };
}

export function CreateRoom() {
  const { toast } = useToast();
  const [roomDetails, setRoomDetails] = useState<RoomDetails>({
    name: "",
    description: "",
    features: {
      video: false,
    },
  });

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

  const handleSubmit = () => {
    console.log(roomDetails);
    toast({
      description: "Your room has been created",
    });
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
              defaultValue="Pedro Duarte"
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
              defaultValue="@peduarte"
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
              //   className="col-span-3"
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
