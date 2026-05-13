import Image from "next/image";
import { CheckCheck } from "lucide-react";
import { ChatMessage } from "@/types/chat.types";
import { format } from "date-fns";
import { useAuthStore } from "@/store/authStore";

interface MessageBubbleProps {
  msg: ChatMessage;
}

export default function MessageBubble({ msg }: MessageBubbleProps) {
  const user = useAuthStore((state) => state.user);
  const isSent = msg.senderId === user?.id;

  const time = msg.createdAt ? format(new Date(msg.createdAt), "h:mm a") : "";

  return (
    <div
      className={`flex items-start gap-3 max-w-[80%] ${
        isSent ? "ml-auto flex-row-reverse" : ""
      }`}
    >
      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
        {msg.sender?.avatar ? (
          <Image
            src={msg.sender.avatar}
            alt={msg.sender.name || "User"}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-neutral-700 flex items-center justify-center">
            <span className="text-xs text-white">
              {(msg.sender?.name || "U")[0].toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div className={`flex flex-col ${isSent ? "items-end" : "items-start"}`}>
        <span
          className={`text-xs text-neutral-400 mb-1 block ${
            isSent ? "mr-1" : "ml-1"
          }`}
        >
          {msg.sender?.name || "Unknown"} {time}
        </span>
        <div
          className={`text-sm p-3.5 rounded-2xl ${
            isSent
              ? "bg-[#1a3b66] text-white rounded-tr-sm"
              : "bg-[#1e1e1e] text-neutral-200 rounded-tl-sm"
          }`}
        >
          {msg.content?.text || ""}
          {isSent && msg.status && msg.status !== "PENDING" && (
            <div className="flex justify-end mt-1">
              <span className="text-[10px] text-blue-300 flex items-center gap-1">
                {msg.status || "Sent"} <CheckCheck className="w-3 h-3" />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
