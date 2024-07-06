/* eslint-disable react/prop-types */
import { useState } from "react";
import { useImages } from "../../hooks";
import { ShuffleButtonComponent, ImageComponent } from "./components";
import "./image-gallery-component.css";

export default function ImageGalleryComponent() {
  const [isShuffled, setIsShuffled] = useState(false);
  const images = useImages();

  return (
    <div className="gallery">
      <ShuffleButtonComponent setIsShuffled={setIsShuffled} />
      {images.map((image) => {
        if (isShuffled) {
          for (let i = 0; i < images.length; ++i) {
            const r = (Math.random() * images.length) | 0;
            [images[i], images[r]] = [images[r], images[i]];
          }
        }
        return <ImageComponent key={image.id} image={image} />;
      })}
    </div>
  );
}
