export default function getInstagramUsername(instagramLink) {
  // Get fragment between last / ... / in Instagram link
  const match = instagramLink.match(/\/([^/]+)\/$/);
  
  if (match) {
    return match[1];
  } else {
    return null;
  }
}