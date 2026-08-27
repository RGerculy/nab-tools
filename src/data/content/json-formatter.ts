import type { ToolContent } from './types';

export const jsonFormatterContent: ToolContent = {
  slug: 'json-formatter',
  intro: [
    'JSON (JavaScript Object Notation) is the lingua franca of APIs — the format nearly every web service uses to exchange data. But machine-generated JSON is often minified into a single unreadable line. This formatter turns that wall of text into structured, color-highlighted output you can actually read.',
    'It also validates your JSON as it goes: if something is malformed, you get the exact parse error. Everything runs locally — your data never leaves the browser.',
  ],
  sections: [
    {
      heading: 'Why JSON gets minified in the first place',
      paragraphs: [
        'APIs and databases do not care about whitespace, so producers strip it out: one line, no indentation, minimum bytes on the wire. A few hundred kilobytes of formatted JSON can shrink by 30–50% when minified, which matters for mobile connections and API rate limits.',
        'The downside is readability. A minified API response with nested objects is effectively unreadable by humans — which is where formatting (also called pretty-printing or beautifying) comes in.',
      ],
    },
    {
      heading: 'Common JSON mistakes and how to spot them',
      paragraphs: [],
      list: [
        'Trailing commas — {"a":1,} is invalid. JSON does not allow a comma after the last item.',
        'Single quotes — JSON requires double quotes for keys and strings. {\'a\': 1} fails.',
        'Comments — JSON has no comments. Stripping them is required before parsing (JSON5 and JSONC exist for this).',
        'Missing quotes on keys — {a: 1} is JavaScript, not JSON.',
        'Trailing garbage — multiple objects back-to-back without commas, or stray characters after the closing brace.',
      ],
    },
    {
      heading: 'JSON vs JavaScript objects',
      paragraphs: [
        'JSON looks like JavaScript, but it is stricter: keys must be double-quoted, no functions or undefined, no comments, no trailing commas. The two are close enough that people paste JavaScript object literals into formatters and wonder why they fail.',
        'If you are writing configuration by hand, consider JSON5 or YAML for the convenience; if you are working with APIs, JSON is the standard you will parse.',
      ],
    },
    {
      heading: 'Using this tool in your workflow',
      paragraphs: [
        'Paste an API response, click Format, and read the structure. When building an API client, minify your request bodies before sending to keep payloads small. When debugging, formatted output with line numbers makes it trivial to find the offending field.',
        'The highlighted output distinguishes keys, strings, numbers, booleans, and null at a glance — a genuine time-saver when you are staring at a 2,000-line config file.',
      ],
    },
  ],
  faqs: [
    { q: 'What is JSON formatting?', a: 'Pretty-printing: adding indentation, line breaks, and color highlighting to minified JSON so humans can read its structure. The data itself is unchanged.' },
    { q: 'What does "invalid JSON" mean?', a: 'The text does not conform to the JSON grammar — a missing comma, unquoted key, trailing comma, or stray character. The error message points to the location of the problem.' },
    { q: 'Does formatting change the data?', a: 'No. Formatting only changes whitespace. Formatting then minifying (or vice versa) returns the exact same data.' },
    { q: 'Can JSON contain comments?', a: 'Standard JSON cannot. Some variants (JSON5, JSONC) allow them, but they must be stripped before the data is parsed by a standard JSON parser.' },
    { q: 'Is my JSON uploaded anywhere?', a: 'No. Parsing and formatting happen entirely in your browser. Your data never leaves your device.' },
    { q: 'What is the difference between JSON and YAML?', a: 'YAML is a more human-friendly superset that supports comments and many data types, but parsing is more complex and error-prone. JSON is simpler, stricter, and universal.' },
  ],
  relatedSlugs: ['base64-tool', 'hash-generator', 'word-counter'],
};
