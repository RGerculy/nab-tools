import type { ToolContent } from './types';

export const unitConverterContent: ToolContent = {
  slug: 'unit-converter',
  intro: ['Convert everyday measurements for length, weight, volume, area, digital storage, and temperature. Pick a category, enter a value, and choose the source and destination units.', 'The formulas run locally and the result is shown with enough precision for ordinary calculations without overwhelming you with digits.'],
  sections: [
    { heading: 'Metric and customary units', paragraphs: ['Metric units scale by powers of ten: 1 metre is 100 centimetres and 1 kilogram is 1,000 grams. US customary units use relationships such as 12 inches to a foot and 16 ounces to a pound. The converter keeps those systems separate and applies exact published factors where possible.'] },
    { heading: 'Decimal and binary data units', paragraphs: ['Storage manufacturers commonly describe kilobytes and megabytes in decimal powers of 1,000. Operating systems and memory tools may use kibibytes and mebibytes, which are powers of 1,024. The labels matter: 1 MB is not exactly 1 MiB.'] },
    { heading: 'Temperature is different', paragraphs: ['Length and weight conversions multiply by a factor; temperature conversions also add or subtract an offset. That is why Celsius to Fahrenheit uses °F = °C × 9/5 + 32, while Kelvin is Celsius plus 273.15.'], tip: 'When precision matters, keep the full value through intermediate calculations and round only the displayed result.' },
  ],
  faqs: [
    { q: 'How many centimetres are in an inch?', a: 'One inch is exactly 2.54 centimetres.' },
    { q: 'What is the difference between MB and MiB?', a: 'MB uses decimal powers of 1,000; MiB uses binary powers of 1,024. One MiB is 1,048,576 bytes.' },
    { q: 'Can this convert Celsius to Fahrenheit?', a: 'Yes. Select Temperature, choose Celsius and Fahrenheit, then enter the value.' },
    { q: 'Does the unit converter send values to a server?', a: 'No. Calculations happen entirely in your browser.' },
  ],
  relatedSlugs: ['temperature-converter', 'percentage-calculator', 'base-converter'],
};
