import { useState } from "react";
import { useImages } from "../../hook/hooks";
import "./image-gallery-component.css";

import ImageComponent from "../../components/Image/ImageComponent";
import ShuffleButton from "../../components/ShuffleButton/SuffleButtonComponent";

export default function ImageGallery() {
  const [isShuffled, setIsShuffled] = useState(false);
  const images = useImages();

  return (
    <div className="gallery">
      {/* <ShuffleButton setIsShuffled={setIsShuffled} /> */}
      {images.map((image) => {
        if (isShuffled) {
          for (let i = 0; i < images.length; ++i) {
            const r = (Math.random() * images.length) | 0;
            [images[i], images[r]] = [images[r], images[i]];
          }
        }
        return <ImageComponent key={image.id} data={image.data} />;
      })}
    </div>
  );
}
