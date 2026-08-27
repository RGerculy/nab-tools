import type { ToolContent } from './types';

export const wordleSolverContent: ToolContent = {
  slug: 'wordle-solver',
  intro: [
    'Wordle gives you six guesses and colored feedback — green for right letter/right spot, yellow for right letter/wrong spot, grey for not in the word. This solver turns that feedback into a live list of every possible answer, so you always know your best next move.',
    'Enter your guesses and tap each tile to cycle its color. The candidate list updates instantly, entirely in your browser.',
  ],
  sections: [
    {
      heading: 'How the filtering works',
      paragraphs: [
        'The solver applies the same logic Wordle\u2019s own answer list uses. For each guess row it enforces three rules:',
      ],
      list: [
        'Green — the candidate must have that exact letter in that exact position.',
        'Yellow — the letter must appear in the word, but not in that position.',
        'Grey — the letter must not appear in the word at all (with one subtlety: if the same letter is green/yellow elsewhere in the row, the grey only excludes that position).',
      ],
      tip: 'The grey-letter subtlety matters: in a row like "ABBey" with green A and grey B, the word has exactly one B (at position 2), not zero.',
    },
    {
      heading: 'Strategy: choose your first words wisely',
      paragraphs: [
        'Good opening words cover the most common letters. "CRANE", "SLATE", "SOARE", and "RAISE" are classic openers — each hits several high-frequency vowels and consonants. A strong opener plus this solver will get you to the answer in 3–4 guesses most days.',
        'When the candidate list is large, prefer guesses that eliminate letters over guesses that confirm them: a word using five untested letters tells you more than one reusing known greens.',
      ],
    },
    {
      heading: 'Fair play note',
      paragraphs: [
        'Use it as a helper, a learning tool, or a way to settle a friendly dispute — or don\u2019t. The solver works exactly like the game\u2019s own answer logic, so its candidates are always legal Wordle answers. Whether you peek or not is between you and your streak. 😄',
      ],
    },
  ],
  faqs: [
    { q: 'How does the Wordle solver work?', a: 'You enter your guesses and mark each tile green/yellow/grey. The solver filters its ~1,400-word dictionary using the same feedback rules as the game.' },
    { q: 'What do green, yellow, and grey mean?', a: 'Green = correct letter in the correct spot. Yellow = correct letter in the wrong spot. Grey = letter not in the word (or already accounted for by a green/yellow of the same letter).' },
    { q: 'What is the best starting word for Wordle?', a: 'Common strong openers: CRANE, SLATE, SOARE, RAISE. They cover the most frequent letters in the answer list.' },
    { q: 'Does the solver give the exact answer?', a: 'It lists every possible answer consistent with your feedback. If only one candidate remains, that is the answer.' },
    { q: 'Is my game data sent anywhere?', a: 'No — the solver and dictionary run entirely in your browser.' },
  ],
  relatedSlugs: ['word-scramble', 'alphabetizer', 'lorem-ipsum'],
};
