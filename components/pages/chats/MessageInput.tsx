"use client";

import { Paperclip, ImageIcon, Smile, Send } from "lucide-react";

type Props = {
  value: string;
  onChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function MessageInput({ value, onChange, onSubmit }: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="p-4 bg-[#0a0a0a] border-t border-neutral-800 flex items-center gap-3 flex-shrink-0"
    >
      <button
        type="button"
        className="p-2 text-neutral-400 hover:text-neutral-200 transition-colors"
      >
        <Paperclip className="w-5 h-5" />
      </button>
      <button
        type="button"
        className="p-2 text-neutral-400 hover:text-neutral-200 transition-colors"
      >
        <ImageIcon className="w-5 h-5" />
      </button>

      <div className="flex-1 relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your message..."
          className="w-full bg-[#1e1e1e] text-sm text-neutral-200 rounded-full pl-4 pr-10 py-3 focus:outline-none focus:ring-1 focus:ring-neutral-700 placeholder:text-neutral-500"
        />
        <button
          type="button"
          className="absolute right-3 p-1 text-neutral-400 hover:text-neutral-200 transition-colors"
        >
          <Smile className="w-5 h-5" />
        </button>
      </div>

      <button
        type="submit"
        disabled={!value.trim()}
        className="p-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-full transition-colors flex items-center justify-center flex-shrink-0"
      >
        <Send className="w-4 h-4 ml-0.5" />
      </button>
    </form>
  );
}