import React, { useCallback, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";

export default function ProductImages(props) {
  const { product } = props;

  //remove gif
  const images = product.images.slice(0, product.images.length - 1);
  const [index, setIndex] = useState(0);

  const changeIndex = useCallback(
    diff => {
      let newIndex = index + diff;
      if (newIndex < 0) {
        newIndex = images.length - 1;
      }
      if (newIndex > images.length - 1) {
        newIndex = 0;
      }
      setIndex(newIndex);
    },
    [index]
  );

  return (
    <div
      className="shop-page__product-column zoom"
      style={{ flexDirection: "column" }}
    >
      <button
        onClick={() => changeIndex(-1)}
        className="image-button image-button__sub"
      >
        {"<"}
      </button>
      <InnerImageZoom className="product-image" src={images[index].src} />
      <button
        onClick={() => changeIndex(1)}
        className="image-button image-button__add"
      >
        {">"}
      </button>
      <div className="shop-other__images">
        {images.map((image, i) => {
          return (
            <img
              key={i}
              src={image.src}
              className={i === index ? "selected-image" : "unselected-image"}
              onClick={() => setIndex(i)}
            />
          );
        })}
      </div>
    </div>
  );
}
