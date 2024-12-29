"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "./ui/wobble-card";

import Link from "next/link";

export function AdditionalInfo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-blue-800 min-h-[500px] lg:min-h-[300px]"
        className="" 
      >
        <Link href={''} target="_blank" rel="noopener noreferrer">
            <div className="max-w-xs">
                <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                    Backdrop AI Placeholder
                </h2>
                <p className="mt-4 text-left  text-base/6 text-neutral-200">
                </p>
            </div>
        </Link>
      </WobbleCard>
      <Link href={'https://x.com'} target="_blank" rel="noopener noreferrer">
        <WobbleCard containerClassName="col-span-1 min-h-[300px]">
                <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                    Share your designs
                </h2>
                <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                    Created a sick text behind image design? Share it! Click on this box.
                </p>
        </WobbleCard>
      </Link>
    </div>
  );
}
