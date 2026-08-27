import type { ToolContent } from './types';

export const caesarCipherContent: ToolContent = {
  slug: 'caesar-cipher',
  intro: [
    'The Caesar cipher is the oldest known encryption technique: Julius Caesar reportedly used it for military messages, shifting each letter by three positions. This tool encodes and decodes text with any shift — including ROT13, the modern classic — and is a perfect little puzzle for codes, games, and teaching.',
    'Everything runs in your browser. And a warning up front: this is a toy cipher for fun, never for protecting anything real.',
  ],
  sections: [
    {
      heading: 'How it works',
      paragraphs: [
        'Each letter is replaced by the letter N positions later in the alphabet (wrapping around). Shift 3 turns "HELLO" into "KHOOR": H→K, E→H, L→O, L→O, O→R. Decoding applies the shift backwards — or, cleverly, forward by 26−N.',
        'Non-letter characters (digits, spaces, punctuation) pass through unchanged, so the cipher preserves the shape of the original text.',
      ],
    },
    {
      heading: 'ROT13 — the special case',
      paragraphs: [
        'Shift 13 on the 26-letter alphabet is its own inverse: encoding and decoding are the same operation, since 13+13 = 26 = a full wrap. ROT13 is widely used online to lightly obscure spoilers, riddles, and puzzle answers — not for security, just for a moment of deliberate reading.',
      ],
    },
    {
      heading: 'Why it is not secure (and what replaced it)',
      paragraphs: [
        'There are only 25 possible shifts, so brute force is trivial — try each one and read the one that makes sense. That is why the cipher died as real cryptography: frequency analysis (comparing letter patterns to known language stats) cracks any simple substitution instantly.',
        'Modern encryption (AES, TLS) works on completely different principles — huge key spaces and complex math. If you need real security, use a password manager and HTTPS, not a Caesar shift. If you want to hide text in a game or puzzle, ROT13 and friends are perfect.',
      ],
    },
  ],
  faqs: [
    { q: 'What is the Caesar cipher?', a: 'The oldest known cipher: each letter is shifted N positions in the alphabet. Julius Caesar reportedly used a shift of 3.' },
    { q: 'How do I decode a Caesar shift without the key?', a: 'Brute force: try all 25 shifts and read the one that forms sensible text. Tools that do this automatically are called "Caesar brute forcers."' },
    { q: 'What is ROT13?', a: 'A Caesar cipher with shift 13. On a 26-letter alphabet it is its own inverse, so encoding and decoding are the same operation.' },
    { q: 'Is the Caesar cipher secure?', a: 'No — only 25 possible keys, and frequency analysis breaks it instantly. Use it for puzzles and games, never for real data.' },
    { q: 'Does the cipher affect numbers and symbols?', a: 'No — only letters are shifted. Digits, spaces, and punctuation pass through unchanged.' },
  ],
  relatedSlugs: ['morse-code', 'base64-tool', 'hash-generator'],
};
