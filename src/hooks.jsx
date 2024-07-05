import { useState, useEffect } from "react";

export function useImages() {
  const [images, setImages] = useState([]);

  function loadImagesFromLocalStorage() {
    const images = window.localStorage.getItem("images");
    setImages(images ? JSON.parse(images) : []);
  }

  useEffect(() => {
    loadImagesFromLocalStorage();
    window.addEventListener("storage", loadImagesFromLocalStorage);
    return () => {
      window.removeEventListener("storage", loadImagesFromLocalStorage);
    };
  }, []);

  return images;
}
