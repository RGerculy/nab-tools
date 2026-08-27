import type { ToolContent } from './types';

export const baseConverterContent: ToolContent = {
  slug: 'base-converter',
  intro: [
    'Computers think in binary (base 2), humans count in decimal (base 10), and everything in between — memory addresses, color codes, network masks — is often expressed in hexadecimal (base 16) or octal (base 8). This converter translates any whole number between all four bases instantly, with BigInt precision so even enormous values are exact.',
    'Conversion runs entirely in your browser — paste a value, pick its base, and see it in every other base immediately.',
  ],
  sections: [
    {
      heading: 'Why so many bases?',
      paragraphs: [
        'Each base exists because it fits a real use:',
      ],
      list: [
        'Binary (2) — the native language of hardware: one digit per bit. Where everything ultimately lives.',
        'Octal (8) — binary digits grouped in threes. Historically used for Unix file permissions (chmod 755) and legacy systems.',
        'Decimal (10) — what humans use, because we have ten fingers.',
        'Hexadecimal (16) — binary grouped in fours. One hex digit = exactly one nibble (4 bits), which is why memory addresses, color codes (#FF0000), and MAC addresses are written in hex.',
      ],
    },
    {
      heading: 'Why hex is everywhere in computing',
      paragraphs: [
        'A byte is 8 bits, which is exactly two hex digits (00–FF). That clean mapping is why hex appears in everything: CSS colors (#00D4AA), Unicode code points (U+1F600), IPv6 addresses, memory dumps, and error codes. Once you can read hex, a byte becomes two characters instead of eight.',
        'The conversion is mechanical: group binary digits in fours from the right, and each group maps to one hex digit (0000→0 … 1111→F).',
      ],
    },
    {
      heading: 'Converting by hand in three steps',
      paragraphs: [
        'Decimal → binary: divide by 2 repeatedly, collect the remainders from bottom to top. Binary → hex: group in fours from the right. Hex → decimal: multiply each digit by its power of 16 and add.',
        'For anything beyond quick mental checks, use the tool — and trust its BigInt arithmetic over floating-point calculators, which silently lose precision past 2^53 (about 9 quadrillion). This converter stays exact for arbitrarily large numbers.',
      ],
    },
  ],
  faqs: [
    { q: 'What is a number base?', a: 'The number of digits a positional system uses: binary has 2 (0,1), octal 8, decimal 10, hexadecimal 16. The same value looks different in each base but means the same thing.' },
    { q: 'How do I convert binary to hex?', a: 'Group binary digits in fours from the right and map each group: 0000→0, 0001→1, …, 1111→F. Example: 11111111 → FF.' },
    { q: 'Why does hexadecimal use letters?', a: 'Base 16 needs 16 digit symbols; after 0–9 it uses A–F for values 10–15. So 10 in hex means 16 in decimal.' },
    { q: 'What is BigInt and why does it matter?', a: 'BigInt is JavaScript\u2019s arbitrary-precision integer type. Unlike regular numbers (limited to 2^53), BigInt handles numbers of any size exactly — so this converter never loses precision.' },
    { q: 'Where is octal still used?', a: 'Unix file permission masks (chmod 644), some legacy systems, and occasionally as a compact binary form in older code. Rare today, but you will still meet it.' },
  ],
  relatedSlugs: ['timestamp-converter', 'case-converter', 'json-formatter'],
};
