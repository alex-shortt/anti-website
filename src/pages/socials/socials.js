import { delay } from "../../common/promises.js"
import initAnti3D from "../../components/anti3d.js"
import getPostInfo from "../../common/instagram.js"

initAnti3D()

// post shortcodes they want to display
const posts = ["Bu4zBPLA7RB", "BtB8LkrlvEu", "BtB4StKly7G"]

async function fillInstaData() {
  for (const post of posts) {
    let postData = await getPostInfo(post)

    var container = $(".socials-left-instafeed")
    var post = $("<img class='socials-left-instafeed-instapost'>")
    post.click(() => window.open(postData.url))
    post.attr("src", postData.img)
    post.appendTo($(container))
  }
}

fillInstaData()
