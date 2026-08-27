import type { ToolContent } from './types';

export const qrDecoderContent: ToolContent = {
  slug: 'qr-decoder',
  intro: [
    'Found a QR code in a screenshot, a photo, or a downloaded image — and need to know where it leads? This decoder reads QR codes straight from image files, entirely in your browser. No upload, no third party, no server: the image never leaves your device.',
    'Pick an image, and the tool returns the encoded URL or text — with a one-click option to open links safely.',
  ],
  sections: [
    {
      heading: 'How decoding works',
      paragraphs: [
        'The tool draws your image onto a canvas and uses jsQR — a JavaScript QR decoder — to find the three finder squares, sample the module grid, and extract the encoded data. It handles rotation, perspective distortion, and moderate damage via the error-correction built into every QR code.',
        'Because everything runs locally, this is the privacy-safe way to inspect a code you are not sure about: you can see where it points before deciding whether to open it.',
      ],
    },
    {
      heading: 'Getting a clean read',
      paragraphs: [],
      list: [
        'Crop tightly — the decoder works best when the code fills most of the image.',
        'Avoid glare and shadows — photos of screens or glossy surfaces can corrupt the pattern.',
        'Prefer screenshots over photos — a straight-on screenshot of a code decodes almost every time.',
        'High resolution helps — small, blurry codes may fail; re-shoot or zoom before exporting.',
      ],
      tip: 'Before scanning codes in the wild, decode them first — QR phishing (swapping a legitimate code for a malicious one) is a real, growing attack. See where it goes before your camera does.',
    },
    {
      heading: 'QR code security',
      paragraphs: [
        'A QR code is just text — it can encode a link to a phishing page, a malicious download, or a WiFi password for a rogue network. Decoding first (as this tool lets you do) turns an unknown code into a readable URL you can inspect before trusting it.',
        'When generating codes for your own use, double-check the encoded text too — a typo in a URL can send your customers somewhere they should not go.',
      ],
    },
  ],
  faqs: [
    { q: 'How do I decode a QR code from an image?', a: 'Click the drop zone and choose the image. The code is read locally and the content appears instantly.' },
    { q: 'Is my image uploaded anywhere?', a: 'No — decoding runs entirely in your browser with jsQR. The image never leaves your device.' },
    { q: 'Why can it not read my code?', a: 'Common causes: the code is small or blurry, cropped too loosely, glares on a photo, or heavily damaged. Crop tightly and prefer screenshots.' },
    { q: 'Can it decode damaged QR codes?', a: 'Often yes — QR codes carry error correction (typically 15–30%). Minor damage, rotation, and perspective distortion are handled.' },
    { q: 'Is it safe to scan unknown QR codes?', a: 'Decode them first with a tool like this to see the URL before opening. QR-based phishing is increasingly common.' },
  ],
  relatedSlugs: ['qr-code-generator', 'url-encoder', 'hash-generator'],
};
