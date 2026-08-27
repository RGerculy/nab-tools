import type { ToolContent } from './types';

export const loremIpsumContent: ToolContent = {
  slug: 'lorem-ipsum',
  intro: [
    'Lorem ipsum is the design world\u2019s stand-in for real text — placeholder copy that looks like prose without being readable, so layouts can be judged on form rather than content. This generator produces it by the paragraph, sentence, or word, ready to paste.',
    'It runs entirely in your browser — generate, copy, and get back to designing.',
  ],
  sections: [
    {
      heading: 'Why lorem ipsum exists',
      paragraphs: [
        'The text is a scrambled passage from Cicero\u2019s "De finibus bonorum et malorum," used by typesetters since the 1500s. Its genius: it has the distribution of real Latin prose — word lengths, sentence rhythms — so it fills space realistically, but it is meaningless, so nobody reads it and gets distracted from the layout.',
        'Modern alternatives exist (hipster ipsum, bacon ipsum), but classic lorem ipsum remains the standard because it is universally recognized as placeholder text.',
      ],
    },
    {
      heading: 'How much do you need?',
      paragraphs: [
        'A rough guide: a paragraph is 3–6 sentences (about 40–70 words); a sentence averages 10–15 words. For a typical landing-page section, 2–3 paragraphs suffice; for a full article mockup, 5–8. When in doubt, generate more than you need and delete — it is free.',
      ],
    },
    {
      heading: 'Using it responsibly',
      paragraphs: [
        'The cardinal rule: never ship lorem ipsum. It leaks into production embarrassingly often (search "lorem ipsum" on live websites and you will see). Before launch, run a find-and-replace for "lorem" across your codebase, and treat placeholder text as a flagged TODO, not a final state.',
      ],
    },
  ],
  faqs: [
    { q: 'What is lorem ipsum?', a: 'Scrambled Latin placeholder text derived from Cicero, used since the 1500s to fill layouts with realistic-looking prose without distracting readers.' },
    { q: 'How many words are in a paragraph?', a: 'This generator produces 3–6 sentences (roughly 40–70 words) per paragraph. You can also generate by sentence or word count directly.' },
    { q: 'Can I use lorem ipsum in my designs?', a: 'Yes — it is placeholder text, free to use in mockups and prototypes. Just remember to replace it with real copy before shipping.' },
    { q: 'Is lorem ipsum real Latin?', a: 'It is derived from real Latin (Cicero) but deliberately scrambled and meaningless — that is the point.' },
    { q: 'Why does my generated text sometimes repeat words?', a: 'Words are drawn randomly from a pool of ~60, so repetitions occur naturally — just like real text. Increase the count for more variety.' },
  ],
  relatedSlugs: ['word-counter', 'case-converter', 'json-formatter'],
};
