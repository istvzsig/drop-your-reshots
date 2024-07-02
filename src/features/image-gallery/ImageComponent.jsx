// eslint-disable-next-line react/prop-types
export default function ImageComponent({ image }) {
  return (
    <div className="gallery-item">
      <img src={image} alt={image}></img>
    </div>
  );
}
