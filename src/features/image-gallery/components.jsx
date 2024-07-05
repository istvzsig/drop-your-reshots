import { deleteImageById } from "../../indexedDB.js";

export function ImagesGallery({ images, isShuffled }) {
  if (isShuffled) {
    for (let i = 0; i < images.length; ++i) {
      const r = (Math.random() * images.length) | 0;
      [images[i], images[r]] = [images[r], images[i]];
    }
  }

  function handleOnClick(image) {
    deleteImageById(image.id);
    window.dispatchEvent(new Event("storage"));
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

// eslint-disable-next-line react/prop-types
export function ShuffleButton({ setIsShuffled }) {
  function handleMouseDown(event = MouseEvent) {
    event.stopPropagation();
    setIsShuffled(true);
  }

  function handleMouseUp(event = MouseEvent) {
    event.stopPropagation();
    setIsShuffled(false);
  }
  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="shuffle-button"
    >
      <svg
        width="32px"
        height="32px"
        viewBox="-1 0 20 20"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>spiral [#30]</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="Dribbble-Light-Preview"
            transform="translate(-381.000000, -8039.000000)"
            fill="white"
          >
            <g id="icons" transform="translate(56.000000, 160.000000)">
              <path
                d="M336.622775,7895.01452 C333.022714,7895.3213 329.929083,7892.89808 329.177444,7889.58357 C328.445822,7886.35728 330.675718,7883.02874 333.977526,7883.00969 C336.468644,7882.99565 338.540405,7884.8043 338.941747,7887.1814 C339.245004,7888.98202 338.148072,7890.82275 336.33453,7891.01324 C334.529995,7891.20273 333.0067,7889.7911 333.0067,7888.02256 C333.0067,7887.46914 333.455081,7887.01999 334.007551,7887.01999 C334.560021,7887.01999 335.008402,7887.46914 335.008402,7888.02256 C335.008402,7888.57598 335.456783,7889.02513 336.009253,7889.02513 C336.561723,7889.02513 337.010104,7888.57598 337.010104,7888.02256 C337.010104,7886.25402 335.486809,7884.84239 333.682275,7885.03188 C331.868733,7885.22337 330.7718,7887.0631 331.075058,7888.86372 C331.476399,7891.24183 333.548161,7893.04947 336.039279,7893.03543 C339.341086,7893.01638 341.570982,7889.68784 340.83936,7886.46155 C339.941597,7882.49938 335.695987,7879.81147 331.240198,7881.5369 C328.964263,7882.41716 327.340883,7884.52758 327.062646,7886.95582 C326.472144,7892.11507 330.230339,7896.53241 335.138513,7897.00463 C335.637937,7897.05275 336.009253,7897.49088 336.009253,7897.99417 C336.009253,7898.5917 335.488811,7899.05489 334.894305,7898.99474 C329.388624,7898.44031 325.07996,7893.82346 325.000893,7888.18097 C324.940842,7883.91401 327.915371,7880.06111 332.086918,7879.1989 C337.477502,7878.08404 342.265573,7881.79657 342.935142,7886.81546 C343.469596,7890.82075 340.642192,7894.67164 336.622775,7895.01452"
                id="-spiral-[#30]"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
