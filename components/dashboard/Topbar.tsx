"use client";
import { Bell, Menu } from 'lucide-react';

type Props = {
  name: string;
  onMenuClick: () => void;
};

export const Topbar = ({ name, onMenuClick }: Props) => {

    return (    
        <header className="h-19.5 bg-[#161616] border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={onMenuClick} className="md:hidden p-1.5 rounded-md hover:bg-gray-100">
          <Menu className="w-5 h-5" />
        </button>
        <div className="min-w-0">
          <p className="text-gray-500 text-xs truncate">Welcome back,</p>
          <p className="font-semibold text-sm truncate">{name}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search"
          className="hidden md:block border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 w-48"
        />
        <div className="bg-gray-100 rounded-xl">
          {/* <SwitchLanguage /> */}
        </div>
        <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
          <Bell className="w-4 h-4" />
        </button>
      </div>
    </header>
  );    
};