import React, { useEffect, useState } from "react"
import styled from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import SectionHeader from "components/SectionHeader"
import SectionContainer from "components/SectionContainer"
import { fetchImages } from "services/instagram"

const ImageContainer = styled.div`
  position: relative;
  height: 300px;
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  margin: 0;
  display: flex;

  &::-webkit-scrollbar {
    background-color: black;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #f78320bf;
    cursor: pointer;
    &:hover {
      background: #f78320;
    }
  }
`

const Image = styled.img`
  height: 100%;
  cursor: pointer;
  padding: 10px 30px;
  box-sizing: border-box;
  object-fit: contain;
`

const SocialLink = styled.a`
  display: block;
  color: black;
  text-decoration: none;
  font-size: 2rem;
  text-align: center;
  cursor: pointer;
  transition: 0.15s;

  &:hover {
    color: #f78320;
  }
`

const SocialIcon = styled(FontAwesomeIcon)`
  font-weight: normal;
  font-size: 0.9em;
  margin-right: 20px;
`

const LeftArrow = styled.button`
  position: sticky;
  top: 0;
  left: 0;
  padding: 0 25px;
  height: 100%;
  background: white;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 3rem;
  outline: none;
  border: none;
  box-shadow: 8px 0px 7px -7px #0000008f;

  @media screen and (max-width: 500px) {
    font-size: 2rem;
    padding: 0 10px;
  }
`

const RightArrow = styled(LeftArrow)`
  left: unset;
  right: 0;
  box-shadow: -8px 0px 7px -7px #0000008f;
`

export default function Socials(props) {
  const [images, setImages] = useState()

  useEffect(() => {
    const updateImages = async () => {
      const newImages = await fetchImages()
      setImages(newImages)
    }

    if (!images) {
      updateImages()
    }
  })

  const scroll = diff => {
    document.getElementById("images").scrollLeft += diff
  }

  return (
    <div id="socials">
      <SectionHeader title="Socials" />
      <SectionContainer>
        <SocialLink href="https://instagram.com/tasteofanti" target="_blank">
          <SocialIcon icon={["fab", "instagram"]} />
          @anti
        </SocialLink>
        <br />
        <br />
        <ImageContainer id="images">
          <LeftArrow onClick={() => scroll(-200)}>{"<"}</LeftArrow>
          {images &&
            images.map(image => (
              <Image
                src={image.src}
                key={image.src}
                onClick={() => window.open(image.url)}
              />
            ))}
          <RightArrow onClick={() => scroll(200)}>{">"}</RightArrow>
        </ImageContainer>
      </SectionContainer>
    </div>
  )
}
