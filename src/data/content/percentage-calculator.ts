import type { ToolContent } from './types';

export const percentageCalculatorContent: ToolContent = {
  slug: 'percentage-calculator',
  intro: [
    'Percentages are the most used bit of everyday math — sales discounts, tips, tax, interest rates, grade marks, and statistical headlines ("up 25%!") all live on them. This calculator handles the three situations that cover almost everything: X% of Y, X as a percentage of Y, and percentage change between two numbers.',
    'Everything runs locally in your browser — type your numbers, hit calculate, and the answer appears instantly. No data leaves your device.',
  ],
  sections: [
    {
      heading: 'The three calculations, explained',
      paragraphs: [
        'Most percentage questions are one of these three, and each is a single formula:',
      ],
      list: [
        'X% of Y — multiply: (X ÷ 100) × Y. Example: 15% of 200 = 30.',
        'X is what % of Y — divide: (X ÷ Y) × 100. Example: 30 is 15% of 200.',
        'Percentage change — (new − old) ÷ |old| × 100. A rise from 200 to 250 is a 25% increase.',
      ],
      tip: 'For quick mental math: 10% is just the number divided by 10, and 1% is the number divided by 100. 15% = 10% + 5% (half of 10%).',
    },
    {
      heading: 'Percentage change vs percentage points',
      paragraphs: [
        'A common confusion: if an interest rate rises from 5% to 7%, that is a 2 percentage point increase — but a 40% increase in the rate itself (2 ÷ 5). Both are true; they just answer different questions.',
        'This calculator gives you the relative change (the 40% figure). For the absolute difference, simply subtract the two numbers.',
      ],
    },
    {
      heading: 'Common mistakes to avoid',
      paragraphs: [],
      list: [
        'Dividing by zero — a percentage of nothing is undefined; the calculator guards against it.',
        'Sign confusion — a change from 200 to 150 is −25% (a decrease), not +25%.',
        'Assuming percentages are additive — a 10% discount followed by another 10% is not a 20% discount; it is 19% (0.9 × 0.9).',
      ],
    },
  ],
  faqs: [
    { q: 'How do I calculate X% of Y?', a: 'Multiply X by Y and divide by 100: (X × Y) ÷ 100. For example, 15% of 200 = (15 × 200) ÷ 100 = 30.' },
    { q: 'How do I find what percentage one number is of another?', a: 'Divide the first number by the second and multiply by 100. Example: 50 is (50 ÷ 200) × 100 = 25% of 200.' },
    { q: 'How do I calculate percentage increase or decrease?', a: 'Subtract the old value from the new, divide by the absolute old value, multiply by 100. A rise from 80 to 100 is (20 ÷ 80) × 100 = 25% increase.' },
    { q: 'What is the difference between percentage and percentage points?', a: 'Percentage points are the absolute difference between two percentages (5% to 7% is +2 points). Percentage change is relative (2 ÷ 5 = 40% increase).' },
    { q: 'Can I calculate reverse percentages?', a: 'Yes — if X is 15% of an unknown total, the total is X ÷ 0.15. This calculator does not have a dedicated mode, but the "X is what % of Y" mode covers most cases.' },
  ],
  relatedSlugs: ['tip-calculator', 'age-calculator', 'word-counter'],
};
