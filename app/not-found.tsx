"use client"

import Link from 'next/link';
import React from 'react';
import { MoveLeft } from 'lucide-react'; // Assuming you use lucide-react
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    const router = useRouter()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] text-white px-4">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[120px] pointer-events-none" />

      <div className="relative text-center space-y-6 max-w-md">
        {/* Large Error Code */}
        <h1 className="text-9xl font-black tracking-tighter text-neutral-500 select-none">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Off Track!
          </h2>
          <p className="text-neutral-400 text-lg">
            The page you're looking for doesn't exist or has been moved to a different route.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-all active:scale-95"
          >
            <MoveLeft size={18} />
            Back to Dashboard
          </Link>
          {/* <Button
            onClick={() => router.back()} 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-all active:scale-95"
          >
            <MoveLeft size={18} />
            Go Back
          </Button> */}
        </div>

        {/* Subtle Footer Link */}
        <p className="text-xs text-neutral-600 pt-8 uppercase tracking-widest">
          Error Reference: #404_NOT_FOUND
        </p>
      </div>
    </div>
  );
}