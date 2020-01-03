import React, { useEffect, useState } from "react"
import styled from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
  padding-bottom: 10px;

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
  padding: 0 30px;
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
    color: #f78320;
  }
`

const SocialIcon = styled(FontAwesomeIcon)`
  font-weight: normal;
  font-size: 0.9em;
  margin-right: 20px;
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
          <SocialIcon icon={["fab", "instagram"]} />
          @anti
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
