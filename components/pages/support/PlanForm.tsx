"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Upload, X } from "lucide-react";
import FormInput from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";

const schema = z.object({
  planTitle: z.string().min(1, "Plan title is required"),
  planSubtitle: z.string().min(1, "Plan subtitle is required"),
  planCategory: z.string().min(1, "Plan category is required"),
  planSubcategory: z.string().min(1, "Plan subcategory is required"),
  file: z.any().optional(),
});

type FormValues = z.infer<typeof schema>;

interface CreateSupportPlanFormProps {
  onSubmit: (data: FormValues) => void;
  onCancel?: () => void;
}

export default function PlanForm({ onSubmit, onCancel }: CreateSupportPlanFormProps) {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      planTitle: "",
      planSubtitle: "",
      planCategory: "",
      planSubcategory: "",
    },
  });

  return (
    // <div className="bg-[#0A0A0A] p-6 rounded-3xl w-full border border-white/10">
    <div>
      {/* Header */}
    

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
          
          <FormInput 
            name="planTitle" 
            label="Plan Title" 
            placeholder="Jackson Graham" 
          />
          
          <FormInput 
            name="planSubtitle" 
            label="Plan Subtitle" 
            placeholder="Jackson Graham" 
          />

          <FormSelect
            name="planCategory"
            label="Plan Category"
            placeholder="Jackson Graham"
            options={[
              { label: "Category 1", value: "cat1" },
              { label: "Category 2", value: "cat2" },
            ]}
          />

          <FormSelect
            name="planSubcategory"
            label="Plan Subcategory"
            placeholder="Jackson Graham"
            options={[
              { label: "Subcategory 1", value: "sub1" },
              { label: "Subcategory 2", value: "sub2" },
            ]}
          />

          {/* File Upload */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium block">Upload file</label>
            <div 
              className="border border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center bg-transparent hover:bg-white/5 transition-all cursor-pointer group"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input 
                id="file-upload"
                type="file" 
                className="hidden" 
                onChange={(e) => methods.setValue('file', e.target.files?.[0])}
              />
              <Upload className="text-white mb-4" size={32} strokeWidth={1.5} />
              <p className="text-neutral-400 text-sm text-center">
                Drag and drop your file here, or <span className="text-white">click to browse</span>
              </p>
              <p className="text-neutral-500 text-xs mt-1">Supports CSV, XLSX (max 10MB)</p>
              
              <button 
                type="button"
                className="mt-4 px-4 py-1.5 border border-white rounded-lg text-white text-sm font-medium"
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
              className="px-8 py-2 rounded-lg border border-white text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2 rounded-lg bg-white text-black text-sm font-bold hover:bg-neutral-200 transition-colors"
            >
              Create Plan
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}