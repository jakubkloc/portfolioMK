// * W poniższym obiekcie ustawiasz ile ma być pól ma być pobieranych (a w konsekwencji wyświetlanych) na stronie
// ! Pamiętaj, że pola musza być utworzene w strukturze WP
const number = {
  home_slider:5, // ilość zdjęć w sliderze na stornie głównej
  mixmedia_other:20, // ilość kart w zakładce mixmedia others
  mixmedia_collage:30, // ilość kart z kolażami w zakładce mixmedia collages
  paintings_painting:30, // ilość kart z obrazami w zakładce paintings
  sculptures_sculpture:30, // ilość kart z rzeźbami w zakładce sculptures
  music_music_link:10, // ilość iframe z piosenkami w zakładce music 
}

// * FRAGMENTY DO ZAPYTAŃ
const photo_node= 
`
      node{
        link
        mediaDetails {
          height
          width
        }
      }
`;
const fragments = {
  collage:`
    title
    year
    dimensions
    collage {
      ${photo_node}
    }
  `,
    painting:
    `
    year
    title
    method_dimensions
    painting {
      ${photo_node}
    }
    `,
    sculpture:
    `
    making_method
              name
              year
              photo1 {
                ${photo_node}
              }
              photo2 {
                ${photo_node}
              }
              photo3 {
                ${photo_node}
              }
    `,
    other:
    `
    text
    photo1 {
      ${photo_node}
    }
    photo2 {
      ${photo_node}
    }
    photo3 {
      ${photo_node}
    }
    isVideo
    video_link
    `

};




// * FUNKCJE DO GENEROWANIA ZAPYTAŃ
const generateRepetitiveFragment = (index, fragment) => fragment.replace(/\{index\}/g, index);

const generateRepetitiveFragments = (count,fragment) => {
  let fragments = '';
  for (let i = 1; i <= count; i++) {

     fragments += generateRepetitiveFragment(i,fragment);
  }
  return fragments;
};


// *BIO 
export async function bioContent() {
  const siteNavQueryRes = await fetch(
    import.meta.env.PUBLIC_WORDPRESS_API_URL,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `#graphql
        {
          page(id: "cG9zdDoyNw==") {
            bioGroup {
              gmail
              instagram
              photo {
                node {
                  link
                }
              }
              text_content1
              text_title1
              text_content2
              text_title2
              text_content3
              text_title3
              text_content4
              text_title4
              textbio
            }
          }
        }
      `,
      }),
    }
  );
  const { data } = await siteNavQueryRes.json();
  await console.log(data);
  return data;
}


// * HOME
export async function homeContent() {
  const siteNavQueryRes = await fetch(
    import.meta.env.PUBLIC_WORDPRESS_API_URL,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `#graphql
        {
          page(id: "cG9zdDozMA==") {
            mainGroup{
              ${generateRepetitiveFragments(number.home_slider,
                `slider_photo{index} {
                  ${photo_node}
                }
              `)}
            }
          }
        }`
      }),
    }
  );

  const { data } = await siteNavQueryRes.json();
  // await console.log(data);
  return data;
}

// * MIXMEDIA OTHERS
export async function mixmediaContentOthers() {
  const siteNavQueryRes = await fetch(
    import.meta.env.PUBLIC_WORDPRESS_API_URL,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `#graphql
        {
          page(id: "cG9zdDozMw==") {
            mixmediaGroup{
              others{
                ${generateRepetitiveFragments(number.mixmedia_other,
                  `other{index} {
                    ${fragments.other}
                  }
                `)}
              }
            }
          }
        }`
      }),
    }
  );
  const { data } = await siteNavQueryRes.json();
  // await console.log(data);
  return data;
}

// * MIXMEDIA COLLAGES
export async function mixmediaContentCollages() {
  const siteNavQueryRes = await fetch(
    import.meta.env.PUBLIC_WORDPRESS_API_URL,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `#graphql
        {
          page(id: "cG9zdDozMw==") {
            mixmediaGroup {
              collages {
                ${generateRepetitiveFragments(number.mixmedia_collage, `
                  collage{index} {
                    ${fragments.collage}
                  }
                `)}
              }
            }
          }
        }`
      })
    }
  );
  const { data } = await siteNavQueryRes.json();
  // await console.log(data);
  return data;
}


// * MUSIC
export async function musicContent() {
  const siteNavQueryRes = await fetch(
    import.meta.env.PUBLIC_WORDPRESS_API_URL,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `#graphql
        {
          page(id: "cG9zdDozNg==") {
            musicGroup {
              text_content
              band_link
              ${generateRepetitiveFragments(number.music_music_link, `
              music_link{index}
              `)}
              photo {
                node {
                  caption
                  link
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
          }
        }
      `,
      }),
    }
  );
  const { data } = await siteNavQueryRes.json();
  // await console.log(data);
  return data;
}


// * PAINTINGS
export async function paintingContent() {
  const siteNavQueryRes = await fetch(
    import.meta.env.PUBLIC_WORDPRESS_API_URL,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `#graphql
        {
          page(id: "cG9zdDozOQ==") {
            paintingsGroup {
              ${generateRepetitiveFragments(number.paintings_painting,`
                painting{index}{
                  ${fragments.painting}
                }
              `)}
            }
          }
        }`,
      }),
    }
  );
  const { data } = await siteNavQueryRes.json();
  // await console.log(data);
  return data;
}


// * SCULPTURES
export async function sculptureContent() {
  const siteNavQueryRes = await fetch(
    import.meta.env.PUBLIC_WORDPRESS_API_URL,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `#graphql
        {
          page(id: "cG9zdDo0Mg==") {
            sculpturesGroup {
              ${generateRepetitiveFragments(number.sculptures_sculpture, `
                sculpture{index}{
                  ${fragments.sculpture}
                }
              `)}
            }
          }
        }`,
      }),
    }
  );
  const { data } = await siteNavQueryRes.json();
  // await console.log(data);
  return data;
}

// * PDF DOWNLOAD
export async function portfolioPDF() {
  const siteNavQueryRes = await fetch(
    import.meta.env.PUBLIC_WORDPRESS_API_URL,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `#graphql
        {
          page(id: "cG9zdDo0NQ==") {
            pdfLink {
              portfolioPDF_link
            }
          }
        }
      `,
      }),
    }
  );
  const { data } = await siteNavQueryRes.json();
  // await console.log(data);
  return data;
}
