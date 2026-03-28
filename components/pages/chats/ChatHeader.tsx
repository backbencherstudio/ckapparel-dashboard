import { MoreVertical } from "lucide-react";
import { Group } from "./chat";


export default function ChatHeader({ group }: { group: Group }) {
  return (
    <div className="py-6 border-b border-neutral-800 flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
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
      <button className="p-2 hover:bg-neutral-800 rounded-full transition-colors text-neutral-400">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>
  );
}