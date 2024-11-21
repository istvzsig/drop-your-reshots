export default function ImageComponent({ id, data }) {
    return (
        <div key={id} className="gallery-item">
            <div className="gallery-item-overlay"></div>
            <img src={data} alt="data" />
        </div>
    )
}