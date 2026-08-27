import type { ToolContent } from './types';

export const base64ToolContent: ToolContent = {
  slug: 'base64-tool',
  intro: [
    'Base64 is a way to represent binary data using only 64 printable ASCII characters (A–Z, a–z, 0–9, +, /, and = for padding). It is everywhere: email attachments, data URLs in HTML, JSON payloads, JWTs, and API authentication.',
    'This tool encodes and decodes Base64 with full UTF-8 support, right in your browser. Nothing is uploaded — the conversion happens locally on your device.',
  ],
  sections: [
    {
      heading: 'Why Base64 exists',
      paragraphs: [
        'Many protocols and formats were designed for text, not raw bytes. Emails historically allowed only 7-bit ASCII; JSON and XML have no native binary type; URLs cannot contain arbitrary bytes. Base64 solves this by encoding any binary data as safe, printable text.',
        'The cost is size: Base64 expands data by about 33%. Three bytes become four characters. That is fine for small payloads and the reason it is used everywhere — and also a reason to avoid it for large files.',
      ],
    },
    {
      heading: 'Common uses',
      paragraphs: [],
      list: [
        'Data URLs — embedding small images directly in HTML or CSS: data:image/png;base64,iVBORw0KGgo….',
        'JWT tokens — the header and payload of JSON Web Tokens are Base64url-encoded JSON.',
        'Email attachments — MIME encoding wraps file attachments in Base64.',
        'API authentication — many APIs accept Basic auth as Base64(user:password).',
        'Storing binary in JSON or databases — when you must ship bytes through a text-only channel.',
      ],
    },
    {
      heading: 'Base64 vs Base64url',
      paragraphs: [
        'Standard Base64 uses + and /, which have special meaning in URLs and filenames. Base64url swaps them for - and _ and drops the = padding, producing strings that are safe in URLs without escaping.',
        'JWTs and many web APIs use Base64url. If you decode something that looks like Base64 but contains - or _, that is what you are looking at. This tool handles both when decoding.',
      ],
    },
    {
      heading: 'Is Base64 encryption?',
      paragraphs: [
        'No. Base64 is an encoding, not encryption. It is trivially reversible — anyone can decode it, including your browser in the click of a button. Treat Base64 as obfuscation at best: never use it to protect secrets, passwords, or sensitive data.',
        'If you need to hide data, use real encryption (AES). And if you are sending Base64 over a network, always do it over HTTPS — otherwise the payload is readable in transit.',
      ],
    },
  ],
  faqs: [
    { q: 'What is Base64 used for?', a: 'Representing binary data as safe ASCII text for transmission through text-only channels: email attachments, JSON payloads, data URLs, JWTs, and API authentication.' },
    { q: 'Is Base64 the same as encryption?', a: 'No. Base64 is an encoding that anyone can reverse instantly. It obscures data but provides zero security.' },
    { q: 'Why does Base64 output end with = signs?', a: 'The = characters are padding. Base64 encodes data in 3-byte groups; when the input length is not a multiple of 3, one or two = signs pad the output to a multiple of 4 characters.' },
    { q: 'Does Base64 increase file size?', a: 'Yes — by about 33%. Three input bytes become four Base64 characters. This is why Base64 is a poor choice for large files.' },
    { q: 'What is the difference between Base64 and Base64url?', a: 'Base64url replaces + and / with - and _ and omits padding, making the output safe for URLs and filenames. JWTs use Base64url.' },
    { q: 'Why is my decoded text showing garbled characters?', a: 'The input may not be valid Base64, or it may encode binary data (images, compressed files) rather than text. Try decoding it as UTF-8 only if it is genuinely text.' },
  ],
  relatedSlugs: ['json-formatter', 'hash-generator', 'uuid-generator'],
};
