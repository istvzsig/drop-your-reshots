import React, { useState, forwardRef } from 'react';

export default function ImageComponent({ id, data }) {
    const [isShown, setIsShown] = useState(false);

    function toggleIsShown() {
        setIsShown(!isShown);
        setTimeout(() => setIsShown(false), 1000);
    }

    return (
        <div data-is-shown={isShown} data-id={id} className="gallery-item" onClick={toggleIsShown}>
            <div className="gallery-item-overlay"></div>
            <img className="gallery-image" src={data} alt="data" data-id={id} />
        </div>
    );
}
