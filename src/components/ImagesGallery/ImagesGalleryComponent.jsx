export function ImagesGallery({ images, isShuffled }) {
    if (isShuffled) {
        for (let i = 0; i < images.length; ++i) {
            const r = (Math.random() * images.length) | 0;
            [images[i], images[r]] = [images[r], images[i]];
        }
    }

    function handleOnClick(image) {
        deleteImageByIdFromIndexedDB(image.id);
        window.dispatchEvent(new Event(EVENT_NAMES.STORAGE));
    }

    return images.map((image) => {
        return (
            <div
                key={image.id}
                className="gallery-item"
                onClick={() => handleOnClick(image)}
            >
                <img src={image.data} alt={image.id}></img>
            </div>
        );
    });
}