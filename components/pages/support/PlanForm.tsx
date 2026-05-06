"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import FormInput from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { useGetSupportPlansTypes } from "@/hooks/useSupport";

const schema = z.object({
  planTypeId: z.string().min(1, "Plan type is required"),
  category: z.string().min(1, "Category is required"),
  title: z.string().min(1, "Plan title is required"),
  description: z.string().min(1, "Description is required"),
  distance: z.string().optional(),
  resourceFile: z
    .any()
    .optional()
    .refine(
      (file) =>
        !file ||
        file instanceof File &&
          [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(file.type),
      "Only PDF, DOC, or DOCX files are allowed"
    ),
});

type FormValues = z.infer<typeof schema>;

interface CreateSupportPlanFormProps {
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  mode?: "create" | "edit";
  defaultData?: Partial<{
    planTypeId: string;
    category: string;
    title: string;
    description: string;
    distance: string;
  }>;
}

export default function PlanForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
  mode = "create",
  defaultData,
}: CreateSupportPlanFormProps) {
  const { data: planTypesData, isLoading: isLoadingPlanTypes } = useGetSupportPlansTypes();
  const planTypes = planTypesData || [];

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      planTypeId: defaultData?.planTypeId ?? "",
      category: defaultData?.category ?? "",
      title: defaultData?.title ?? "",
      description: defaultData?.description ?? "",
      distance: defaultData?.distance ?? "",
      resourceFile: undefined,
    },
  });

  useEffect(() => {
    methods.reset({
      planTypeId: defaultData?.planTypeId ?? "",
      category: defaultData?.category ?? "",
      title: defaultData?.title ?? "",
      description: defaultData?.description ?? "",
      distance: defaultData?.distance ?? "",
      resourceFile: undefined,
    });
  }, [defaultData, methods]);

  const categoryOptions = [
    { label: "Running", value: "RUNNING" },
    { label: "HIIT", value: "HIIT" },
    { label: "Cycling", value: "CYCLING" },
    { label: "Swimming", value: "SWIMMING" },
  ];

  // category must be one of the following values: RUNNING, CYCLING, SWIMMING, HIIT"
  const handleFormSubmit = (data: FormValues) => {
    const submitData: any = {
      planTypeId: data.planTypeId,
      category: data.category,
      title: data.title,
      description: data.description,
    };
    
    if (data.distance) submitData.distance = Number(data.distance);
    if (data.resourceFile) submitData.resource_url = data.resourceFile;
    
    onSubmit(submitData);
  };

  if (isLoadingPlanTypes) {
    return (
      <div className="space-y-5">
        <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-24 bg-gray-700 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)} className="space-y-5">
        
        <FormSelect
          name="planTypeId"
          label="Plan Type"
          placeholder="Select plan type"
          options={planTypes}
        />

        <FormSelect
          name="category"
          label="Category"
          placeholder="Select category"
          options={categoryOptions}
        />

        <FormInput 
          name="title" 
          label="Plan Title" 
          placeholder="Enter plan title" 
        />

        <div className="space-y-2">
          <label className="text-white text-sm font-medium block">Description</label>
          <textarea
            {...methods.register("description")}
            placeholder="Enter plan description"
            rows={3}
            className="w-full bg-[#1f1f1f] border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#F6D642] resize-none"
          />
          {methods.formState.errors.description && (
            <p className="text-red-500 text-xs">{methods.formState.errors.description.message}</p>
          )}
        </div>

        <FormInput 
          name="distance" 
          label="Distance (meters)" 
          placeholder="Enter distance in meters"
          type="number"
        />

        <div className="space-y-2">
          <label className="text-white text-sm font-medium block">Resource File (PDF/DOC)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => methods.setValue("resourceFile", e.target.files?.[0])}
            className="w-full bg-[#1f1f1f] border border-white/20 rounded-lg px-3 py-2 text-white file:mr-3 file:rounded-md file:border-0 file:bg-white file:px-3 file:py-1 file:text-sm file:font-medium file:text-black"
          />
          {methods.formState.errors.resourceFile && (
            <p className="text-red-500 text-xs">{String(methods.formState.errors.resourceFile.message)}</p>
          )}
        </div>

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
            disabled={isSubmitting}
            className="px-8 py-2 rounded-lg bg-white text-black text-sm font-bold hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? `${mode === "edit" ? "Updating" : "Creating"}...` : `${mode === "edit" ? "Update Plan" : "Create Plan"}`}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}