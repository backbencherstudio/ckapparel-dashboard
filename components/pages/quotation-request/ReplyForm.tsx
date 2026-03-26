"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Upload, Mail } from "lucide-react";
import FormInput from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";

// const schema = z.object({
//   fullName: z.string().min(1),
//   email: z.string().email(),
//   message: z.string().min(1),
//   file: z.any().optional(),
// });

const schema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(1, "Message is required"),
    file: z.any().optional(), // For the file upload
  });

type FormValues = z.infer<typeof schema>;

interface QuotationReplyFormProps {
  defaultData?: Partial<FormValues>;
  onSubmit: (data: FormValues) => void;
  onCancel: () => void;
}

export default function QuotationReplyForm({ defaultData, onSubmit, onCancel }: QuotationReplyFormProps) {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: defaultData?.fullName ?? "",
      email: defaultData?.email ?? "",
      message: defaultData?.message ?? "",
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Read-only Info from the original request */}
        <FormInput name="fullName" label="Full Name" />
        <FormInput name="email" label="Email" />
        <FormTextarea name="message" label="Message" rows={4} />

        {/* File Upload Section */}
        <div className="space-y-2">
          <label className="text-white text-sm font-medium mb-3 block">Upload file (optional)</label>
          <div 
            className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input 
              id="file-upload"
              type="file" 
              className="hidden" 
              onChange={(e) => methods.setValue('file', e.target.files?.[0])}
            />
            <Upload className="text-neutral-500 group-hover:text-white mb-4" size={32} />
            <p className="text-neutral-400 text-sm text-center">
              Drag and drop your file here, or <span className="text-white">click to browse</span>
            </p>
            <p className="text-neutral-500 text-xs mt-1">Supports CSV, XLSX (max 10MB)</p>
            
            <button 
              type="button"
              className="mt-4 px-4 py-1.5 border border-white rounded-lg text-white text-sm font-medium hover:bg-white hover:text-black transition-all"
            >
              Choose file
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-lg border border-white text-white text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors"
          >
            <Mail size={18} />
            Send Email
          </button>
        </div>
      </form>
    </FormProvider>
  );
}