import initGlitch from "../../components/glitchyimage.js"

var sources = []

for(let i = 1; i <= 30; i++){
 sources.push(`https://d369ls1rsdbvlu.cloudfront.net/pictures/lookbook/${i}.jpg`)
}


async function initLookBook() {
  initGlitch(sources)
}

initLookBook()
