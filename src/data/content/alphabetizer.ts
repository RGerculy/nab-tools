import type { ToolContent } from './types';

export const alphabetizerContent: ToolContent = {
  slug: 'alphabetizer',
  intro: [
    'Lists need ordering — bibliographies, inventories, name lists, keyword collections. This tool sorts any list alphabetically in seconds: lines or words, A→Z or Z→A, with case-insensitive matching and duplicate removal. Paste, sort, copy.',
    'It runs instantly in your browser as you type — no uploads, no waiting, works offline.',
    'Looking for an ABC order sorter? Use this alphabetizer to put names, words, or any list in alphabetical order instantly.',
  ],
  sections: [
    {
      heading: 'Lines vs words',
      paragraphs: [
        'Two modes cover almost every case: "Lines" sorts each line of your input as a unit — perfect for name lists, CSV rows, and inventories. "Words" splits the input on whitespace and sorts the individual words — handy for keyword lists, tags, or word banks. If your data is comma-separated rather than line-separated, a quick find-and-replace of commas with newlines gets you there.',
      ],
    },
    {
      heading: 'Case and duplicates',
      paragraphs: [
        'Case-insensitive sorting treats "apple" and "Apple" as the same position, which is what humans expect in most lists; toggle it off for strict ASCII ordering (uppercase first). "Remove duplicates" keeps only the first occurrence of each value — essential when sorting keyword lists or contact exports where duplicates are common.',
      ],
    },
    {
      heading: 'Why alphabetizing matters',
      paragraphs: [
        'Ordered lists are dramatically easier to scan and compare: sorted inventory makes stock checks faster, sorted bibliographies are the academic standard (APA, MLA, Chicago all require it), and sorted keyword lists reveal duplicates and gaps that alphabetical chaos hides. It is a small touch with real workflow value.',
      ],
    },
  ],
  faqs: [
    { q: 'How do I sort a list alphabetically?', a: 'Paste your list (one item per line), choose Lines mode, and the output updates instantly. Copy the result with one click.' },
    { q: 'What is the difference between case-sensitive and insensitive sorting?', a: 'Case-insensitive ignores capitalization when comparing ("Apple" and "apple" tie); case-sensitive sorts uppercase before lowercase (ASCII order).' },
    { q: 'Can I sort words instead of lines?', a: 'Yes — switch to Words mode, which splits the input on spaces and sorts the individual words.' },
    { q: 'How do I remove duplicates?', a: 'Tick "Remove duplicates" — only the first occurrence of each value is kept.' },
    { q: 'Is my list sent anywhere?', a: 'No — sorting happens entirely in your browser. Your data never leaves your device.' },
  ],
  relatedSlugs: ['case-converter', 'word-counter', 'lorem-ipsum'],
};
