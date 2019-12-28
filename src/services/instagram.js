import axois from "axios"

export const fetchImages = async () => {
  const url = "https://www.instagram.com/tasteofanti/?__a=1"
  const response = await axois.get(url)
  if (response.status !== 200) {
    return []
  }
  const imageData =
    response.data.graphql.user.edge_owner_to_timeline_media.edges
  const images = []
  for (const data of imageData) {
    const image = data.node
    images.push({
      src: image.display_url,
      url: `https://instagram.com/p/${image.shortcode}`
    })
  }

  return images
}
