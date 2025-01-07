import React from 'react';
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
    removedBgImageUrl,
}) => {
    return (
        <div className="relative w-full lg:w-2/3 h-[600px] preview-container">
            <div className="relative w-full h-full preview-image">
                {/* Base Image */}
                <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-full object-contain"
                />
                
                {/* Text Overlay */}
                {textSets.map((textSet) => (
                    <div
                        key={textSet.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                            top: `${50 - textSet.top}%`,
                            left: `${textSet.left + 50}%`,
                            transform: `translate(-50%, -50%) rotate(${textSet.rotation}deg)`,
                        }}
                    >
                        <div
                            style={{
                                fontFamily: textSet.fontFamily,
                                fontSize: `${textSet.fontSize}px`,
                                fontWeight: textSet.fontWeight,
                                color: textSet.color,
                                opacity: textSet.opacity,
                                textShadow: textSet.shadowSize > 0
                                    ? `${textSet.shadowSize}px ${textSet.shadowSize}px ${textSet.shadowSize}px ${textSet.shadowColor}`
                                    : 'none',
                            }}
                        >
                            {textSet.text}
                        </div>
                    </div>
                ))}

                {/* Background-Removed Image Overlay */}
                {removedBgImageUrl && (
                    <img
                        src={removedBgImageUrl}
                        alt="No Background"
                        className="absolute top-0 left-0 w-full h-full object-contain z-10"
                    />
                )}
            </div>

            {/* Processing Indicator */}
            {isProcessing && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white">Processing...</div>
                </div>
            )}
        </div>
    );
};
