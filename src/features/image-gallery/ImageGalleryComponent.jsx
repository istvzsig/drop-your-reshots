/* eslint-disable react/prop-types */
import { useState } from "react";
import { useImages } from "../../hooks";
import { ShuffleButton, ImagesGallery } from "./components";
import "./image-gallery-component.css";

export default function ImageGalleryComponent() {
  const images = useImages();
  const [isShuffled, setIsShuffled] = useState(false);

  return (
    <div className="gallery">
      <ShuffleButton setIsShuffled={setIsShuffled} />
      <ImagesGallery images={images} isShuffled={isShuffled} />
    </div>
  );
}
