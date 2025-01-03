import React from 'react';
import { TextSet } from '@/types';
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface TextCustomizerProps {
    textSet: TextSet;
    handleAttributeChange: (id: number, attribute: string, value: any) => void;
    removeTextSet: (id: number) => void;
    duplicateTextSet: (textSet: TextSet) => void;
}

const TextCustomizer: React.FC<TextCustomizerProps> = ({
    textSet,
    handleAttributeChange,
    removeTextSet,
    duplicateTextSet
}) => {
    return (
        <AccordionItem value={`item-${textSet.id}`} className="border rounded-lg mb-2">
            <AccordionTrigger className="px-4">Text Set {textSet.id}</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                    <div>
                        <Label>Text Content</Label>
                        <Input
                            value={textSet.text}
                            onChange={(e) => handleAttributeChange(textSet.id, 'text', e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label>Font Family</Label>
                        <select
                            value={textSet.fontFamily}
                            onChange={(e) => handleAttributeChange(textSet.id, 'fontFamily', e.target.value)}
                            className="w-full mt-1 p-2 border rounded-md bg-transparent"
                        >
                            <option value="Inter">Inter</option>
                            <option value="Arial">Arial</option>
                            <option value="Times New Roman">Times New Roman</option>
                        </select>
                    </div>

                    <div>
                        <Label>Color</Label>
                        <Input
                            type="color"
                            value={textSet.color}
                            onChange={(e) => handleAttributeChange(textSet.id, 'color', e.target.value)}
                            className="mt-1 h-10"
                        />
                    </div>

                    <div>
                        <Label>Font Size ({textSet.fontSize}px)</Label>
                        <Slider
                            value={[textSet.fontSize]}
                            onValueChange={(value) => handleAttributeChange(textSet.id, 'fontSize', value[0])}
                            min={10}
                            max={200}
                            step={1}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label>Font Weight ({textSet.fontWeight})</Label>
                        <Slider
                            value={[textSet.fontWeight]}
                            onValueChange={(value) => handleAttributeChange(textSet.id, 'fontWeight', value[0])}
                            min={100}
                            max={900}
                            step={100}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label>Position Top ({textSet.top}%)</Label>
                        <Slider
                            value={[textSet.top]}
                            onValueChange={(value) => handleAttributeChange(textSet.id, 'top', value[0])}
                            min={-100}
                            max={100}
                            step={1}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label>Position Left ({textSet.left}%)</Label>
                        <Slider
                            value={[textSet.left]}
                            onValueChange={(value) => handleAttributeChange(textSet.id, 'left', value[0])}
                            min={-100}
                            max={100}
                            step={1}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label>Rotation ({textSet.rotation}°)</Label>
                        <Slider
                            value={[textSet.rotation]}
                            onValueChange={(value) => handleAttributeChange(textSet.id, 'rotation', value[0])}
                            min={-180}
                            max={180}
                            step={1}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label>Opacity ({(textSet.opacity * 100).toFixed(0)}%)</Label>
                        <Slider
                            value={[textSet.opacity]}
                            onValueChange={(value) => handleAttributeChange(textSet.id, 'opacity', value[0])}
                            min={0}
                            max={1}
                            step={0.01}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label>Shadow Size ({textSet.shadowSize}px)</Label>
                        <Slider
                            value={[textSet.shadowSize]}
                            onValueChange={(value) => handleAttributeChange(textSet.id, 'shadowSize', value[0])}
                            min={0}
                            max={20}
                            step={1}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label>Shadow Color</Label>
                        <Input
                            type="color"
                            value={textSet.shadowColor}
                            onChange={(e) => handleAttributeChange(textSet.id, 'shadowColor', e.target.value)}
                            className="mt-1 h-10"
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => duplicateTextSet(textSet)}
                            className="flex-1"
                        >
                            Duplicate
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => removeTextSet(textSet.id)}
                            className="flex-1"
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};

export default TextCustomizer;