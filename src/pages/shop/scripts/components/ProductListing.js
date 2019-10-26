import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  flex: 0 auto; 
  width: 100%;
  max-width: 450px;
  padding: 2rem 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Description = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: auto;
  height: 25vh;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Title = styled.h2`
  text-align: center;
  margin: 0.5rem 0;
`;

const Subtitle = styled.h3`
  text-align: center;
`;

const ShopNow = styled(Link)`
  padding: 0.5rem 1rem;
  border: 1px solid white;
  cursor: pointer;
  transition: background 0.15s linear;
  color: white !important;
  text-decoration: none !important;
  text-align: center;
  font-size: 1.17em;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

function getGif(images) {
  for (const img of images) {
    if (img.src.includes("gif")) {
      return img.src;
    }
  }

  return images[0].src;
}

export default function ProductListing(props) {
  const { product } = props;

  const { images, title, id } = product;
  const { price } = product.variants[0];

  const gifURL = getGif(images);

  return (
    <Container>
      <Image src={gifURL} />
      <Description>
        <Title>{title}</Title>
        <Subtitle>${price}</Subtitle>
        <ShopNow to={`/shop/${id}`}>Shop Style</ShopNow>
      </Description>
    </Container>
  );
}
