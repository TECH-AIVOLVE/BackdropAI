'use client';

import React, { useRef, useState, useCallback } from 'react';
import { Separator } from '@/components/ui/separator';
import { removeBackground } from "@imgly/background-removal";
import { Header } from '@/components/AppLayoutUtils/Header';
import { ImageEditor } from '@/components/AppLayoutUtils/ImageEditor';
import { EditorPanel } from '@/components/AppLayoutUtils/EditorPanel';
import { loadAndCacheImage } from '@/components/AppLayoutUtils/ImageHelpers';
import { TextSet } from '@/types';
import Footer from '@/components/footer';
import '@/app/fonts.css';

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

            const imageBlob = await removeBackground(imageUrl);
            const removedBgUrl = URL.createObjectURL(imageBlob);
            setRemovedBgImageUrl(removedBgUrl);

            await Promise.all([
                loadAndCacheImage(imageUrl, imageCache.current),
                loadAndCacheImage(removedBgUrl, imageCache.current),
            ]);

            return true;
        } catch (error) {
            console.error('Image processing failed:', error);
            return false;
        } finally {
            setIsProcessing(false);
        }
    }, []);

    const handleUploadImage = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        await processImage(file);
    }, [processImage]);

    const addNewTextSet = useCallback(() => {
        const newId = Math.max(0, ...textSets.map((set) => set.id)) + 1;
        setTextSets((prev) => [
            ...prev,
            {
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
                rotation: 0,
            },
        ]);
    }, [textSets]);

    const handleAttributeChange = useCallback((id: number, attribute: string, value: any) => {
        setTextSets((prev) =>
            prev.map((set) =>
                set.id === id ? { ...set, [attribute]: value } : set
            )
        );
    }, []);

    const duplicateTextSet = useCallback((textSet: TextSet) => {
        const newId = Math.max(0, ...textSets.map((set) => set.id)) + 1;
        setTextSets((prev) => [...prev, { ...textSet, id: newId }]);
    }, [textSets]);

    const removeTextSet = useCallback((id: number) => {
        setTextSets((prev) => prev.filter((set) => set.id !== id));
    }, []);

    const saveCompositeImage = useCallback(async () => {
        if (!canvasRef.current || !selectedImage) return;
    
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
    
        try {
            const previewContainer = document.querySelector('.preview-container');
            const previewWidth = previewContainer?.clientWidth || 1; // Avoid division by 0
            const previewHeight = previewContainer?.clientHeight || 1;
    
            const [bgImg, removedBgImg] = await Promise.all([
                loadAndCacheImage(selectedImage, imageCache.current),
                removedBgImageUrl
                    ? loadAndCacheImage(removedBgImageUrl, imageCache.current)
                    : Promise.resolve(null),
            ]);
    
            // Set canvas size to match the image's native resolution
            canvas.width = bgImg.width;
            canvas.height = bgImg.height;
    
            // Calculate scaling factors
            const scaleX = canvas.width / previewWidth;
            const scaleY = canvas.height / previewHeight;
    
            // Draw Base Image
            ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    
            // Draw Text Sets with scaling
            textSets.forEach((textSet) => {
                ctx.save();
                ctx.font = `${textSet.fontWeight} ${textSet.fontSize * scaleX}px ${textSet.fontFamily}`;
                ctx.fillStyle = textSet.color;
                ctx.globalAlpha = textSet.opacity;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
    
                const x = canvas.width * (textSet.left + 50) / 100;
                const y = canvas.height * (50 - textSet.top) / 100;
    
                ctx.translate(x, y);
                ctx.rotate((textSet.rotation * Math.PI) / 180);
    
                if (textSet.shadowSize > 0) {
                    ctx.shadowColor = textSet.shadowColor;
                    ctx.shadowBlur = textSet.shadowSize * scaleX; // Scale shadow size
                }
    
                ctx.fillText(textSet.text, 0, 0);
                ctx.restore();
            });
    
            // Draw Background-Removed Image (if exists)
            if (removedBgImg) {
                ctx.drawImage(removedBgImg, 0, 0, canvas.width, canvas.height);
            }
    
            // Export Image
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
        <div className="flex flex-col min-h-screen relative bg-black backdrop-blur-lg">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    className="relative left-[calc(50%-15rem)] aspect-[1155/678] w-[48rem] -translate-x-1/6 rotate-[40deg] bg-gradient-to-tr from-[#FF4D9E] to-[#A349E5] opacity-77 sm:left-[calc(50%-35rem)] sm:w-[80rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>

            <Header handleUploadImage={handleUploadImage} />
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept=".jpg, .jpeg, .png"
            />
            <Separator />

            {selectedImage ? (
                <div className="flex flex-col lg:flex-row items-start justify-center gap-4 lg:gap-10 w-full min-h-screen mt-20 md:mt-24 px-4 md:px-10 pb-20">
                    <ImageEditor
                        selectedImage={selectedImage}
                        isProcessing={isProcessing}
                        textSets={textSets}
                        removedBgImageUrl={removedBgImageUrl}
                    />
                    <EditorPanel
                        textSets={textSets}
                        addNewTextSet={addNewTextSet}
                        handleAttributeChange={handleAttributeChange}
                        removeTextSet={removeTextSet}
                        duplicateTextSet={duplicateTextSet}
                        saveCompositeImage={saveCompositeImage}
                    />
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-screen w-full bg-black bg-opacity-100 backdrop-blur-lg -z-30">
                    <h2 className="text-lg md:text-xl font-semibold text-white mb-20 px-4 text-center">
                        Welcome! Snap, upload, and let the adventure begin!
                    </h2>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Page;
