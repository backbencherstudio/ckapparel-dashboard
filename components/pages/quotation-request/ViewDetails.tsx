"use client";
import { SimpleInput } from "@/components/form/form-input";
import { SimpleTextarea } from "@/components/form/form-textarea";
import { Mail } from "lucide-react";

import { QuotationRequest } from "@/types/quotation.types";

interface ViewDetailsProps {
  selectedAthletes: QuotationRequest | null;
  onClose?: () => void;
  onReply?: () => void;
}

export default function ViewDetails({ selectedAthletes, onClose, onReply }: ViewDetailsProps) {
  if (!selectedAthletes) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* Full Name Field */}
      <div className="flex flex-col gap-2">
       <SimpleInput
          label="Full Name"
          value={selectedAthletes.user_name || "Unknown"}
          inputClassName="flex items-center gap-1 self-stretch border border-[color:var(--Opacity-Grey-Dark-50,rgba(101,104,114,0.50))] [background:var(--color-grey-15,#262626)] px-2 !py-3.5 rounded-lg border-solid focus:border-white/10"
          readOnly
        />
      </div>

      {/* Email Field */}
      <div className="flex flex-col gap-2">
     
       

        <SimpleInput
          label="Email"
          value={selectedAthletes.user_email || selectedAthletes.email}
          inputClassName="flex items-center gap-1 self-stretch border border-[color:var(--Opacity-Grey-Dark-50,rgba(101,104,114,0.50))] [background:var(--color-grey-15,#262626)] px-2 !py-3.5 rounded-lg border-solid focus:border-white/10"
          
          readOnly
        />
      </div>

      {/* Message Field */}
      <div className="flex flex-col gap-2">
       
        <SimpleTextarea
          label="Message"
          value={selectedAthletes.support_needed || ""}
          textareaClassName="flex items-center gap-1 self-stretch border border-[color:var(--Opacity-Grey-Dark-50,rgba(101,104,114,0.50))] [background:var(--color-grey-15,#262626)] px-2 !py-3.5 rounded-lg border-solid focus:border-white/10"
          readOnly
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center gap-3 mt-4">
        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-lg border border-white text-white text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
          onClick={onReply}
        >
          <Mail size={18} />
          Reply
        </button>
      </div>
    </div>
  );
}