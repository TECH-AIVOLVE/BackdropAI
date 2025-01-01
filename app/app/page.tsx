'use client'

import React, { useRef, useState } from 'react';
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

const Page = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isImageSetupDone, setIsImageSetupDone] = useState<boolean>(false);
    const [removedBgImageUrl, setRemovedBgImageUrl] = useState<string | null>(null);
    const [textSets, setTextSets] = useState<Array<any>>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleUploadImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            await setupImage(imageUrl);
        }
    };

    const setupImage = async (imageUrl: string) => {
        try {
            const imageBlob = await removeBackground(imageUrl);
            const url = URL.createObjectURL(imageBlob);
            setRemovedBgImageUrl(url);
            setIsImageSetupDone(true);
        } catch (error) {
            console.error(error);
        }
    };

    const addNewTextSet = () => {
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
    };

    const handleAttributeChange = (id: number, attribute: string, value: any) => {
        setTextSets(prev => prev.map(set =>
            set.id === id ? { ...set, [attribute]: value } : set
        ));
    };

    const duplicateTextSet = (textSet: any) => {
        const newId = Math.max(...textSets.map(set => set.id), 0) + 1;
        setTextSets(prev => [...prev, { ...textSet, id: newId }]);
    };

    const removeTextSet = (id: number) => {
        setTextSets(prev => prev.filter(set => set.id !== id));
    };

    const saveCompositeImage = () => {
        if (!canvasRef.current || !isImageSetupDone) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const bgImg = new (window as any).Image();
        bgImg.crossOrigin = "anonymous";
        bgImg.onload = () => {
            canvas.width = bgImg.width;
            canvas.height = bgImg.height;

            ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

            textSets.forEach(textSet => {
                ctx.save(); // Save the current state
                ctx.font = `${textSet.fontWeight} ${textSet.fontSize * 3}px ${textSet.fontFamily}`;
                ctx.fillStyle = textSet.color;
                ctx.globalAlpha = textSet.opacity;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                const x = canvas.width * (textSet.left + 50) / 100;
                const y = canvas.height * (50 - textSet.top) / 100;

                // Move the context to the text position and rotate
                ctx.translate(x, y);
                ctx.rotate((textSet.rotation * Math.PI) / 180); // Convert degrees to radians
                ctx.fillText(textSet.text, 0, 0); // Draw text at the origin (0, 0)
                ctx.restore(); // Restore the original state
            });

            if (removedBgImageUrl) {
                const removedBgImg = new (window as any).Image();
                removedBgImg.crossOrigin = "anonymous";
                removedBgImg.onload = () => {
                    ctx.drawImage(removedBgImg, 0, 0, canvas.width, canvas.height);
                    triggerDownload();
                };
                removedBgImg.src = removedBgImageUrl;
            } else {
                triggerDownload();
            }
        };
        bgImg.src = selectedImage || '';

        function triggerDownload() {
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'text-behind-image.png';
            link.href = dataUrl;
            link.click();
        }
    };

    return (
        <div className='flex flex-col min-h-screen relative bg-black backdrop-blur-lg'>

            {/* Background div */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    className="relative left-[calc(50%-15rem)] aspect-[1155/678] w-[48rem] -translate-x-1/6 rotate-[40deg] bg-gradient-to-tr from-[#FF4D9E] to-[#A349E5] opacity-77 sm:left-[calc(50%-35rem)] sm:w-[80rem]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>

            <div className='w-full py-4 flex items-center justify-between px-10 bg-black/100 text-white fixed top-0 left-0 z-[999] backdrop-blur-lg'>
                <h2 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-4">
                <a href="https://backdrop-ai-one.vercel.app/"> 
                    <img src="Logo.ico" alt="BACKDROP AI Logo" className="h-12" />
                    </a>
                    BACKDROP AI Editor
                </h2>
                <div className='flex gap-4'>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        accept=".jpg, .jpeg, .png"
                    />
                    <Button
                        onClick={handleUploadImage}
                        className="bg-white text-black border border-black hover:bg-black hover:text-white z-[999]"
                    >
                        Upload image
                    </Button>

                    <Avatar>
                        <AvatarImage src="/default-avatar.png" alt="Default Avatar" />
                    </Avatar>
                </div>
            </div>
            <Separator />
            {selectedImage ? (
                <div className='flex flex-row items-start justify-center gap-10 w-full h-auto mt-36 mb-10'>
                    <div className="min-h-[400px] w-full p-4 border border-border rounded-lg relative overflow-hidden flex items-center justify-center bg-black">
                        {isImageSetupDone ? (
                            <Image
                                src={selectedImage}
                                alt="Uploaded"
                                layout="fill"
                                objectFit="contain"
                                objectPosition="center"
                            />
                        ) : (
                            <span className='flex items-center justify-center w-full gap-2 text-white w-screen'><ReloadIcon className='animate-spin' /> Loading, please wait</span>
                        )}
                        {isImageSetupDone && textSets.map(textSet => (
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
                                    opacity: textSet.opacity
                                }}
                            >
                                {textSet.text}
                            </div>
                        ))}
                        {removedBgImageUrl && (
                            <Image
                                src={removedBgImageUrl}
                                alt="Removed bg"
                                layout="fill"
                                objectFit="contain"
                                objectPosition="center"
                                className="absolute top-0 left-0 w-full h-full"
                            />
                        )}
                    </div>
                    <div className='flex flex-col w-full mr-10'>
                        <Button variant={'secondary'} onClick={addNewTextSet}><PlusIcon className='mr-2' /> Add New Text Set</Button>
                        <Accordion type="single" collapsible className="w-full mt-2">
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

                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                        <Button onClick={saveCompositeImage}>
                            Save image
                        </Button>
                    </div>
                </div>
            ) : (
                <div className='flex items-center justify-center min-h-screen w-full bg-black bg-opacity-100 backdrop-blur-lg -z-30'>
                    <h2 className="text-xl font-semibold text-white mb-20">Welcome! Snap, upload, and let the adventure begin!</h2>
                </div>
            )}
            <br />
            <Footer />
        </div>
    );
}

export default Page;
