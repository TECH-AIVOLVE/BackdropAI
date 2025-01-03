'use client'

import React, { useRef, useState, useCallback } from 'react';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { removeBackground } from "@imgly/background-removal";
import { PlusIcon, ReloadIcon } from '@radix-ui/react-icons';
import TextCustomizer from '@/components/editor/text-customizer';
import Image from 'next/image';
import { Accordion } from '@/components/ui/accordion';
import Footer from '@/components/footer';
import '@/app/fonts.css'

interface TextSet {
    id: number;
    text: string;
    fontFamily: string;
    top: number;
    left: number;
    color: string;
    fontSize: number;
    fontWeight: number;
    opacity: number;
    shadowColor: string;
    shadowSize: number;
    rotation: number;
}

const Page = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [removedBgImageUrl, setRemovedBgImageUrl] = useState<string | null>(null);
    const [textSets, setTextSets] = useState<TextSet[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());

    const processImage = useCallback(async (file: File) => {
        setIsProcessing(true);
        
        try {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            
            // Process background removal in parallel
            const imageBlob = await removeBackground(imageUrl);
            const removedBgUrl = URL.createObjectURL(imageBlob);
            setRemovedBgImageUrl(removedBgUrl);
            
            // Preload images
            await Promise.all([
                loadAndCacheImage(imageUrl),
                loadAndCacheImage(removedBgUrl)
            ]);
            
            return true;
        } catch (error) {
            console.error('Image processing failed:', error);
            return false;
        } finally {
            setIsProcessing(false);
        }
    }, []);

    const loadAndCacheImage = async (src: string): Promise<HTMLImageElement> => {
        if (imageCache.current.has(src)) {
            return imageCache.current.get(src)!;
        }

        const img = await loadImage(src);
        imageCache.current.set(src, img);
        return img;
    };

    const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
            const img = new (Image as any)();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    };

    const handleUploadImage = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        await processImage(file);
    }, [processImage]);

    const addNewTextSet = useCallback(() => {
        const newId = Math.max(...textSets.map(set => set.id), 0) + 1;
        setTextSets(prev => [...prev, {
            id: newId,
            text: 'Text Here',
            fontFamily: 'Inter',
            top: 0,
            left: 0,
            color: 'black',
            fontSize: 80,
            fontWeight: 800,
            opacity: 1,
            shadowColor: 'rgba(0, 0, 0, 0.8)',
            shadowSize: 4,
            rotation: 0
        }]);
    }, [textSets]);

    const handleAttributeChange = useCallback((id: number, attribute: string, value: any) => {
        setTextSets(prev => prev.map(set =>
            set.id === id ? { ...set, [attribute]: value } : set
        ));
    }, []);

    const duplicateTextSet = useCallback((textSet: TextSet) => {
        const newId = Math.max(...textSets.map(set => set.id), 0) + 1;
        setTextSets(prev => [...prev, { ...textSet, id: newId }]);
    }, [textSets]);

    const removeTextSet = useCallback((id: number) => {
        setTextSets(prev => prev.filter(set => set.id !== id));
    }, []);

    const saveCompositeImage = useCallback(async () => {
        if (!canvasRef.current || !selectedImage) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        try {
            const [bgImg, removedBgImg] = await Promise.all([
                loadAndCacheImage(selectedImage),
                removedBgImageUrl ? loadAndCacheImage(removedBgImageUrl) : Promise.resolve(null)
            ]);

            canvas.width = bgImg.width;
            canvas.height = bgImg.height;
            
            // Draw background
            ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
            
            // Draw text
            textSets.forEach(textSet => {
                ctx.save();
                ctx.font = `${textSet.fontWeight} ${textSet.fontSize * 3}px ${textSet.fontFamily}`;
                ctx.fillStyle = textSet.color;
                ctx.globalAlpha = textSet.opacity;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                const x = canvas.width * (textSet.left + 50) / 100;
                const y = canvas.height * (50 - textSet.top) / 100;

                ctx.translate(x, y);
                ctx.rotate((textSet.rotation * Math.PI) / 180);
                
                // Add shadow if specified
                if (textSet.shadowSize > 0) {
                    ctx.shadowColor = textSet.shadowColor;
                    ctx.shadowBlur = textSet.shadowSize;
                }
                
                ctx.fillText(textSet.text, 0, 0);
                ctx.restore();
            });
            
            // Draw removed background image if available
            if (removedBgImg) {
                ctx.drawImage(removedBgImg, 0, 0, canvas.width, canvas.height);
            }
            
            // Trigger download
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'text-behind-image.png';
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Error saving image:', error);
        }
    }, [selectedImage, removedBgImageUrl, textSets]);

    return (
        <div className='flex flex-col min-h-screen relative bg-black backdrop-blur-lg'>
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    className="relative left-[calc(50%-15rem)] aspect-[1155/678] w-[48rem] -translate-x-1/6 rotate-[40deg] bg-gradient-to-tr from-[#FF4D9E] to-[#A349E5] opacity-77 sm:left-[calc(50%-35rem)] sm:w-[80rem]"
                    style={{
                        clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                    }}
                />
            </div>

            <div className='w-full py-2 flex items-center justify-between px-4 md:px-10 bg-black/100 text-white fixed top-0 left-0 z-[999] backdrop-blur-lg border-b border-white-500'>
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white flex items-center gap-2 md:gap-4">
                    <a href="https://backdrop-ai-one.vercel.app/"> 
                        <img src="Logo.ico" alt="BACKDROP AI Logo" className="h-8 md:h-12" />
                    </a>
                    <span className="hidden sm:inline">BACKDROP AI Editor</span>
                </h2>
                <div className='flex gap-2 md:gap-4 items-center'>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".jpg, .jpeg, .png"
                    />
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
            <Separator />

            {selectedImage ? (
                <div className='flex flex-col lg:flex-row items-start justify-center gap-4 lg:gap-10 w-full min-h-screen mt-20 md:mt-24 px-4 md:px-10 pb-20'>
                    <div className="min-h-[300px] md:min-h-[400px] w-full lg:w-1/2 p-2 md:p-4 border border-border rounded-lg relative overflow-hidden flex items-center justify-center bg-black">
                        {isProcessing ? (
                            <span className='flex items-center justify-center gap-2 text-white'>
                                <ReloadIcon className='animate-spin' /> Processing image...
                            </span>
                        ) : (
                            <>
                                <Image
                                    src={selectedImage}
                                    alt="Uploaded"
                                    layout="fill"
                                    objectFit="contain"
                                    objectPosition="center"
                                    priority
                                />
                                {textSets.map(textSet => (
                                    <div
                                        key={textSet.id}
                                        style={{
                                            position: 'absolute',
                                            top: `${50 - textSet.top}%`,
                                            left: `${textSet.left + 50}%`,
                                            transform: `translate(-50%, -50%) rotate(${textSet.rotation}deg)`,
                                            color: textSet.color,
                                            textAlign: 'center',
                                            fontSize: `${textSet.fontSize}px`,
                                            fontWeight: textSet.fontWeight,
                                            fontFamily: textSet.fontFamily,
                                            opacity: textSet.opacity,
                                            textShadow: textSet.shadowSize > 0 ? `${textSet.shadowSize}px ${textSet.shadowSize}px ${textSet.shadowSize}px ${textSet.shadowColor}` : 'none'
                                        }}
                                    >
                                        {textSet.text}
                                    </div>
                                ))}
                                {removedBgImageUrl && (
                                    <Image
                                        src={removedBgImageUrl}
                                        alt="Removed background"
                                        layout="fill"
                                        objectFit="contain"
                                        objectPosition="center"
                                        className="absolute top-0 left-0 w-full h-full"
                                        priority
                                    />
                                )}
                            </>
                        )}
                    </div>

                    <div className='w-full lg:w-1/2 bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-white/10'>
                        <Button variant={'secondary'} onClick={addNewTextSet} className="w-full mb-4">
                            <PlusIcon className='mr-2' /> Add New Text Set
                        </Button>
                        <Accordion type="single" collapsible className="w-full">
                            {textSets.map(textSet => (
                                <TextCustomizer
                                    key={textSet.id}
                                    textSet={textSet}
                                    handleAttributeChange={handleAttributeChange}
                                    removeTextSet={removeTextSet}
                                    duplicateTextSet={duplicateTextSet}
                                />
                            ))}
                        </Accordion>
                        {textSets.length > 0 && (
                            <Button onClick={saveCompositeImage} className="w-full mt-4">
                                Save image
                            </Button>
                        )}
                    </div>
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                </div>
            ) : (
                <div className='flex items-center justify-center min-h-screen w-full bg-black bg-opacity-100 backdrop-blur-lg -z-30'>
                    <h2 className="text-lg md:text-xl font-semibold text-white mb-20 px-4 text-center">
                        Welcome! Snap, upload, and let the adventure begin!
                    </h2>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Page;