import { useState, useEffect } from "react";
import { EVENT_NAMES } from "../conts";
import { getImagesFromIndexedDb } from "../db/indexedDB";

export function useImages() {
  const [images, setImages] = useState([]);

  async function loadImagesFromIndexedDb() {
    const images = await getImagesFromIndexedDb();
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
    loadImagesFromIndexedDb();
    window.addEventListener(EVENT_NAMES.STORAGE, loadImagesFromIndexedDb);
    return () => {
      window.removeEventListener(EVENT_NAMES.STORAGE, loadImagesFromIndexedDb);
    };
  }, []);

  return images;
}
