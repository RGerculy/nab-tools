import type { ToolContent } from './types';

export const dateDifferenceContent: ToolContent = {
  slug: 'date-difference',
  intro: [
    'How many days until the deadline? How long since the launch? Date math looks simple until you hit month lengths, leap years, and timezones. This calculator gives the exact day count between any two dates, plus weeks, months, and years — and a date-arithmetic mode for adding or subtracting days.',
    'It runs entirely in your browser with pure calendar math, in DD/MM/YYYY format.',
  ],
  sections: [
    {
      heading: 'Counting days correctly',
      paragraphs: [
        'The exact difference between two dates is a calendar-day count: every date boundary crossed counts one day. This tool computes it from the calendar directly — so it handles 28/29/30/31-day months and leap years automatically, which is exactly where naive "30 days per month" math goes wrong.',
        'The weeks, months, and years figures are derived from the exact day count using standard averages (7, 30.44, and 365.25 days) — useful for planning, while the Days card is the number that matters for contracts and deadlines.',
      ],
    },
    {
      heading: 'Common uses',
      paragraphs: [],
      list: [
        'Deadlines — days until a project, invoice, or event.',
        'Age and tenure — days/months between a start date and now.',
        'Planning — weeks out from a target date.',
        'Countdowns — the exact gap to a holiday, launch, or anniversary.',
        'Date arithmetic — "what date is 90 days from today?" for trial periods, subscriptions, and warranties.',
      ],
    },
    {
      heading: 'Date arithmetic mode',
      paragraphs: [
        'The second mode answers the question "what date is N days from Date A?" — trial periods (14/30/90 days), notice periods, expiry dates. It uses the same calendar-correct math, so adding 90 days to mid-January lands correctly in April, not March 31st.',
      ],
    },
  ],
  faqs: [
    { q: 'How is the number of days between dates calculated?', a: 'As a calendar-day count — every date boundary between the two dates counts as one day, with month lengths and leap years handled correctly.' },
    { q: 'Is it inclusive or exclusive of the end date?', a: 'It counts full days elapsed from Date A to Date B. For "days until X" usage, treat the result as the number of midnights between the two dates.' },
    { q: 'What date format should I use?', a: 'DD/MM/YYYY — e.g. 17/08/2026. The tool validates the date and rejects impossible ones like 31/02/2026.' },
    { q: 'Does it handle leap years?', a: 'Yes — the calendar math accounts for February 29 in leap years, so dates around late February are exact.' },
    { q: 'What does a negative result mean?', a: 'Date A is after Date B — you are counting backwards. The tool shows the difference as negative and flags it.' },
  ],
  relatedSlugs: ['age-calculator', 'timestamp-converter', 'percentage-calculator'],
};
