"use client";

import Image from "next/image";


import CustomButton from "../../reuseable/CustomButton";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../ui/input-otp";
import { useRouter } from "next/navigation";
export default function VerifyOtpPage() {

    return (
        <div className="bg-black">

            <div className="flex h-screen flex-col lg:flex-row bg-black max-w-[1440px] mx-auto">

                {/* LEFT SIDE - IMAGE */}
                <div className="hidden lg:block flex-1 relative h-screen bg-red-300 max-w-[678px]">
                    <Image
                        src="/images/auth/login1.png"
                        alt="Login background"
                        fill
                        priority
                        className="object-cover"
                    />
                </div>



                {/* RIGHT SIDE */}
                <div className="flex flex-1 items-center justify-center px-6 max-w-[762px]">

                    {/* CARD */}
                    <VerifyOtpForm />
                </div>
            </div>
        </div>
    );
}




function VerifyOtpForm() {

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      router.push('/reset-password');
    };
        return (
      <form className="w-full max-w-[596px] bg-[#1B1B1B] border rounded-[16px] p-8 shadow-lg border-[#FFFFFF1A] hover:border-[#F6D642]/40 transition" onSubmit={handleSubmit} noValidate>
  
        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="auth-title">Enter OTP</h2>
          <p className="auth-subtitle">
            We have shared a code to your registered email
            <br />
            <span className="text-white">jo********@gmail.com</span>
          </p>
        </div>
  
        {/* OTP */}
        <form className="flex justify-center mb-6">
          <InputOTP
           maxLength={6}>
            <InputOTPGroup className="gap-3">
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="w-12 h-12 rounded-lg border border-white/20 bg-white/5 text-white text-lg focus:border-[#F6D642]"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </form>
  
        {/* BUTTON */}
        <CustomButton variant="auth" size="lg" fullWidth>
          Verify
        </CustomButton>
  
        {/* RESEND */}
        <p className="text-center text-sm text-neutral-500 mt-4">
          Didn’t receive the code?{" "}
          <button className="text-[#F6D642] font-semibold">
            Resend Code
          </button>{" "}
          (00:59)
        </p>
      </form>
    );
  }