import type { ToolContent } from './types';

export const regexTesterContent: ToolContent = {
  slug: 'regex-tester',
  intro: [
    'Regular expressions are the most powerful — and most error-prone — text-matching tool in programming. This tester lets you write a pattern, paste sample text, and see every match highlighted live, with the exact match count and a clear error message when the pattern is invalid.',
    'Everything runs in your browser with standard JavaScript regex syntax, so what you test here behaves identically in your code.',
  ],
  sections: [
    {
      heading: 'The building blocks',
      paragraphs: [
        'Regex is a small language for describing text patterns. The essentials:',
      ],
      list: [
        'Literals — "cat" matches the characters c-a-t.',
        'Character classes — [0-9] any digit, [a-z] lowercase letter, \\d digit, \\w word character, \\s whitespace.',
        'Quantifiers — * zero or more, + one or more, ? optional, {2,4} between 2 and 4.',
        'Anchors — ^ start of string/line, $ end, \\b word boundary.',
        'Groups — (abc) capture group, (?:abc) non-capturing, | alternation (this|that).',
      ],
      tip: 'The classic email pattern \\b\\w+@\\w+\\.\\w+\\b is pre-filled — try it, then experiment.',
    },
    {
      heading: 'Flags explained',
      paragraphs: [
        'Flags change how the pattern behaves:',
      ],
      list: [
        'g (global) — find all matches instead of stopping at the first.',
        'i (ignore case) — match both cases.',
        'm (multiline) — ^ and $ match line boundaries, not just string boundaries.',
        's (dotall) — the dot matches newlines too.',
        'u (unicode) — proper Unicode handling for \\w, case folding, and code points.',
      ],
    },
    {
      heading: 'Testing discipline',
      paragraphs: [
        'The fastest way to write a correct regex: test against both your target cases and your edge cases (empty input, uppercase, unexpected punctuation). The live highlighting makes both visible at once — if your match highlights something you did not intend, you will see it immediately.',
        'A common trap: regex is greedy by default. "a.+z" matches as much as possible, so "abczdefz" matches the whole string, not the first "abcz". Add a ? ("a.+?z") for lazy matching, or be specific about what you want.',
      ],
    },
  ],
  faqs: [
    { q: 'What is a regular expression?', a: 'A pattern language for matching text — sequences, character classes, quantifiers, and anchors that describe what text should look like. Used everywhere from validation to search-and-replace.' },
    { q: 'Why is my regex not matching?', a: 'Check for: missing flags (g for all matches, i for case), greedy quantifiers matching more than expected, and unescaped special characters (use \\ to escape . * + ? [ ] etc.).' },
    { q: 'What do the flags g, i, m, s, u do?', a: 'g = all matches, i = case-insensitive, m = multiline anchors, s = dot matches newlines, u = unicode mode. Toggle them in the tester and watch results change live.' },
    { q: 'Is this the same syntax as in my code?', a: 'Yes — JavaScript regex syntax (the ECMAScript standard), the same one Node.js and browsers use. Patterns tested here work verbatim in JS code.' },
    { q: 'Can regex parse HTML or JSON?', a: 'No — those are nested structures, not regular languages. Use a real parser. Regex is for flat text patterns.' },
  ],
  relatedSlugs: ['json-formatter', 'case-converter', 'base64-tool'],
};
