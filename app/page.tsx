'use client';

import React from 'react';
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';
import { HeroImages } from '@/components/hero-images';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { HeroParallaxImages } from '@/components/hero-parallax-images';
import { AdditionalInfo } from '@/components/additional-info';
import Link from 'next/link';
import { TypeAnimation } from "react-type-animation";

const page = () => {
    return (
        <div className="relative isolate pt-14 flex flex-col min-h-screen items-center w-full mt-20 bg-black">
            <header className="w-full py-4 flex items-center justify-between px-10 bg-black/100 text-white fixed top-0 left-0 z-10 backdrop-blur-lg">
                <div className="flex items-center space-x-4">
                    <img src="Logo.ico" alt="BACKDROP AI Logo" className="h-12" />
                    <h1 className="text-2xl font-bold">BACKDROP AI</h1>
                </div>
                <nav>
                    <Link href={'/'} className="text-white hover:text-gray-400 mx-3">Home</Link>
                    <Link href={'/about'} className="text-white hover:text-gray-400 mx-3">About</Link>
                    <Link href={'/contact'} className="text-white hover:text-gray-400 mx-3">Contact</Link>
                </nav>
            </header>

            {/* Background section */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    className="relative left-[calc(50%-15rem)] aspect-[1155/678] w-[48rem] -translate-x-1/6 rotate-[40deg] bg-gradient-to-tr from-[#FF4D9E] to-[#A349E5] opacity-77 sm:left-[calc(50%-35rem)] sm:w-[80rem]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>

            <HeroHighlight>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: [80, -5, 0] }}
                    transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
                    className="text-6xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-bold text-black dark:text-black"
                >
                    <span className="text-white">Create</span>{" "}
                    <Highlight className='text-white'>
                        AI Powered
                    </Highlight>
                    {" "} <span className="text-white">Images</span>
                </motion.h1>
            </HeroHighlight>

            <Link href={'/app'} className='mb-10'>
                <HoverBorderGradient containerClassName="relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-gray-900/50 hover:ring-gray-900/5 bg-white/300 backdrop-blur-md shadow-lg overflow-hidden">
                    Get Started
                </HoverBorderGradient>
            </Link>

            <div className='w-full h-full mt-2'>
                <HeroImages />
                <HeroParallaxImages />
            </div>

            <footer className="w-full bg-black py-6 border-t border-black-500">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <p className="text-center text-white">
      © {new Date().getFullYear()} <Link href={'https://website-lyart-eta-95.vercel.app/'} target="_blank" rel="noopener noreferrer" className='hover:font-bold text-white-500'>AIVOLVE</Link>. All rights reserved.
    </p>
                </div>
            </footer>
        </div>
    );
}

export default page;
