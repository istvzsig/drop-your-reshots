import { useState, useEffect } from "react";

function useImages() {
  const [images, setImages] = useState([]);

  function loadImagesFromLocalStorage() {
    const images = window.localStorage.getItem("images");
    setImages(images ? JSON.parse(images) : []);
  }

  function handleLocalStoreChange() {
    loadImagesFromLocalStorage();
  }

  useEffect(() => {
    loadImagesFromLocalStorage();
    window.addEventListener("storage", handleLocalStoreChange);
    return () => {
      window.removeEventListener("storage", handleLocalStoreChange);
    };
  }, []);

  return images;
}

export { useImages };
