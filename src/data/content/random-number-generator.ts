import type { ToolContent } from './types';

export const randomNumberGeneratorContent: ToolContent = {
  slug: 'random-number-generator',
  intro: [
    'From picking a winner to generating test data, a random number is one of the most requested things on the internet. This generator produces random integers in any range — one at a time or in bulk — with options for unique-only draws and ascending sort.',
    'The numbers come from your browser\u2019s cryptographically secure random source, so there is no pattern, no seed you can predict, and no server in the middle.',
  ],
  sections: [
    {
      heading: 'Randomness that is actually random',
      paragraphs: [
        'Not all randomness is equal. Math.random() is fine for games and animations but is a pseudo-random sequence — predictable in principle. This tool uses crypto.getRandomValues(), the same source browsers use for encryption keys: seeded from OS-level entropy, unguessable, and suitable for draws, lotteries, and security-adjacent use.',
        'For a giveaway or competition, that distinction matters — a crypto-random draw is defensible if anyone questions the fairness.',
      ],
    },
    {
      heading: 'Use cases',
      paragraphs: [],
      list: [
        'Giveaways and prize draws — pick winners with provably fair randomness.',
        'Testing and mock data — generate realistic IDs, values, or addresses for development.',
        'Gaming — random starting stats, procedural variation, or dice substitutes.',
        'Decision-making — settle arguments and choices with an impartial number.',
        'Sampling — pick random rows, items, or entries from a larger set.',
      ],
    },
    {
      heading: 'Unique draws explained',
      paragraphs: [
        'The "unique numbers" option samples without replacement: each number appears at most once. That is essential for prize draws (no duplicates) and sampling. If the requested count exceeds the range size, the tool tells you instead of producing duplicates — a silent failure that plagues other generators.',
        'Sorting is a display convenience: ascending order makes a draw easy to read, while unsorted preserves the natural order of a blind pick.',
      ],
    },
  ],
  faqs: [
    { q: 'Are the generated numbers truly random?', a: 'Yes — the generator uses crypto.getRandomValues(), the cryptographically secure random source also used for encryption. Results are not predictable and are suitable for draws and giveaways.' },
    { q: 'Can I generate unique numbers?', a: 'Yes — enable "Unique numbers" to sample without replacement. The tool validates that the range is large enough for the requested count.' },
    { q: 'What is the maximum range?', a: 'Practically unlimited — any integer range works, and counts up to 10,000 are supported.' },
    { q: 'Is my data sent anywhere?', a: 'No — generation happens entirely in your browser. Nothing you enter is transmitted.' },
    { q: 'How do I pick a random winner fairly?', a: 'Set the range to your participant numbers, use unique mode, and generate one number. Crypto-random selection is as fair as it gets without a notary.' },
  ],
  relatedSlugs: ['password-generator'],
};
