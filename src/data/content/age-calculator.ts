import type { ToolContent } from './types';

export const ageCalculatorContent: ToolContent = {
  slug: 'age-calculator',
  intro: [
    'Whether you are filling out a form, planning a birthday, or settling a "who is older" argument, you need an exact age — not just the year. This calculator works out precise age in years, months, and days from any birth date, plus the total days lived and your countdown to the next birthday.',
    'The calculation runs entirely in your browser using your local date — nothing is sent anywhere, and the result is always accurate to the day.',
  ],
  sections: [
    {
      heading: 'How age is calculated',
      paragraphs: [
        'Exact age is a calendar calculation: years = the number of completed birthdays, months = completed month anniversaries since the last birthday, days = days since the last month anniversary. The calculator handles month lengths and leap years automatically.',
        'Note that this is the everyday "elapsed calendar time" method — the same one used for legal age in most jurisdictions. It is not the same as measuring total elapsed days and dividing by 365.25, which is how some tools (wrongly for birthdays) compute age.',
      ],
    },
    {
      heading: 'Total days lived and why it is fun',
      paragraphs: [
        'The total-days figure is a nice perspective check: a 30-year-old has lived roughly 11,000 days. It is also genuinely useful — some contracts, insurance policies, and scientific contexts count age in days.',
        'Because of leap years, a person born on February 29 only has a "real" birthday every four years. This calculator handles that edge case: their age in years still advances every March 1 in non-leap years, matching how legal systems treat it.',
      ],
    },
    {
      heading: 'Age in different cultures and contexts',
      paragraphs: [
        'Age counting varies around the world. Some East Asian traditions count a child as 1 at birth (Korean age), while the international standard — used here — counts from the birth date. Legal ages (driving, drinking, voting, retirement) are all computed on the international method, which is what this tool uses.',
      ],
    },
  ],
  faqs: [
    { q: 'How is exact age calculated?', a: 'By counting completed years from the birth date, then completed months since the last birthday, then days since the last month anniversary. Leap years and month lengths are handled automatically.' },
    { q: 'Is the age calculated in leap years accurate?', a: 'Yes — the calendar math accounts for leap years. Someone born on Feb 29, 2000 turned 25 on Mar 1, 2025, which this tool reflects.' },
    { q: 'Why does my age sometimes show differently on other sites?', a: 'Some tools compute age as total days ÷ 365.25, which drifts from calendar age. This tool uses the exact calendar method used for legal purposes.' },
  ],
  relatedSlugs: ['percentage-calculator', 'word-counter'],
};
