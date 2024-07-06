import { useState, useEffect } from "react";
import { getImagesFromIndexedDB } from "./indexedDB";

export function useImages() {
  const [images, setImages] = useState([]);

  async function loadImagesFromIndexedDB() {
    const images = await getImagesFromIndexedDB();
    setImages(
      images.map((image) => {
        return {
          id: image.id,
          data: image.data,
        };
      })
    );
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
