import React from 'react';
import Image from 'next/image';
import { ReloadIcon } from '@radix-ui/react-icons';
import { TextOverlay } from './TextOverlay';
import { TextSet } from '@/types';

interface ImageEditorProps {
    selectedImage: string;
    isProcessing: boolean;
    textSets: TextSet[];
    removedBgImageUrl: string | null;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({
    selectedImage,
    isProcessing,
    textSets,
    removedBgImageUrl
}) => {
    return (
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
                        <TextOverlay key={textSet.id} textSet={textSet} />
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
    );
};