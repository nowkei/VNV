import { useEffect, useState } from 'react';

const useImageLoader = (imageUrl: string) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!imageUrl) {
      setImageLoaded(true);
      return () => {};
    }
    const image = new Image();

    const handleImageLoad = () => {
      setImageLoaded(true);
    };

    image.addEventListener('load', handleImageLoad);
    image.src = imageUrl;

    return () => {
      // Clean up the event listener to avoid memory leaks
      image.removeEventListener('load', handleImageLoad);
    };
  }, [imageUrl]);

  return {
    isImageLoaded: imageLoaded,
  };
};

export default useImageLoader;
