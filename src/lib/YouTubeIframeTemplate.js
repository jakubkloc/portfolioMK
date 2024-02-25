export default function YouTubeIframeTemplate(link){
  return `<iframe class="test" style="position:absolute;top:0;left:5%;width:90%;height:100%;" height="315" src="${link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
}
