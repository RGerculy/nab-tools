import type { ToolContent } from './types';

export const wordCounterContent: ToolContent = {
  slug: 'word-counter',
  intro: [
    'Word and character counts are the invisible constraints of writing: essay limits, meta description length, tweet and SMS limits, ad character caps, and translation billing all hinge on them. This counter tracks words, characters (with and without spaces), sentences, paragraphs, lines, and estimated reading and speaking time — live, as you type.',
    'Everything is counted locally in your browser. Your text is never uploaded or stored anywhere.',
  ],
  sections: [
    {
      heading: 'Why the character count matters more than you think',
      paragraphs: [
        'Character limits are everywhere in digital marketing and publishing: Google meta descriptions truncate around 150–160 characters, ad platforms enforce strict caps (Google Ads headlines: 30, descriptions: 90), SMS is 160 characters per segment, and tweets now 280.',
        'Writing with the limit in view changes how you write. Draft in this tool, watch the count, and you will never again get a "description too long" error from an ad platform or a truncated meta tag in search results.',
      ],
    },
    {
      heading: 'Word count conventions',
      paragraphs: [
        'Different platforms count words differently. Microsoft Word counts "state-of-the-art" as one word; some tools count it as three. Hyphenated compounds, emojis, and URLs are the usual culprits for discrepancies between counters.',
        'This tool treats a word as a contiguous run of letters/numbers, including common internal punctuation like apostrophes and hyphens. URLs count as one word, which matches most modern counting conventions.',
      ],
    },
    {
      heading: 'Reading time and why 238 words per minute',
      paragraphs: [
        'The average adult reads prose at roughly 200–250 words per minute. This tool uses 238 wpm for reading time and 130 wpm for speaking time — the widely cited figures from readability research.',
        'Reading time estimates are a standard feature of long-form publishing (Medium, dev blogs) because they set expectations: a reader who knows an article takes 6 minutes is far more likely to start it. If you publish content, quoting the reading time from this tool on your articles is a genuine conversion win.',
      ],
    },
    {
      heading: 'Counting for SEO',
      paragraphs: [
        'For SEO content, word count correlates with ranking for competitive queries — not because Google counts words, but because longer content tends to answer more related questions, earn more backlinks, and keep readers engaged.',
        'A useful heuristic: 1,000–2,000 words for informational articles in competitive niches, with the length driven by the depth of the topic, never padding. Use the sentence and paragraph counts here to audit your draft\u2019s structure — short paragraphs and varied sentence length read better and rank better.',
      ],
    },
  ],
  faqs: [
    { q: 'How do you count words?', a: 'A word is a contiguous run of letters and numbers, including internal apostrophes and hyphens (so "state-of-the-art" counts as one word). URLs and numbers count as single words.' },
    { q: 'What counts as a sentence?', a: 'Any text ending in a period, exclamation mark, question mark, or ellipsis — plus a trailing run of text without sentence-ending punctuation.' },
    { q: 'Does character count include spaces?', a: 'We show both: total characters (including spaces) and characters excluding spaces. Some platforms count one, some the other — check which applies to your limit.' },
    { q: 'How is reading time calculated?', a: 'Words divided by 238 (average adult reading speed). Speaking time uses 130 wpm, the typical presentation pace.' },
    { q: 'Is my text sent anywhere?', a: 'No. Counting happens entirely in your browser. Your text never leaves your device — safe even for confidential drafts.' },
    { q: 'Why do different tools give different word counts?', a: 'Counters differ on hyphenated words, emojis, numbers, and URLs. The convention varies by platform (Word, Google Docs, Twitter each count differently).' },
  ],
  relatedSlugs: ['json-formatter', 'base64-tool', 'color-picker'],
};
