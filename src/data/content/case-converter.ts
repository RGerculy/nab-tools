import type { ToolContent } from './types';

export const caseConverterContent: ToolContent = {
  slug: 'case-converter',
  intro: [
    'Text case is a language of its own: UPPERCASE for shouting, Title Case for headlines, camelCase and snake_case for code. This converter switches between seven common cases instantly — upper, lower, title, sentence, camel, snake, and kebab — and updates live as you type.',
    'The conversion runs locally in your browser; your text never leaves your device.',
  ],
  sections: [
    {
      heading: 'The naming conventions of code',
      paragraphs: [
        'Each programming community has a preferred case, and getting it right keeps code consistent and linters happy:',
      ],
      list: [
        'camelCase — JavaScript, Java, and TypeScript variables and functions: totalAmount.',
        'PascalCase (Title Case with no spaces) — class names in most languages: TotalAmount.',
        'snake_case — Python, Rust, and Ruby variables; database columns: total_amount.',
        'kebab-case — URLs, filenames, CSS classes, and npm packages: total-amount.',
        'SCREAMING_SNAKE_CASE — constants in many languages: TOTAL_AMOUNT.',
      ],
      tip: 'When naming files for the web, kebab-case is the safest choice: it survives URL round-trips and case-insensitive filesystems without surprises.',
    },
    {
      heading: 'Title case and headline rules',
      paragraphs: [
        'Title Case capitalizes the first letter of every word — the style of book titles and most headlines. There are finer rules (some styles keep small words like "and" or "the" lowercase), but the simple "capitalize every word" version is the standard default for generators and is what this tool produces.',
        'Sentence case, by contrast, capitalizes only the first word — the style of newspapers and most web copy. Knowing the difference matters when a style guide is watching.',
      ],
    },
    {
      heading: 'When case actually matters',
      paragraphs: [
        'Case can change meaning: "polish" (nationality) vs "Polish" (action), or technical identifiers where userName and username are different things. File systems on Linux and Android are case-sensitive; Windows and macOS are not — which is exactly how bugs are born.',
        'For search engines, URLs are treated case-sensitively in practice. Keeping them lowercase (via kebab-case) prevents duplicate-content confusion.',
      ],
    },
  ],
  faqs: [
    { q: 'What are the different text cases?', a: 'UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case — each with a different capitalization convention for different uses (writing, code, URLs).' },
    { q: 'What is camelCase used for?', a: 'Variables and functions in JavaScript, Java, and TypeScript. It joins words without separators, capitalizing each word after the first.' },
    { q: 'What is the difference between snake_case and kebab-case?', a: 'Both separate words, but snake_case uses underscores (total_amount) while kebab-case uses hyphens (total-amount). Python prefers snake_case; URLs and CSS prefer kebab-case.' },
    { q: 'Is my text sent anywhere?', a: 'No — all conversion happens locally in your browser. Your text never leaves your device.' },
    { q: 'Does Title Case capitalize every word?', a: 'This tool capitalizes every word, the common default. Some style guides lowercase short words like "and" or "of" — that nuance is editorial, not mechanical.' },
  ],
  relatedSlugs: ['word-counter', 'json-formatter', 'base-converter'],
};
