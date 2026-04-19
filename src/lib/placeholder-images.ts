import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

/* Array version (for hero sections, galleries, etc.) */
export const PlaceHolderImages: ImagePlaceholder[] =
  data.placeholderImages;

/* Object version (for menu lookup by imageId) */
export const menuImages: Record<string, string> =
  data.placeholderImages.reduce((acc, img) => {
    acc[img.id] = img.imageUrl;
    return acc;
  }, {} as Record<string, string>);
