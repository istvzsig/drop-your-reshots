import { useState } from "react";
import { useImages } from "../../hooks";
import "./drop-zone-component.css";

export default function DropZoneComponent() {
  const [isDragOver, setIsDragOver] = useState(false);
  const images = useImages();

  document.addEventListener("dragover", (event) => {
    event.preventDefault();
    setIsDragOver(true);
  });

  document.addEventListener("dragleave", (event) => {
    event.preventDefault();
    if (event.clientX === 0 && event.clientY === 0) {
      setIsDragOver(false);
    }
  });

  document.addEventListener("drop", (event) => {
    event.preventDefault();
    setIsDragOver(false);
  });

  function onDragOver(event = DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  function onDragLeave(event = DragEvent) {
    event.preventDefault();
    setIsDragOver(false);
  }

  function onDrop(event = DragEvent) {
    event.preventDefault();
    if (event.dataTransfer.files) {
      handleFiles(event.dataTransfer.files);
    }
    setIsDragOver(false);
  }

  function handleFiles(files = FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        saveFile(file);
      }
    }
  }

  function saveFile(file = File) {
    const reader = new FileReader();
    reader.onload = () => {
      const newImage = reader.result;
      if (!images.includes(newImage)) {
        images.unshift(newImage);
        localStorage.setItem("images", JSON.stringify(images));
        window.dispatchEvent(new Event("storage"));
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    isDragOver && (
      <div
        className="drop-zone-overlay"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div>DROP YOUR REACT SHOTS</div>
        <input type="file" multiple hidden />
      </div>
    )
  );
}
