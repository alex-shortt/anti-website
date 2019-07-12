const ProductImages = ({ currentProduct }) => {
  const currentProductImages = currentProduct.images.slice(1, currentProduct.images.length)
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)

  return (
    <div className="shop-page__column-one" style={{ flexDirection: "column" }}>
      <img src={currentProductImages[currentImageIndex].src} width="400px" />
      <div className="shop-other__images" style={{
        display: "flex",
        justifyContent: "space-evenly"
      }}>
        {
          currentProductImages.map((image, i) => {
            return <img key={i}
              onClick={() => {
                setCurrentImageIndex(i)
              }}
              src={image.src}
              width="75px"
              height="75px"
              style={{}}
              className={i === currentImageIndex ? 'selected-image' : 'unselected-image'}
            />
          })
        }
      </div>
    </div>
  )
}

export default ProductImage