"use client";

import Image from "next/image";


export default function LoginPage() {

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
                    <LoginFormComponent />
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
function LoginFormComponent() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full max-w-[596px] bg-[#1B1B1B] border  rounded-[16px] p-8 shadow-lg border-[#FFFFFF1A] text-[16px] font-semibold leading-[150%]">

            {/* HEADER */}
            <div className="text-center mb-8">
                <h2 className="auth-title">
                    Sign in to Menu Limitless
                </h2>
                <p className="auth-subtitle">
                    Select your role and log in to your account
                </p>
            </div>


            {/* FORM */}
            <form className="mt-6 space-y-5">

                {/* EMAIL */}
                <div>
                    <label className="auth-label">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="auth-input"


                    />
                </div>

                {/* PASSWORD */}
                <div>
                    <label className="auth-label">
                        Password <span className="text-red-500">*</span>
                    </label>

                    <div className="relative mt-1">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="auth-input"
                        />

                        {/* TOGGLE BUTTON */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                            {showPassword ? <EyeOffIcon className="w-4 md:w-6 h-4 md:h-6" /> : <EyeIcon className="w-4 md:w-6 h-4 md:h-6" />}
                        </button>
                    </div>
                </div>

                {/* REMEMBER + FORGOT */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                    <label className="flex items-center gap-2 cursor-pointer">
                        {/* <input type="checkbox" className="accent-white" /> */}
                        <Checkbox className="accent-white" />
                        <span className="text-[#FEFEFE50] text-sm font-normal leading-[150%]">Remember me</span>
                    </label>

                    <Link
                        href="/forgot-password"
                        className=" text-white text-sm font-semibold leading-[150%]"
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* BUTTON */}




                <CustomButton variant="auth" size="lg" fullWidth>
                    Log in
                </CustomButton>
            </form>
        </div>
    )
}
