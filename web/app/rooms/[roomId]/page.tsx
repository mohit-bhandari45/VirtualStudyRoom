"use client";

// import { baseURL } from "@/apis/api";
// import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

// import io from "socket.io-client";
// const socket = io(baseURL);

const RoomPage: React.FC = () => {
  // const { roomId } = useParams();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const getLocalStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setLocalStream(stream);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      return () => {
        localStream?.getTracks().forEach((track) => track.stop());
      };
    };

    getLocalStream();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <video
        ref={localVideoRef}
        autoPlay
        muted
        style={{ width: "200px", height: "150px" }}
        className="rounded-xl"
      ></video>
    </div>
  );
};

export default RoomPage;
