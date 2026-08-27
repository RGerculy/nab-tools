import type { ToolContent } from './types';

export const timestampConverterContent: ToolContent = {
  slug: 'timestamp-converter',
  intro: [
    'A Unix timestamp (also called epoch time) is the number of seconds since January 1, 1970 UTC — the way most databases, APIs, and logs store time. It is compact and timezone-free, but completely unreadable to humans. This converter turns timestamps into readable dates and back, in seconds or milliseconds, in your local timezone.',
    'The conversion happens locally in your browser — no data leaves your device.',
  ],
  sections: [
    {
      heading: 'Why timestamps exist',
      paragraphs: [
        'Storing time as a single number solves two problems: it is tiny (10 digits vs a 25-character ISO string) and it is unambiguous — a timestamp is an instant, not a wall-clock reading. Timezones and daylight saving are display concerns; the timestamp itself never changes.',
        'That is why virtually every programming language, database, and API uses epoch time under the hood, even when the surface shows a formatted date.',
      ],
    },
    {
      heading: 'Seconds vs milliseconds — the classic gotcha',
      paragraphs: [
        'Unix time is defined in seconds, but many systems store milliseconds (JavaScript Date, most NoSQL databases, some APIs). A millisecond timestamp is 1,000 times larger — roughly 1.7 trillion today versus 1.7 billion.',
        'This tool auto-detects: 10-digit numbers are treated as seconds, 13-digit as milliseconds. If you paste a timestamp and the date looks wrong by about 50 years, you probably have the wrong precision — and now you know why.',
      ],
    },
    {
      heading: 'The 2038 problem',
      paragraphs: [
        'A 32-bit signed integer maxes out at 2,147,483,647 seconds — which is January 19, 2038. Systems still storing timestamps in 32-bit integers will overflow on that date, the same way Y2K threatened two-digit years.',
        'Modern systems use 64-bit integers (fine until the year 292 billion) or store timestamps as strings. It is a legacy concern now, but you will still hear about it — and if you maintain old embedded systems, it is a real deadline.',
      ],
    },
    {
      heading: 'Timezone handling',
      paragraphs: [
        'A timestamp is UTC by definition — it represents the same instant everywhere. When you convert it, this tool displays it in your local timezone, matching what your operating system uses. The same timestamp converted on a device in Tokyo and one in London shows different local times but the same instant — which is the whole point.',
      ],
    },
  ],
  faqs: [
    { q: 'What is a Unix timestamp?', a: 'The number of seconds elapsed since January 1, 1970 00:00:00 UTC (the Unix epoch). It represents an exact instant, independent of timezone.' },
    { q: 'What is the difference between seconds and milliseconds timestamps?', a: 'Milliseconds are 1,000× larger. Seconds timestamps are ~10 digits (1.7 billion today); millisecond timestamps are ~13 digits (1.7 trillion). JavaScript and many databases use milliseconds.' },
    { q: 'How do I convert a timestamp to a date?', a: 'Paste it into this tool — it auto-detects seconds vs milliseconds and shows the local date and time instantly.' },
    { q: 'What happens on January 19, 2038?', a: '32-bit signed integer timestamps overflow, breaking systems that still use them. Modern 64-bit systems are unaffected for billions of years.' },
    { q: 'Are timestamps affected by timezones?', a: 'No — a timestamp is the same instant everywhere. Only its display as a local date/time changes with your timezone.' },
  ],
  relatedSlugs: ['base-converter', 'json-formatter', 'url-encoder'],
};
