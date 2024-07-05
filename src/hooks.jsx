import { useState, useEffect } from "react";
import { getImages } from "./indexedDB";

export function useImages() {
  const [images, setImages] = useState([]);

  async function loadImagesFromIndexedDB() {
    const images = await getImages();
    setImages(images.map((image) => image.data));
  }

  useEffect(() => {
    loadImagesFromIndexedDB();
    window.addEventListener("storage", loadImagesFromIndexedDB);
    return () => {
      window.removeEventListener("storage", loadImagesFromIndexedDB);
    };
  }, []);

  return images;
}
