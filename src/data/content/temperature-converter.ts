import type { ToolContent } from './types';

export const temperatureConverterContent: ToolContent = {
  slug: 'temperature-converter',
  intro: [
    'Celsius, Fahrenheit, Kelvin — three scales for the same heat, used in different corners of the world and the sciences. This converter translates between all three instantly: type a value in any unit and the others update live, with the exact formulas always in view.',
    'It runs entirely in your browser — no server, no waiting, works offline.',
  ],
  sections: [
    {
      heading: 'The three scales, briefly',
      paragraphs: [],
      list: [
        'Celsius (°C) — the everyday scale of most of the world: 0°C is the freezing point of water, 100°C the boiling point. The SI standard.',
        'Fahrenheit (°F) — used mainly in the United States (and a few territories). 32°F freezes water, 212°F boils it. 0°F was originally the coldest achievable brine temperature.',
        'Kelvin (K) — the absolute thermodynamic scale, starting at absolute zero (−273.15°C). No negative values; used in physics, engineering, and color temperature. Water freezes at 273.15 K.',
      ],
    },
    {
      heading: 'The formulas',
      paragraphs: [
        'The conversions are exact and simple:',
      ],
      list: [
        '°F = °C × 9/5 + 32',
        '°C = (°F − 32) × 5/9',
        'K = °C + 273.15',
        '°C = K − 273.15',
      ],
      tip: 'Quick mental anchors: 0°C = 32°F, 21°C ≈ 70°F (room temperature), 37°C = 98.6°F (body temperature), and 100°C = 212°F (boiling).',
    },
    {
      heading: 'Why Kelvin exists',
      paragraphs: [
        'Kelvin starts at absolute zero — the point where molecular motion stops entirely — so it is the natural scale for physics: no negative temperatures, and ratios actually mean something (300 K is twice the thermal energy of 150 K). In games and design, "color temperature" also uses Kelvin, but that is a different concept — it describes the color of white light (warmer orange ~3000K, cool blue ~6500K).',
      ],
    },
  ],
  faqs: [
    { q: 'How do I convert Celsius to Fahrenheit?', a: 'Multiply by 9/5 and add 32: °F = °C × 9/5 + 32. 21°C → 21 × 1.8 + 32 = 69.8°F.' },
    { q: 'What is the formula for Fahrenheit to Celsius?', a: 'Subtract 32 and multiply by 5/9: °C = (°F − 32) × 5/9. 98.6°F → (98.6 − 32) × 5/9 = 37°C.' },
    { q: 'What is absolute zero?', a: 'The coldest possible temperature: 0 K = −273.15°C = −459.67°F, where molecular motion stops.' },
    { q: 'Why does America use Fahrenheit?', a: 'Historical inertia — the scale was invented by Daniel Fahrenheit in 1724 and adopted early in the US. The rest of the world moved to Celsius (and SI) later.' },
    { q: 'Is there a temperature where Celsius and Fahrenheit are equal?', a: 'Yes — −40°. At −40 degrees, both scales read the same: −40°C = −40°F.' },
  ],
  relatedSlugs: ['percentage-calculator', 'date-difference', 'base-converter'],
};
