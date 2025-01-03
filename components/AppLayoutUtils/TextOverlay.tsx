import { TextSet } from '@/types';
import React from 'react';

interface TextOverlayProps {
    textSet: TextSet;
}

export const TextOverlay: React.FC<TextOverlayProps> = ({ textSet }) => {
    return (
        <div
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
                textShadow: textSet.shadowSize > 0 ? 
                    `${textSet.shadowSize}px ${textSet.shadowSize}px ${textSet.shadowSize}px ${textSet.shadowColor}` : 
                    'none'
            }}
        >
            {textSet.text}
        </div>
    );
};