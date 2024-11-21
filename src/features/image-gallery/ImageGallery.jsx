import { useState, useRef } from "react";
import { useImages } from "../../hook/hooks";
import "./image-gallery-component.css";
import ImageComponent from "../../components/Image/ImageComponent";
import ShuffleButton from "../../components/ShuffleButton/SuffleButtonComponent";

export default function ImageGallery() {
  const [isShuffled, setIsShuffled] = useState(false);
  const images = useImages();
  const imageRefs = useRef();

  const handleGetChildren = () => {
    return imageRefs.current.map(ref => ref.getData());
    console.log(childrenData);
  };

  return (
    <div ref={imageRefs} className="gallery">
      {/* <ShuffleButton setIsShuffled={setIsShuffled} /> */}
      {images.map((image, index) => {
        if (isShuffled) {
          for (let i = 0; i < images.length; ++i) {
            const r = (Math.random() * images.length) | 0;
            [images[i], images[r]] = [images[r], images[i]];
          }
        }

        return (
          <ImageComponent
            key={image.id}
            id={image.id}
            data={image.data}
            ref={imageRefs.current}
          />
        );
      })}
    </div>
  );
}
