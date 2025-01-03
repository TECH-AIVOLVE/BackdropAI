export const loadAndCacheImage = async (src: string, imageCache: Map<string, HTMLImageElement>): Promise<HTMLImageElement> => {
    if (imageCache.has(src)) {
        return imageCache.get(src)!;
    }

    const img = await loadImage(src);
    imageCache.set(src, img);
    return img;
};

const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
};