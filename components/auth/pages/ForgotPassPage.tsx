"use client";

import Image from "next/image";



export default function ForgotPassPage() {

    return (
        <div className="bg-black">

            <div className="flex h-screen flex-col lg:flex-row bg-black max-w-[1440px] mx-auto">

                {/* LEFT SIDE - IMAGE */}
                <div className="hidden lg:block flex-1 relative h-screen bg-red-300 max-w-[678px]">
                    <Image
                        src="/images/auth/login2.png"
                        alt="Login background"
                        fill
                        priority
                        className="object-cover"
                    />
                </div>



                {/* RIGHT SIDE */}
                <div className="flex flex-1 items-center justify-center px-6 max-w-[762px]">

                    {/* CARD */}
                    <ForgotPasswordForm />
                </div>
            </div>
        </div>
    );
}




import CustomButton from '../../reuseable/CustomButton'
import { EyeOffIcon, EyeIcon } from 'lucide-react'
import { Checkbox } from '../../ui/checkbox'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
function ForgotPasswordForm() {

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      router.push('/verify-otp');
    };

    return (
      <div className="w-full max-w-[596px] bg-[#1B1B1B] border rounded-[16px] p-8 shadow-lg border-[#FFFFFF1A] hover:border-[#F6D642]/40 transition">
  
        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="auth-title">Forgot Password</h2>
          <p className="auth-subtitle">
            Enter your registered email address, we’ll send you a code to reset your password.
          </p>
        </div>
  
        {/* FORM */}
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="auth-label">Email Address</label>
            <input
              type="email"
              placeholder="jo********@gmail.com"
              className="auth-input"
            />
          </div>
  
          <CustomButton variant="auth" size="lg" fullWidth>
            Send OTP
          </CustomButton>
        </form>
      </div>
    );
  }
