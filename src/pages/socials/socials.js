import { delay } from "../../common/promises.js"
import initAnti3D from "../../components/anti3d.js"
import getPostInfo from "../../common/instagram.js"

initAnti3D()

// post shortcodes they want to display
const posts = ["BztyZm3nUc9", "BzeL7G8H-6l", "By3rQ4Wp9Wc", "ByqTI4LHOSF"]

async function fillInstaData() {
  for (const post of posts) {
    let postData = await getPostInfo(post)

    var container = $(".socials-left-instafeed")
    var picture = $("<img class='socials-left-instafeed-instapost'>")
    picture.click(() => window.open(postData.url))
    picture.attr("src", postData.img)
    picture.appendTo($(container))
  }
}

fillInstaData()
