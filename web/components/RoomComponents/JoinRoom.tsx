import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api, joinRoomRoute } from "@/apis/api";
import { useAppContext } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function JoinRoom({ id }: { id: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const { setPageRefresh } = useAppContext();
  const dv = `http://localhost:8000/api/room/join/${id}`;

  const handleJoinRoom = async () => {
    setPageRefresh(true);
    await api.get(`${joinRoomRoute}/${id}`);
    router.push(`/rooms/${id}`);
    toast({
      description: "Room Joined!",
    });
    setPageRefresh(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Join</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join Room?</DialogTitle>
          <DialogDescription>
            Anyone who has this link can join this room!
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={dv} readOnly />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Copy />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleJoinRoom}>Confirm Join</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
