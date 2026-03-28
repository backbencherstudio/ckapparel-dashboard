

"use client";
import { MoreVertical } from "lucide-react";
import { Group } from "./chat";


export default function ChatHeader({ group }: { group: Group }) {
    return (
        <div className="py-6 border-b border-neutral-800 flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0">
                    <span className="text-black text-[8px] font-bold text-center leading-tight whitespace-pre-line">
                        {group.icon}
                    </span>
                </div>
                <div>
                    <h2 className="text-base font-semibold text-white">{group.title}</h2>
                    <p className="text-xs text-neutral-400">
                        You & {group.members - 1} other members
                    </p>
                </div>
            </div>
            {/* <button className="p-2 hover:bg-neutral-800 rounded-full transition-colors text-neutral-400">
        <MoreVertical className="w-5 h-5" />
      </button> */}
            <GroupOptionsMenu />
        </div>
    );
}





// =================================GROUP OPTIONS =====================================
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const dropdownItemClass = "flex items-center gap-3 px-3 py-2.5 text-sm text-white rounded-lg cursor-pointer hover:bg-neutral-800 focus:bg-neutral-800 focus:text-white"

function GroupOptionsMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-neutral-800 rounded-full transition-colors text-neutral-400 outline-none">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-56 bg-neutral-900 border border-neutral-800 rounded-xl p-1 shadow-xl text-white"
            >
                <DropdownMenuItem
                    className={` ${dropdownItemClass}`}
                    onSelect={() => console.log("Change group photo")}
                >
                    {/* <ImageIcon className="w-4 h-4 text-neutral-400" /> */}
                    Change Group Photo
                </DropdownMenuItem>

                <DropdownMenuItem
                    className={` ${dropdownItemClass}`}
                    onSelect={() => console.log("Change name")}
                >
                    {/* <Pencil className="w-4 h-4 text-neutral-400" /> */}
                    Change Name
                </DropdownMenuItem>

                <DropdownMenuItem
                 className={` ${dropdownItemClass}`}
                    onSelect={() => console.log("Delete conversation")}
                >
                    {/* <Trash2 className="w-4 h-4 text-neutral-400" /> */}
                    Delete Conversation
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-neutral-800 my-1" />

                <DropdownMenuItem
                    className={` ${dropdownItemClass} text-red-500 hover:text-red-600 focus:text-red-600`}
                    onSelect={() => console.log("Block group")}
                >
                    {/* <ShieldOff className="w-4 h-4" /> */}
                    Block Group
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}