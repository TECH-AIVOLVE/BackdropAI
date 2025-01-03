import React from 'react';
import { Button } from '@/components/ui/button';
import { Accordion } from '@/components/ui/accordion';
import { PlusIcon } from '@radix-ui/react-icons';
import TextCustomizer from './text-customizer';
import { TextSet } from '@/types';

interface EditorPanelProps {
    textSets: TextSet[];
    addNewTextSet: () => void;
    handleAttributeChange: (id: number, attribute: string, value: any) => void;
    removeTextSet: (id: number) => void;
    duplicateTextSet: (textSet: TextSet) => void;
    saveCompositeImage: () => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
    textSets,
    addNewTextSet,
    handleAttributeChange,
    removeTextSet,
    duplicateTextSet,
    saveCompositeImage
}) => {
    return (
        <div className='w-full lg:w-1/2 bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-white/10 bg-white'>
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
    );
};
