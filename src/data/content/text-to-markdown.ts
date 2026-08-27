import type { ToolContent } from './types';

export const textToMarkdownContent: ToolContent = {
  slug: 'text-to-markdown',
  intro: [
    'Got plain text — meeting notes, a draft, an email — and need clean Markdown? This converter applies smart heuristics: short lines ending in a colon become headings, bullet and numbered lists are detected from their prefixes, bare URLs become links, and everything else becomes paragraphs. Paste, convert, copy.',
  ],
  sections: [
    {
      heading: 'How the conversion works',
      paragraphs: [
        'Plain text carries no Markdown markers, so the converter makes educated guesses. A short line that ends with ":" (like "Agenda:") is almost always a heading in practice, so it becomes "## Agenda". Lines starting with "-", "*", or "•" become bullet lists; lines starting with "1." or "1)" become ordered lists.',
        'Lines that are just a URL — https://example.com — become link syntax. Everything else is grouped into paragraphs, which is the safest default for prose.',
      ],
    },
    {
      heading: 'When to use it (and when not to)',
      paragraphs: [
        'This shines for structure-heavy text: meeting notes, release notes, outlines, and documentation drafts that already have clear section labels and lists. It is less useful for dense prose with no structure, where the output will just be paragraphs.',
        'Treat the output as a starting point — skim it, fix any headings it missed, and add emphasis where it matters. It saves the tedious part (list syntax, links, heading markers) and leaves the judgment to you.',
      ],
      tip: 'If you regularly convert the same shape of notes, run a sample through first and check the heading detection — the ": " rule catches most section labels but not all.',
    },
  ],
  faqs: [
    { q: 'How does it know what is a heading?', a: 'Short lines ending with a colon (like "Decisions:") are treated as headings. It is a heuristic — most structured notes use that convention, and you can edit anything it misses.' },
    { q: 'Will it convert my bullet lists?', a: 'Yes — lines starting with "-", "*", or "•" become Markdown bullets, and lines starting with "1." or "1)" become ordered lists (renumbered as 1., 2., 3.).' },
    { q: 'Is the conversion lossless?', a: 'No — plain text has no structure markers, so everything is inferred. It is a fast, accurate-enough starting point, not a perfect round-trip. Review the output before publishing.' },
  ],
  relatedSlugs: ['markdown-to-html', 'word-counter', 'case-converter'],
};
