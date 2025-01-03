'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';
import { HeroImages } from '@/components/hero-images';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { HeroParallaxImages } from '@/components/hero-parallax-images';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Page = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuVariants = {
        closed: {
            opacity: 0,
            y: "-100%",
            transition: {
                duration: 0.2
            }
        },
        open: {
            opacity: 1,
            y: "0%",
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <div className="relative isolate pt-14 flex flex-col min-h-screen items-center w-full mt-19 bg-black">
            {/* Fixed Navbar */}
            <header className="w-full py-4 bg-black/95 text-white fixed top-0 left-0 z-50 backdrop-blur-lg border-b border-gray-500">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center relative">
                        <a href="https://backdrop-ai-one.vercel.app/" 
                           className="flex items-center space-x-2">
                            <img src="Logo.ico" alt="BACKDROP AI Logo" className="h-8 sm:h-10" />
                            <span className="text-xl sm:text-2xl font-bold">BACKDROP AI</span>
                        </a>

                        <nav className="hidden md:flex space-x-8">
                            <Link href={'https://website-lyart-eta-95.vercel.app/'} 
                                  className="text-white hover:text-gray-400 transition-colors">
                                Home
                            </Link>
                            <Link href={'https://website-lyart-eta-95.vercel.app/about'} 
                                  className="text-white hover:text-gray-400 transition-colors">
                                About
                            </Link>
                            <Link href="mailto:tech.aivolve@gmail.com" 
                                  className="text-white hover:text-gray-400 transition-colors">
                                Contact
                            </Link>
                        </nav>

                        <button 
                            className="md:hidden z-50 relative"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 bg-black z-40 flex items-center justify-center"
                    >
                        <nav className="flex flex-col items-center space-y-8">
                            <Link href={'https://website-lyart-eta-95.vercel.app/'} 
                                  className="text-2xl text-white hover:text-gray-400 transition-colors"
                                  onClick={() => setIsOpen(false)}>
                                Home
                            </Link>
                            <Link href={'https://website-lyart-eta-95.vercel.app/about'} 
                                  className="text-2xl text-white hover:text-gray-400 transition-colors"
                                  onClick={() => setIsOpen(false)}>
                                About
                            </Link>
                            <Link href="mailto:tech.aivolve@gmail.com" 
                                  className="text-2xl text-white hover:text-gray-400 transition-colors"
                                  onClick={() => setIsOpen(false)}>
                                Contact
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Gradient */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    className="relative left-[calc(50%-11rem)] sm:left-[calc(50%-15rem)] aspect-[1155/678] w-[36rem] sm:w-[48rem] -translate-x-1/6 rotate-[40deg] bg-gradient-to-tr from-[#FF4D9E] to-[#A349E5] opacity-77 sm:w-[80rem]"
                    style={{
                        clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                    }}
                />
            </div>

            {/* Hero Section */}
            <div className="px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
                <HeroHighlight>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: [80, -5, 0] }}
                        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
                        className="text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-5xl mx-auto text-center tracking-tight font-bold text-black dark:text-black relative z-50"
                    >
                        <span className="text-white">Create</span>{" "}
                        <Highlight className="text-white relative">
                            AI Powered
                        </Highlight>
                        {" "} <span className="text-white">Images</span>
                    </motion.h1>
                </HeroHighlight>

                <div className="mt-8 flex justify-center">
                    <Link href={'/app'}>
                        <HoverBorderGradient containerClassName="px-6 sm:px-8 py-1">
                            Get Started
                        </HoverBorderGradient>
                    </Link>
                </div>
            </div>

            {/* Image Sections */}
            <div className='w-full h-full mt-8 sm:mt-12'>
                <HeroImages />
                <HeroParallaxImages />
            </div>

            {/* Footer */}
            <footer className="w-full bg-black py-4 sm:py-6 border-t border-black-500 mt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm sm:text-base text-white">
                        © {new Date().getFullYear()}{" "}
                        <Link href={'https://website-lyart-eta-95.vercel.app/'} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className='hover:font-bold text-white-500'>
                            AIVOLVE
                        </Link>
                        . All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Page;