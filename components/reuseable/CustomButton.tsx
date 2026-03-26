import React from "react";
import clsx from "clsx";
import { Button } from "../ui/button";

interface CustomButtonProps {
  children: React.ReactNode;
  variant?: "auth" | "approve" | "reject" | "danger" | "cancel" | "tableAction";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function CustomButton({
  type = "button",
  children,
  variant = "auth",
  size = "md",
  fullWidth = false,
  className,
  onClick,
    ...props
}: CustomButtonProps) {
  const baseStyle =
    "rounded-lg font-semibold transition-all duration-200 flex items-center justify-center cursor-pointer";

  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-5 text-base",
    lg: "h-14 px-6 text-base",
  };

  const variants = {
    auth:
      "bg-[#FBFBFB] text-black hover:bg-[#F6D642]",

    approve:
      "bg-gradient-to-r from-[#5B5FEF] to-[#6E44FF] text-white",

    reject:
      "bg-[#EF4444] text-white",

    danger:
      "bg-[#EF4444] text-white hover:opacity-90",

    cancel:
      "bg-[#E5E5E5] text-black",

    tableAction: "bg-white text-black hover:bg-[#F6D642]",
  };

  return (
    <Button
      className={clsx(
        baseStyle,
        sizes[size],
        variants[variant],
        fullWidth ? "w-full" : "w-auto",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
}