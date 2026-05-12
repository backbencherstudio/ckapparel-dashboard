"use client";
import * as React from "react";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import clsx from "clsx";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";

interface ReusableModalProps extends React.ComponentProps<typeof Dialog> {
    onClose?: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
    hideCloseButton?: boolean; // Add this to hide the close button
    closeButtonClassName?: string; // Custom styling for close button
    customCloseButton?: boolean;
}

export default function CustomModal({
    open,
    onOpenChange,
    onClose,
    title,
    children,
    className,
    hideCloseButton = true,
    customCloseButton = false,
}: ReusableModalProps) {
    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen && onClose) {
            onClose();
        }
        onOpenChange?.(newOpen);
    };



    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent
                className={clsx(
                    "w-full sm:max-w-[687px]  self-stretch border [background:var(--Gray-Black-800,#07080B)] p-6 rounded-3xl border-solid border-[#2F2F2F] text-white ",
                    className
                )}

                showCloseButton={!hideCloseButton}
            // closeClassName={closeButtonClassName}
            >
                <DialogDescription className="sr-only">
                    {title || "Modal dialog"}
                </DialogDescription>
                <div className="flex justify-between items-center ">
                    <div className="" >
                        {title && (
                            <DialogTitle className="text-white font-medium leading-[128%] tracking-[-0.36px] text-[24px] ">
                                {title}
                            </DialogTitle>
                        )}
                    </div>
                    {customCloseButton && (
                        <DialogClose asChild>
                            <Button size="icon" className="absolute top-3 right-3 rounded-full border border-white/10 hover:bg-white/20">
                                <XIcon />
                            </Button>
                        </DialogClose>
                    )}
                </div>


                <div className="">


                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}