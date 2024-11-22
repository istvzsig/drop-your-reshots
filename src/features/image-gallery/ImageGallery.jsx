import { useState, useRef, useEffect } from "react";
import { useImages } from "../../hook/hooks";

import "./image-gallery-component.css";

import ImageComponent from "../../components/Image/ImageComponent";
import ShuffleButton from "../../components/ShuffleButton/SuffleButtonComponent";

export default function ImageGallery() {
  const { images, handleShuffleImages } = useImages();
  const [shuffledImages, setShuffledImages] = useState(images);
  const imageRefs = useRef();

  function shufffleImages() {
    const shuffled = [...images];
    let len = shuffledImages.length;

    while (len--) {
      const r = (Math.random() * images.length) | 0;
      [shuffled[len], shuffled[r]] = [shuffled[r], shuffled[len]];
    }
    setShuffledImages(shuffled);
  }

  // useEffect(() => {
  //   isShuffled ? shufffleImages() : setShuffledImages(images);
  // }, [isShuffled, images]);

  return (
    <div ref={imageRefs} className="gallery">
      {/* <ShuffleButton handleShuffleImages={handleShuffleImages} /> */}
      {images.map(image => {
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
