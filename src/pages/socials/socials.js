import initAnti3D from "../../components/anti3d.js";
import { getPosts } from "../../common/instagram.js";

initAnti3D();

async function fillInstaData() {
  const posts = await getPosts();

  for (const post of posts) {
    var container = $(".socials-left-instafeed");
    var picture = $("<img class='socials-left-instafeed-instapost'>");
    picture.click(() => window.open(post.url));
    picture.attr("src", post.img);
    picture.appendTo($(container));
  }
}

$("#anti3d").click(() => {
  window.open("https://instagram.com/antiofficial", "_blank");
});

fillInstaData();
