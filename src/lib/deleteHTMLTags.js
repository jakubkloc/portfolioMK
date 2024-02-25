export default function deleteHTMLTags(inputString) {
  return inputString.replace(/<\/?[^>]+(>|$)/g, "");
}