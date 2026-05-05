"use client";

import Image from "next/image";
import { isDev } from "@/lib/constants/env";

const DEFAULT_VALUES = {
    email: isDev ? "" : "admin@limitless.com",
    password: isDev ? "" : "123456"
}


export default function LoginPage() {

    return (
        <div className="bg-black ">

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




// import CustomButton from '../../reuseable/CustomButton'
// import { EyeOffIcon, EyeIcon } from 'lucide-react'
// import { Checkbox } from '../../ui/checkbox'
// import Link from 'next/link'
import { useState } from 'react'



import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
// import { CustomButton } from "@/components/ui/custom-button";
import Link from "next/link";
import CustomButton from "@/components/reuseable/CustomButton";

interface LoginFormValues {
    email: string;
    password: string;
}

function LoginFormComponent() {
    const router = useRouter();
    const { login, isLoading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginFormValues>({
        defaultValues: {
            ...DEFAULT_VALUES   
        }
    });

    const onSubmit = async (values: LoginFormValues) => {
        try {
            await login(values);
            //   router.push("/");
        } catch (err) {
            setError("root", {
                message: err instanceof Error ? err.message : "Login failed",
            });
        }
    };

    return (
        <div className="w-full max-w-[596px] bg-[#1B1B1B] border rounded-[16px] p-8 shadow-lg border-[#FFFFFF1A] text-[16px] font-semibold leading-[150%] hover:border-[#F6D642]/40 transition">

            {/* HEADER */}
            <div className="text-center mb-8">
                <h2 className="auth-title">Sign in to Menu Limitless</h2>
                <p className="auth-subtitle">Select your role and log in to your account</p>
            </div>

            {/* ROOT ERROR */}
            {errors.root && (
                <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                    {errors.root.message}
                </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">

                {/* EMAIL */}
                <div>
                    <label className="auth-label">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className={`auth-input ${errors.email ? "border-red-500" : ""}`}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                    )}
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
                            className={`auth-input ${errors.password ? "border-red-500" : ""}`}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                        />

                        {/* TOGGLE */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                            {showPassword
                                ? <EyeOffIcon className="w-4 md:w-6 h-4 md:h-6" />
                                : <EyeIcon className="w-4 md:w-6 h-4 md:h-6" />
                            }
                        </button>
                    </div>
                    {errors.password && (
                        <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
                    )}
                </div>

                {/* REMEMBER + FORGOT */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox className="accent-white" />
                        <span className="text-[#FEFEFE50] text-sm font-normal leading-[150%]">
                            Remember me
                        </span>
                    </label>
                    <Link
                        href="/forgot-password"
                        className="text-white text-sm font-semibold leading-[150%]"
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* SUBMIT */}
                <CustomButton
                    variant="auth"
                    size="lg"
                    fullWidth
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Signing in..." : "Log in"}
                </CustomButton>

            </form>
        </div>
    );
}