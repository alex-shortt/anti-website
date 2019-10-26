import InnerImageZoom from "react-inner-image-zoom";

export default function ProductImages({ currentProduct }) {
  const currentProductImages = currentProduct.images.slice(
    0,
    currentProduct.images.length - 1
  );
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const imageIndexOptions = {
    add: () => {
      currentImageIndex !== currentProductImages.length - 1
        ? setCurrentImageIndex(currentImageIndex + 1)
        : setCurrentImageIndex(0);
    },
    sub: () => {
      currentImageIndex > 0
        ? setCurrentImageIndex(currentImageIndex - 1)
        : setCurrentImageIndex(currentProductImages.length - 1);
    }
  };

  return (
    <div
      className="shop-page__product-column zoom"
      style={{ flexDirection: "column" }}
    >
      <button
        onClick={imageIndexOptions.sub}
        className="image-button image-button__sub"
      >
        {"<"}
      </button>
      <InnerImageZoom
        className="product-image"
        src={currentProductImages[currentImageIndex].src}
        // style={{ objectFit: "cover", "objectPosition": "center top" }}
      />
      <button
        onClick={imageIndexOptions.add}
        className="image-button image-button__add"
      >
        {">"}
      </button>
      <div className="shop-other__images">
        {currentProductImages.map((image, i) => {
          return (
            <img
              key={i}
              src={image.src}
              className={
                i === currentImageIndex ? "selected-image" : "unselected-image"
              }
              onClick={() => setCurrentImageIndex(i)}
            />
          );
        })}
      </div>
    </div>
  );
}
