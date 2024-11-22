import { useState, useEffect } from "react";
import { EVENT_NAMES } from "../conts";
import { getImagesFromIndexedDb } from "../db/indexedDB";

export function useImages() {
  const [images, setImages] = useState([]);

  async function handleShuffleImages() {
    const shuffled = [...images];
    let len = shuffled.length;

    while (len--) {
      const r = (Math.random() * images.length) | 0;
      [shuffled[len], shuffled[r]] = [shuffled[r], shuffled[len]];
    }

    return shuffled;
  }

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

  return { images, handleShuffleImages };
}
