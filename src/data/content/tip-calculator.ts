import type { ToolContent } from './types';

export const tipCalculatorContent: ToolContent = {
  slug: 'tip-calculator',
  intro: [
    'Tipping is one of those social calculations you do under time pressure — with the waiter waiting and the card machine staring at you. This calculator turns it into a no-brainer: enter the bill, pick a percentage, split between the group, and get the exact per-person amount.',
    'It runs entirely in your browser, so your bill stays on your device. Quick-preset buttons plus a slider cover every tip style.',
  ],
  sections: [
    {
      heading: 'How much should you tip?',
      paragraphs: [
        'Tipping norms vary wildly by country and context:',
      ],
      list: [
        'United States — 15–20% at sit-down restaurants is standard; 20% for good service. Bars often 15–20% too.',
        'Canada — similar to the US, 15–20%.',
        'UK / Ireland — 10–12.5% is common where service charge is not already included; check the bill for an automatic service charge first.',
        'Continental Europe — service is usually included in the price; rounding up or leaving 5–10% for exceptional service is appreciated but not expected.',
        'Japan / Korea / much of Asia — tipping is generally not practiced and can even cause confusion.',
      ],
      tip: 'Always check whether a "service charge" is already on the bill — in many places it is, and tipping on top means double-tipping.',
    },
    {
      heading: 'Splitting the bill fairly',
      paragraphs: [
        'The cleanest split is per person on the total (tip included), which this calculator gives you directly. If some people ordered significantly more, splitting by what each person consumed is fairer — calculate each share separately.',
        'For groups, an easy rounding trick: round each person\u2019s share to the nearest whole unit and let the round-off cover a drink for the table.',
      ],
    },
    {
      heading: 'A quick mental-tip trick',
      paragraphs: [
        'To estimate a 15% tip fast: calculate 10% (move the decimal one place) and add half of that. For 20%: just double the 10% figure. $45 → 10% is $4.50 → 15% is $4.50 + $2.25 = $6.75. The calculator does it exactly; the trick is for when you are in a hurry.',
      ],
    },
  ],
  faqs: [
    { q: 'How much should I tip?', a: 'It depends on the country. In the US/Canada, 15–20% at sit-down restaurants. In most of Europe and the UK, 10–12.5% or nothing if a service charge is included. In many Asian countries, tipping is not expected.' },
    { q: 'What if there is already a service charge on the bill?', a: 'Do not tip on top — a service charge is the tip. Tipping again means paying it twice.' },
    { q: 'How do I split the tip between people?', a: 'Add the tip to the total, then divide by the number of people. This calculator does exactly that with the per-person figure.' },
    { q: 'Should I tip on the pre-tax or post-tax amount?', a: 'Most people tip on the post-tax total. Some tip on the pre-tax subtotal — the difference is small and either is fine.' },
  ],
  relatedSlugs: ['percentage-calculator', 'age-calculator'],
};
