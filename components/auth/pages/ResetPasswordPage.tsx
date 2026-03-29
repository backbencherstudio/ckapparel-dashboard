"use client";

import Image from "next/image";

export default function ResetPasswordPage() {

    return (
        <div className="bg-black">

            <div className="flex h-screen flex-col lg:flex-row bg-black max-w-[1440px] mx-auto">

                {/* LEFT SIDE - IMAGE */}
                <div className="hidden lg:block flex-1 relative h-screen bg-red-300 max-w-[678px]">
                    <Image
                        src="/images/auth/login4.png"
                        alt="Login background"
                        fill
                        priority
                        className="object-cover"
                    />
                </div>



                {/* RIGHT SIDE */}
                <div className="flex flex-1 items-center justify-center px-6 max-w-[762px]">

                    {/* CARD */}
                    <ResetPasswordForm />
                </div>
            </div>
        </div>
    );
}




import CustomButton from '../../reuseable/CustomButton'
import { EyeOffIcon, EyeIcon } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
function ResetPasswordForm() {
    const [showPassword, setShowPassword] = useState(false);
  
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      router.push('/success');
    };

    return (
      <div className="w-full max-w-[596px] bg-[#1B1B1B] border rounded-[16px] p-8 shadow-lg border-[#FFFFFF1A] hover:border-[#F6D642]/40 transition">
  
        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="auth-title">Create your new password</h2>
          <p className="auth-subtitle">
            Enter your new password to reset your account
          </p>
        </div>
  
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
  
          {/* PASSWORD */}
          <div>
            <label className="auth-label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="auth-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
  
            {/* RULES */}
            <ul className="text-xs text-red-400 mt-2 space-y-1">
              <li>* At least 1 letter, 1 number and 8+ characters</li>
            </ul>
          </div>
  
          {/* CONFIRM PASSWORD */}
          <div>
            <label className="auth-label">Confirm New Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="auth-input"
            />
  
            <ul className="text-xs text-neutral-500 mt-2 space-y-1">
              <li>• Use special character</li>
              <li>• Use numeric</li>
              <li>• Use uppercase and lowercase</li>
            </ul>
          </div>
  
          <CustomButton variant="auth" size="lg" fullWidth>
            Save
          </CustomButton>
        </form>
      </div>
    );
  }