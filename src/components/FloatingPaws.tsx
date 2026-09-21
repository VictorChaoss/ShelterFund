/* eslint-disable */
// @ts-nocheck
"use client";

import { PawPrint } from 'lucide-react';

export default function FloatingPaws() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Slow drifting paws scattered around the viewport */}
      <PawPrint className="absolute top-[8%] left-[5%] h-5 w-5 text-accent/[0.04] animate-float-diagonal" />
      <PawPrint className="absolute top-[15%] right-[8%] h-7 w-7 text-accent/[0.05] animate-float-slow delay-1000" />
      <PawPrint className="absolute top-[35%] left-[12%] h-4 w-4 text-accent/[0.03] animate-float delay-2000" />
      <PawPrint className="absolute top-[50%] right-[15%] h-6 w-6 text-accent/[0.04] animate-float-diagonal delay-3000" />
      <PawPrint className="absolute top-[70%] left-[8%] h-5 w-5 text-accent/[0.05] animate-float-slow delay-500" />
      <PawPrint className="absolute top-[80%] right-[5%] h-4 w-4 text-accent/[0.03] animate-float delay-700" />
      <PawPrint className="absolute top-[25%] left-[85%] h-6 w-6 text-accent/[0.04] animate-float-diagonal delay-5000" />
      <PawPrint className="absolute top-[60%] left-[90%] h-5 w-5 text-accent/[0.03] animate-float-slow delay-2000" />
      
      {/* Walking paw trail across the bottom */}
      <PawPrint className="absolute bottom-[5%] h-4 w-4 text-accent/[0.06] animate-paw-walk" />
      <PawPrint className="absolute bottom-[8%] h-3 w-3 text-accent/[0.04] animate-paw-walk delay-5000" />
    </div>
  );
}
