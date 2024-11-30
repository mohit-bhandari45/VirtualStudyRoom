"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="bg-white dark:bg-black border-b border-black/10 dark:border-white/10 shadow-sm sticky top-0 z-50 px-4 py-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="px-0 hover:bg-transparent hover:text-black dark:hover:text-white"
            onClick={() => router.push('/')}
          >
            {/* <Icons.logo className="h-6 w-6" /> */}
          </Button>
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                <CommandItem>Option 1</CommandItem>
                <CommandItem>Option 2</CommandItem>
                <CommandItem>Option 3</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
        <div className="flex items-center space-x-4">
          <Popover>
            {/* <PopoverTrigger>
              <Button variant="ghost" className="px-0 hover:bg-transparent hover:text-black dark:hover:text-white">
                <Icons.language className="h-6 w-6" />
              </Button>
            </PopoverTrigger> */}
            <PopoverContent className="w-56">
              <div className="py-1">
                <CommandItem>English</CommandItem>
                <CommandItem>Spanish</CommandItem>
                <CommandItem>French</CommandItem>
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/avatar.jpg" alt="Grace Stanley" />
                <AvatarFallback>GS</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <CommandList>
                <CommandGroup>
                  <CommandItem>Profile</CommandItem>
                  <CommandItem>Settings</CommandItem>
                  <CommandItem>Logout</CommandItem>
                </CommandGroup>
              </CommandList>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;