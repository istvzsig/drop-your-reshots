import { useState } from "react";
import { saveImageToIndexedDB } from "../../indexedDB";
import "./drop-zone-component.css";

export default function DropZoneComponent() {
  const [isDragOver, setIsDragOver] = useState(false);

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

  function handleDragOver(event = DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  function handleDragLeave(event = DragEvent) {
    event.preventDefault();
    setIsDragOver(false);
  }

  function handleDrop(event = DragEvent) {
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
        handleSaveFile(file);
      }
    }
  }

  function handleSaveFile(file = File) {
    const reader = new FileReader();
    reader.onload = async () => {
      await saveImageToIndexedDB(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    isDragOver && (
      <div
        className="drop-zone-overlay"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div>DROP YOUR REACT SHOTS</div>
        <input type="file" multiple hidden />
      </div>
    )
  );
}
