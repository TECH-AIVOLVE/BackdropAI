import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
    handleUploadImage: () => void;
}

export const Header: React.FC<HeaderProps> = ({ handleUploadImage }) => {
    return (
        <div className='w-full py-2 flex items-center justify-between px-4 md:px-10 bg-black/100 text-white fixed top-0 left-0 z-[999] backdrop-blur-lg border-b border-white-500'>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white flex items-center gap-2 md:gap-4">
                <a href="https://backdrop-ai-one.vercel.app/"> 
                    <img src="Logo.ico" alt="BACKDROP AI Logo" className="h-8 md:h-12" />
                </a>
                <span className="hidden sm:inline">BACKDROP AI Editor</span>
            </h2>
            <div className='flex gap-2 md:gap-4 items-center'>
                <Button
                    onClick={handleUploadImage}
                    className="bg-white text-black border border-black hover:bg-black hover:text-white z-[999] text-sm md:text-base px-2 md:px-4"
                >
                    Upload image
                </Button>
                <Avatar className="h-8 w-8 md:h-10 md:w-10">
                    <AvatarImage src="/default-avatar.png" alt="Default Avatar" />
                </Avatar>
            </div>
        </div>
    );
};