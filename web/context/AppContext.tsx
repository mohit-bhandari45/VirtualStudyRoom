"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  salt: string;
  rooms: Room[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  createdById: string;
  createdBy: UserInterface;
  videoChatEnabled: boolean;
  isActive: boolean;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface AppContextType {
  rooms: Room[] | null;
  setRooms: Dispatch<SetStateAction<Room[] | null>>;
  allRooms: Room[] | null;
  setAllRooms: Dispatch<SetStateAction<Room[] | null>>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [rooms, setRooms] = useState<Room[] | null>(null);
  const [allRooms, setAllRooms] = useState<Room[] | null>(null);

  return (
    <AppContext.Provider value={{ rooms, setRooms, allRooms, setAllRooms }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  if (context === null) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
