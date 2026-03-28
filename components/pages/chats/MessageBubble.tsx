import Image from "next/image";
import { CheckCheck } from "lucide-react";
import { Message } from "./chat";



export default function MessageBubble({ msg }: { msg: Message }) {
  return (
    <div
      className={`flex items-start gap-3 max-w-[80%] ${
        msg.isSent ? "ml-auto flex-row-reverse" : ""
      }`}
    >
      <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
        <Image
          src={msg.avatar}
          alt={msg.sender}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className={`flex flex-col ${msg.isSent ? "items-end" : "items-start"}`}>
        <span
          className={`text-xs text-neutral-400 mb-1 block ${
            msg.isSent ? "mr-1" : "ml-1"
          }`}
        >
          {msg.sender} {msg.time}
        </span>
        <div
          className={`text-sm p-3.5 rounded-2xl ${
            msg.isSent
              ? "bg-[#1a3b66] text-white rounded-tr-sm"
              : "bg-[#1e1e1e] text-neutral-200 rounded-tl-sm"
          }`}
        >
          {msg.text}
          {msg.isSent && (
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