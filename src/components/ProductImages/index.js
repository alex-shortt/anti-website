import React, { useCallback, useState } from "react"
import styled from "styled-components/macro"
import InnerImageZoom from "react-inner-image-zoom"

const MainImage = styled(InnerImageZoom)`
  & > img {
    width: 350px;
    margin-top: 50px;
  }
`

const Thumbnail = styled.img`
  width: 55px;
  height: 55px;
  margin: 10px;
  opacity: 0.5;
  transition: 0.2s;
  object-fit: cover;
  object-position: top center;
  ${props => props.selected && "cursor: pointer"};
`

const Container = styled.div`
  width: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  height: 100%;
  position: relative;
`

const PaginateButton = styled.button`
  font-size: 25px;
  background-color: transparent;
  outline: none;
  border: none;
  color: white;
`

export default function ProductImages(props) {
  const { product } = props

  // remove gif
  const images = product.images.slice(0, product.images.length - 1)
  const [index, setIndex] = useState(0)

  const changeIndex = useCallback(
    diff => {
      let newIndex = index + diff
      if (newIndex < 0) {
        newIndex = images.length - 1
      }
      if (newIndex > images.length - 1) {
        newIndex = 0
      }
      setIndex(newIndex)
    },
    [images.length, index]
  )

  return (
    <Container>
      <PaginateButton onClick={() => changeIndex(-1)}>{"<"}</PaginateButton>
      <MainImage className="product-image" src={images[index].src} />
      <PaginateButton onClick={() => changeIndex(1)}>{">"}</PaginateButton>
      <div className="shop-other__images">
        {images.map((image, i) => {
          return (
            <Thumbnail
              key={image.src}
              src={image.src}
              selected={i === index}
              onClick={() => setIndex(i)}
            />
          )
        })}
      </div>
    </Container>
  )
}
