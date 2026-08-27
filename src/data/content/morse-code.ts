import type { ToolContent } from './types';

export const morseCodeContent: ToolContent = {
  slug: 'morse-code',
  intro: [
    'Morse code turns letters into patterns of dots and dashes — the original digital communication, sent over telegraph wires since the 1840s and still recognized worldwide through its most famous message: SOS (... --- ...). This translator converts text to Morse and back, and can even play the code as audio.',
    'It runs entirely in your browser — translate, copy, and sound out your message instantly.',
  ],
  sections: [
    {
      heading: 'How Morse code works',
      paragraphs: [
        'Every letter, digit, and punctuation mark maps to a pattern of dots (short signals) and dashes (long signals, three times a dot\u2019s length). The code was designed around frequency: common letters like E (.) and T (−) got the shortest patterns, rare ones like Q (−−.−) and Z (−−..) the longest — an early exercise in information theory, decades before Shannon formalized it.',
        'The conventions: letters are separated by one gap, words by a longer gap (often written as /). Timing is relative — "dots" and "dashes" just have a 1:3 length ratio, which is why Morse works over any medium: sound, light, or radio.',
      ],
    },
    {
      heading: 'SOS and survival lore',
      paragraphs: [
        'SOS is not an acronym — it was chosen because ... --- ... is unmistakable and trivially easy to send and recognize. The convention spread from maritime radio, and SOS remains the universal distress signal in Morse. (Fun fact: many languages backronymed it — "Save Our Souls," "Save Our Ship" — but the original choice was purely about the pattern.)',
      ],
    },
    {
      heading: 'Morse in the modern world',
      paragraphs: [
        'Morse is still licensed and used by amateur radio operators, taught in scouting, and employed in accessibility contexts — some assistive devices let people communicate by tapping dots and dashes. Its persistence is a testament to how good the design was: a complete alphabet in two symbols, decodable by ear, with no electronics required.',
      ],
    },
  ],
  faqs: [
    { q: 'What does SOS mean in Morse code?', a: '... --- ... (dot dot dot, dash dash dash, dot dot dot). SOS was chosen for its unmistakable pattern, not as an acronym.' },
    { q: 'How do I translate Morse to text?', a: 'Type or paste the code with spaces between letters (use / for word gaps) and choose "Morse → Text". The tool decodes instantly.' },
    { q: 'Is Morse code still used?', a: 'Yes — in amateur radio, scouting, and some assistive communication devices. It remains a licensed skill with active communities worldwide.' },
    { q: 'What is the difference between a dot and a dash?', a: 'Duration: a dash lasts three times as long as a dot. The gaps between letters and words follow the same relative timing.' },
    { q: 'Can the translator play the code?', a: 'Yes — in Text → Morse mode, the Play button sounds out the code as audio (~700 Hz tone) with correct dot/dash timing.' },
  ],
  relatedSlugs: ['caesar-cipher', 'base64-tool'],
};
