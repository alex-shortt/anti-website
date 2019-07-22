import axios from "axios"

async function getPostInfo(shortcode) {
  try {
    const response = await axios.get(
        `https://instagram.com/p/${shortcode}/?__a=1`
    )
    const data = response.data.graphql.shortcode_media
    const info = {
      img: data.display_resources[0].src,
      caption: data.edge_media_to_caption.edges[0].node.text,
      url: `https://instagram.com/p/${shortcode}/`
    }
    return info
  } catch (e) {
    console.log("error ||", e)
    return null
  }
}

export async function getPosts(){
  try {
    const response = await axios.get(
        `https://instagram.com/antiofficial/?__a=1`
    )
    const data = response.data.graphql.user
    const rawPosts = data.edge_owner_to_timeline_media.edges

    const posts = []
    for(const rawPost of rawPosts){
      posts.push({
        img: rawPost.node.display_url,
        url: `https://instagram.com/p/${rawPost.node.shortcode}/`
      })
    }

    return posts
  } catch (e) {
    console.log("error ||", e)
    return null
  }
}