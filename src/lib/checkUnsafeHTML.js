import he from 'he'
export default function checkUnsafeHTML(inputString) {
  inputString = he.decode(inputString);
  const unsafeTags = ['script', 'iframe', 'object', 'embed', 'applet', 'form'];
  const unsafeAttributes = [
    'on[^{]*=[\'"][^\'"]*[\'"]', // Dopuść atrybuty zaczynające się od "on", ale nie zawierające nawiasów klamrowych
    'href="javascript:..."',
    'src="javascript:..."',
    'data:'
  ];

  let foundUnsafe = false;

  unsafeTags.forEach(tag => {
    const tagRegExp = new RegExp(`<${tag}\\s|<${tag}>`, 'gi');
    if (tagRegExp.test(inputString)) {
      console.log(`Found unsafe HTML tag: <${tag}>`);
      foundUnsafe = true;
    }
  });

  unsafeAttributes.forEach(attribute => {
    const attributeRegExp = new RegExp(`${attribute}`, 'gi');
    if (attributeRegExp.test(inputString)) {
      console.log(`Found unsafe HTML attribute: ${attribute}`);
      foundUnsafe = true;
    }
  });

  return foundUnsafe ? null : inputString;
}
