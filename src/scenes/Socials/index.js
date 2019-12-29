import React, { useEffect, useState } from "react"
import styled from "styled-components/macro"

import SectionHeader from "components/SectionHeader"
import SectionContainer from "components/SectionContainer"
import { fetchImages } from "services/instagram"

const ImageContainer = styled.div`
  height: 300px;
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  padding: 0 40px;
  display: flex;
`

const Image = styled.img`
  height: 100%;
  cursor: pointer;
  margin: 0 30px;
  border: 1px solid black;
  box-sizing: border-box;
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
    color: orange;
  }
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

  return (
    <div id="socials">
      <SectionHeader title="Socials" />
      <SectionContainer>
        <SocialLink href="https://instagram.com/tasteofanti" target="_blank">
          @tasteofanti
        </SocialLink>
        <br />
        <br />
        <ImageContainer>
          {images &&
            images.map(image => (
              <Image
                src={image.src}
                key={image.src}
                onClick={() => window.open(image.url)}
              />
            ))}
        </ImageContainer>
      </SectionContainer>
    </div>
  )
}
