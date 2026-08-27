import type { ToolContent } from './types';

export const wordScrambleContent: ToolContent = {
  slug: 'word-scramble',
  intro: [
    'Stuck on a word jumble, an anagram puzzle, or a Scrabble hand? This solver takes any set of letters and finds every real English word you can make from them — the full anagram plus all shorter words from subsets — using a built-in dictionary of common words.',
    'The entire lookup runs locally in your browser: instant, private, and useful for games, puzzles, and wordplay.',
  ],
  sections: [
    {
      heading: 'How anagram solving works',
      paragraphs: [
        'Two words are anagrams when they share the same letter signature — the same letters sorted alphabetically. "listen" and "silent" both have the signature "eilnst". The solver builds a signature index over its dictionary once, then looks up your letters\u2019 signature in O(1) — which is why results appear instantly even with thousands of words.',
        'Beyond exact anagrams, it also checks every subset of your letters (3+ letters), so a rack like "TRAES" finds "tear", "star", "rats", "east", and more — not just "stare".',
      ],
    },
    {
      heading: 'Using it for games',
      paragraphs: [],
      list: [
        'Word jumbles / scrambled-word puzzles — enter the scrambled letters and get the answer.',
        'Anagram games — find all words hiding in a given set.',
        'Scrabble / Words With Friends — discover the best words from your rack (the solver lists longest-first, which is usually your highest scorer).',
        'Crossword help — confirm whether a candidate word exists.',
      ],
    },
    {
      heading: 'The dictionary',
      paragraphs: [
        'The wordlist contains roughly 7,000 common English words from 3 to 8 letters, derived from a frequency-ranked corpus. That means it favors everyday words over obscure ones — exactly what you want for casual puzzles and games. It deliberately excludes proper nouns, abbreviations, and archaic words.',
      ],
    },
  ],
  faqs: [
    { q: 'How do I unscramble letters into words?', a: 'Type the letters into the box and press Solve. The tool returns the full anagram plus every 3+ letter word formable from subsets, longest first.' },
    { q: 'Does it find all possible words?', a: 'All words in its ~7,000-word dictionary that your letters can form. The dictionary is common-English focused, so it may miss extremely obscure words.' },
    { q: 'Can it solve any anagram?', a: 'Any anagram made of common English words within the dictionary. Exact anagrams are always found via the signature match.' },
    { q: 'Is my input sent anywhere?', a: 'No — the dictionary and solver run entirely in your browser. Nothing you type is transmitted.' },
    { q: 'How do I make a word scramble for others?', a: 'Pick any word and scramble its letters manually — or use any word and jumble the order. The solver can also verify your puzzle has a unique answer.' },
  ],
  relatedSlugs: ['wordle-solver', 'alphabetizer', 'word-counter'],
};
