import { useState, forwardRef } from 'react';

function ImageComponent({ id, data }, ref) {
    const [visible, setVisible] = useState(false);

    return (
        <div
            data-is-shown={visible}
            data-id={id}
            className="gallery-item"
            onClick={() => setVisible(!visible)}
        >
            <div className="gallery-item-overlay"></div>
            <img className="gallery-image" src={data} alt="data" data-id={id} />
        </div>
    );
}

export default forwardRef(ImageComponent);
