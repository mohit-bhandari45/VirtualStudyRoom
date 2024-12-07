"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  salt: string;
  roomsCreated: Room[];
  roomsJoined: UserRoom[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  createdById: string;
  participants: UserRoom[];
  videoChatEnabled: boolean;
  isActive: boolean;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRoom {
  id: string;
  userId: string;
  roomId: string;
  joinedAt: Date;
  user: User;
  room: Room;
}

interface AppContextProps {
  rooms: Room[] | undefined;
  setRooms: React.Dispatch<React.SetStateAction<Room[] | undefined>>;
  allRooms: Room[][] | undefined;
  setAllRooms: React.Dispatch<React.SetStateAction<Room[][] | undefined>>;
  pageRefresh: boolean;
  setPageRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [rooms, setRooms] = useState<Room[] | undefined>();
  const [allRooms, setAllRooms] = useState<Room[][] | undefined>();
  const [pageRefresh, setPageRefresh] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        rooms,
        setRooms,
        allRooms,
        setAllRooms,
        pageRefresh,
        setPageRefresh,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
