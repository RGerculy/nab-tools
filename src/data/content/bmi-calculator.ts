import type { ToolContent } from './types';

export const bmiCalculatorContent: ToolContent = {
  slug: 'bmi-calculator',
  intro: [
    'Body Mass Index (BMI) is the standard screening tool for weight categories — used by doctors, insurers, and fitness trackers worldwide. It is a single number from your height and weight, and this calculator gives it instantly along with your category and healthy weight range.',
    'It runs entirely in your browser with metric or imperial units, and — importantly — explains what BMI can and cannot tell you.',
  ],
  sections: [
    {
      heading: 'The categories',
      paragraphs: [
        'BMI = weight (kg) ÷ height² (m²). The World Health Organization categories:',
      ],
      list: [
        'Below 18.5 — underweight. May indicate undernutrition or health issues; worth discussing with a professional.',
        '18.5–24.9 — normal weight. The target range for most adults.',
        '25–29.9 — overweight. Associated with increased health risk as it rises.',
        '30+ — obese. Significantly increased risk of cardiovascular and metabolic conditions.',
      ],
    },
    {
      heading: 'What BMI gets wrong',
      paragraphs: [
        'BMI is a population-level screening tool, not a personal health verdict. It does not distinguish muscle from fat — a bodybuilder with 8% body fat can have a BMI over 30. It does not account for age, sex, bone density, or where fat is distributed (waist circumference is often a better risk indicator).',
        'For most people, BMI is a useful first signal. For athletes, older adults, and anyone with unusual body composition, it can mislead — which is why doctors use it alongside other measurements.',
      ],
    },
    {
      heading: 'The healthy weight range',
      paragraphs: [
        'The calculator also shows the weight range corresponding to a normal BMI (18.5–24.9) for your height. That range is the practical takeaway: it tells you, in kilograms or pounds, where a healthy weight would sit for your specific height — more actionable than the raw index.',
      ],
    },
  ],
  faqs: [
    { q: 'What is a healthy BMI?', a: '18.5 to 24.9 is the normal range for most adults. Below 18.5 is underweight; 25–29.9 is overweight; 30+ is obese.' },
    { q: 'Is BMI accurate for athletes?', a: 'No — BMI cannot distinguish muscle from fat, so muscular people often show as overweight or obese despite low body fat. Use body-fat measurements for athletes.' },
    { q: 'How is BMI calculated?', a: 'Weight in kilograms divided by height in meters squared. In imperial: 703 × weight(lb) ÷ height(in)².' },
    { q: 'Does BMI account for age or sex?', a: 'No — it is a single formula. Children use age- and sex-specific percentile charts instead; older adults may have different healthy ranges.' },
    { q: 'What should I do if my BMI is outside the normal range?', a: 'Use it as a conversation starter with a healthcare professional, who can interpret it alongside waist circumference, body composition, and medical history.' },
  ],
  relatedSlugs: ['percentage-calculator', 'date-difference', 'word-counter'],
};
