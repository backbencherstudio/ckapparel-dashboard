"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "@/components/form/form-input";
import Image from "next/image";
import { useRef, useState } from "react";
import { Camera } from "lucide-react";

// ── Schema ────────────────────────────────────────────────────────────────────
const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName:  z.string().min(1, "Last name is required"),
  phoneNo:   z.string().min(7, "Enter a valid phone number"),
  email:     z.string().email("Enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

// ── Mock existing user data (replace with your API call) ──────────────────────
const EXISTING_USER = {
  firstName: "Josh",
  lastName:  "Cornishbay",
  phoneNo:   "+1 555 000 0000",
  email:     "joshcornishbay@mail.com",
  avatar:    "", // put a real URL here e.g. "/avatars/josh.jpg"
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function GeneralPage() {
  const [preview, setPreview] = useState<string | null>(
    EXISTING_USER.avatar || null
  );

  const fileRef = useRef<HTMLInputElement>(null);

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: EXISTING_USER.firstName,
      lastName:  EXISTING_USER.lastName,
      phoneNo:   EXISTING_USER.phoneNo,
      email:     EXISTING_USER.email,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting },
  } = methods;

  // ── Image upload ─────────────────────────────────────────────────────────
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      alert("Only PNG or JPEG files are allowed.");
      return;
    }

    const img = new window.Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width < 400 || img.height < 400) {
        alert("Image must be at least 400×400px.");
        URL.revokeObjectURL(img.src);
        return;
      }
      setPreview(img.src);
    };
  };

  // ── Submit ───────────────────────────────────────────────────────────────
  const onSubmit = async (data: FormValues) => {
    // TODO: replace with your real API call
    await new Promise((r) => setTimeout(r, 800)); // simulate network
    console.log("Saved:", data);
  };

  // ── Reset to original ────────────────────────────────────────────────────
  const handleReset = () => {
    reset({
      firstName: EXISTING_USER.firstName,
      lastName:  EXISTING_USER.lastName,
      phoneNo:   EXISTING_USER.phoneNo,
      email:     EXISTING_USER.email,
    });
    setPreview(EXISTING_USER.avatar || null);
  };

  // ── Avatar initials fallback ─────────────────────────────────────────────
  const initials =
    `${EXISTING_USER.firstName[0] ?? ""}${EXISTING_USER.lastName[0] ?? ""}`.toUpperCase();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 border border-white/10 bg-white/5 p-6 rounded-xl"
      >
        {/* ── Title ── */}
        <div>
          <h3 className="text-white text-xl font-semibold">My Profile</h3>
          <p className="text-white/40 text-xs mt-1">
            Update your personal information and profile photo.
          </p>
        </div>

        {/* ── Avatar ── */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="relative w-16 h-16 rounded-full overflow-hidden bg-white/10 border border-white/10 shrink-0 group cursor-pointer"
          >
            {preview ? (
              <Image
                src={preview}
                alt={`${EXISTING_USER.firstName} ${EXISTING_USER.lastName}`}
                fill
                className="object-cover"
              />
            ) : (
              // Initials fallback when no photo exists
              <span className="flex items-center justify-center w-full h-full text-white font-semibold text-lg">
                {initials}
              </span>
            )}

            {/* Camera badge — always visible at bottom */}
            <span className="absolute bottom-0 inset-x-0 py-1 bg-black/60 flex items-center justify-center">
              <Camera size={11} className="text-white/70" />
            </span>
          </button>

          {/* Hidden file input */}
          <input
            ref={fileRef}
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={handleImageChange}
          />

          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium">Profile Photo</p>
            <p className="text-white/40 text-xs mt-0.5">
              Min 400×400px · PNG or JPEG
            </p>
          </div>
        </div>

        {/* ── Personal Info Grid ── */}
        <div className="border border-white/10 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
          <FormInput inputClassName="bg-white/10" name="firstName" label="First Name" />
          <FormInput inputClassName="bg-white/10" name="lastName"  label="Last Name" />
          <FormInput inputClassName="bg-white/10" name="phoneNo"   label="Phone Number" />
          <FormInput inputClassName="bg-white/10" name="email"     label="Email Address" />
        </div>

        {/* ── Actions ── */}
        <div className="flex justify-end items-center gap-3">
          <button
            type="button"
            disabled={!isDirty}
            onClick={handleReset}
            className="px-5 py-2 rounded-lg border border-white/10 text-white text-sm font-medium hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className="px-5 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}