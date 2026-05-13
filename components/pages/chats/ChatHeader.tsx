"use client";
import { ChatConversation } from "@/types/chat.types";
import GroupOptionsMenu from "./GroupOptionsMenu";

export default function ChatHeader({ conversation }: { conversation: ChatConversation }) {
    const initials = conversation.title
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const memberCount = conversation.memberships.length;

    return (
        <div className="py-6 border-b border-neutral-800 flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0">
                    {conversation.avatarUrl ? (
                        <img
                            src={conversation.avatarUrl}
                            alt={conversation.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-black text-[8px] font-bold text-center leading-tight whitespace-pre-line">
                            {initials}
                        </span>
                    )}
                </div>
                <div>
                    <h2 className="text-base font-semibold text-white">{conversation.title}</h2>
                    <p className="text-xs text-neutral-400">
                        {memberCount > 1
                            ? `You & ${memberCount - 1} other members`
                            : "Just you"}
                    </p>
                </div>
            </div>
            <GroupOptionsMenu conversation={conversation} />
        </div>
    );
}