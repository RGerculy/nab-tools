import type { ToolContent } from './types';

export const urlEncoderContent: ToolContent = {
  slug: 'url-encoder',
  intro: [
    'URLs can only contain a limited set of safe characters — spaces, punctuation, and non-ASCII characters must be encoded as percent escapes (%20, %C3%A9) to travel safely through the internet. This tool percent-encodes and decodes text and URLs correctly, including UTF-8, so your links and query strings work everywhere.',
    'Encoding happens locally in your browser. Nothing you paste is sent anywhere.',
  ],
  sections: [
    {
      heading: 'Why percent-encoding exists',
      paragraphs: [
        'A URL is a strict grammar: certain characters are reserved as syntax (?, &, =, #, /), and everything else must be either unreserved (A–Z, a–z, 0–9, - _ . ~) or percent-encoded. Spaces are the most common offender — they become %20.',
        'Without encoding, a URL breaks: a space splits the address, an & in a query value gets parsed as a new parameter, a # starts the fragment. Encoding is how you ship arbitrary text — including emoji and accented characters — inside a URL without breaking it.',
      ],
    },
    {
      heading: 'When to encode (and when not to)',
      paragraphs: [
        'The rule: encode the parts of a URL that carry data, not the parts that are already syntax.',
      ],
      list: [
        'Query string values — always encode: ?q=hello world becomes ?q=hello%20world.',
        'User-generated input — search terms, filenames, messages going into URLs — always encode.',
        'Pre-existing URLs — do not re-encode an already-encoded URL, or % becomes %25 and it breaks.',
        'Path segments — encode when they contain spaces or special characters.',
      ],
      tip: 'encodeURIComponent is stricter than encodeURI: it escapes everything except unreserved characters, which is why it is the right choice for query values. This tool uses the strict form.',
    },
    {
      heading: 'UTF-8 and international URLs',
      paragraphs: [
        'Modern URLs support international characters via percent-encoding of UTF-8 bytes: é becomes %C3%A9, and emoji become longer escape sequences. This tool encodes with UTF-8, so pasting "café ☕" produces the correct, standards-compliant output that browsers and servers accept.',
      ],
    },
  ],
  faqs: [
    { q: 'What is URL encoding?', a: 'Percent-encoding: replacing unsafe characters in a URL with a % followed by their hex byte value (e.g. space → %20). It lets URLs carry spaces, punctuation, and non-ASCII text safely.' },
    { q: 'What is the difference between encoding and decoding?', a: 'Encoding turns text into percent-escapes; decoding turns percent-escapes back into the original text. This tool does both — switch with the tabs.' },
    { q: 'Why does my encoded URL look so long?', a: 'Non-ASCII characters expand: each UTF-8 byte becomes three characters (%XX). A single emoji can become 12+ characters. That is normal and expected.' },
    { q: 'Is URL encoding the same as HTML encoding?', a: 'No. URL encoding uses % escapes for URLs; HTML encoding uses entities like &amp; and &#39; for HTML. They serve different contexts.' },
    { q: 'Should I encode the whole URL or just the values?', a: 'Just the values and dynamic parts. The structure (https://, ?, =, &) must stay unencoded to remain valid URL syntax.' },
  ],
  relatedSlugs: ['base64-tool', 'json-formatter', 'timestamp-converter'],
};
