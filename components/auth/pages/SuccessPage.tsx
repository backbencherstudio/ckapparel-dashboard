

import Image from "next/image";

export default function SuccessPage() {

    return (
        <div className="bg-black">

            <div className="flex h-screen flex-col lg:flex-row bg-black max-w-[1440px] mx-auto">

                {/* LEFT SIDE - IMAGE */}
                <div className="hidden lg:block flex-1 relative h-screen bg-red-300 max-w-[678px]">
                    <Image
                        src="/images/auth/login5.png"
                        alt="Login background"
                        fill
                        priority
                        className="object-cover"
                    />
                </div>



                {/* RIGHT SIDE */}
                <div className="flex flex-1 items-center justify-center px-6 max-w-[762px]">

                    {/* CARD */}
                    <AuthSuccess />
                </div>
            </div>
        </div>
    );
}


import CustomButton from "@/components/reuseable/CustomButton";
import Link from "next/link";

function AuthSuccess() {
  return (
    <div className="w-full max-w-[596px] bg-[#1B1B1B] border rounded-[16px] p-8 shadow-lg border-[#FFFFFF1A] text-center hover:border-[#F6D642]/40 transition">

      {/* ICON */}
      <div className="flex justify-center mb-6">
        <div className="w-[100px] h-[100px] aspect-square relative">
        <Image src="/images/auth/success-icon.svg" alt="Success" fill className="object-contain" />
          <Image
            src="/images/auth/success-icon.svg" // replace with your icon
            alt="Success"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* TITLE */}
      <h2 className="auth-title">
        Password has been successfully updated
      </h2>

      {/* SUBTITLE */}
      <p className="auth-subtitle mb-8">
        You can now sign in with your new password.
      </p>

      {/* BUTTON */}
      <Link href="/login">
        <CustomButton variant="auth" size="lg" fullWidth>
          Back to Login
        </CustomButton>
      </Link>
    </div>
  );
}

