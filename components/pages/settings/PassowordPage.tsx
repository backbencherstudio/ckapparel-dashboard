"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "@/components/form/form-input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// ── Schema ────────────────────────────────────────────────────────────────────
const schema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[0-9]/, "Must include a number")
      .regex(/[^a-zA-Z0-9]/, "Must include a special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

// ── Password Field with toggle ────────────────────────────────────────────────
function PasswordInput({
  name,
  label,
}: {
  name: keyof FormValues;
  label: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <FormInput
        name={name}
        label={label}
        labelClassName="text-white after:content-['*'] after:text-red-500 after:ml-1"
        type={show ? "text" : "password"}
        placeholder="••••••••••"
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="absolute right-3 top-[44px] text-white/30 hover:text-white/60 transition-colors"
        tabIndex={-1}
      >
        {show ? <Eye size={16} /> : <EyeOff size={16} />}
      </button>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function PasswordPage() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValues) => {
    // TODO: replace with your real API call e.g. await changePassword(data)
    await new Promise((r) => setTimeout(r, 800));
    console.log("Password changed:", data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 border border-white/10 bg-white/5 p-6 rounded-xl"
      >
        {/* ── Title ── */}
        <div>
          <h3 className="text-white text-xl font-semibold">Change Password</h3>
          <p className="text-white/40 text-xs mt-1">
            Choose a strong password with at least 8 characters, a number, and a symbol.
          </p>
        </div>

        {/* ── Fields ── */}      
        <div className="flex flex-col gap-5">
          <PasswordInput name="oldPassword" label="Old Password" />
          <PasswordInput name="newPassword" label="New Password" />
          <PasswordInput name="confirmPassword" label="Confirm Password" />

        
        </div>

        {/* ── Actions ── */}
        <div className="flex justify-end items-center gap-3">
          <button
            type="button"
            disabled={!isDirty}
            onClick={() => reset()}
            className="px-5 py-2 rounded-lg border border-white/10 text-white text-sm font-medium hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className="px-5 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}