import type { ToolContent } from './types';

export const spinWheelContent: ToolContent = {
  slug: 'spin-wheel',
  intro: ['Turn a list of choices into a quick random picker. Add names, tasks, dinner ideas, classroom activities, or prizes one per line and spin the wheel.', 'The result is selected in your browser with a cryptographically seeded random value. Nothing is stored or uploaded.'],
  sections: [
    { heading: 'When a random picker helps', paragraphs: ['A wheel is useful when the options are known but choosing feels repetitive: who presents first, which task comes next, what to eat, or which player gets a bonus. Giving every line one slot makes the choice visible and easy to explain.'] },
    { heading: 'Fairness and repeated spins', paragraphs: ['Each loaded line receives one selection slot. If you repeat a spin after removing the winner, the remaining choices have equal slots; if you keep every choice, the same option can be selected again. Random does not mean every result appears once.'] },
    { heading: 'Good wheel lists', paragraphs: ['Use clear, separate lines and decide whether duplicate entries should count as extra weight. For a classroom or team, agree on the list before spinning so the tool stays a transparent tiebreaker.'], tip: 'If one outcome should be twice as likely, add it twice as a separate line.' },
  ],
  faqs: [
    { q: 'How many choices can I add?', a: 'You can add as many newline-separated choices as your browser can comfortably display; each non-empty line becomes one choice.' },
    { q: 'Is the wheel random?', a: 'Yes. The selected index is generated locally with the browser crypto API when available.' },
    { q: 'Can the same choice win twice?', a: 'Yes, if you leave it in the list. Remove a winner when you want a one-time draw without repeats.' },
    { q: 'Does the wheel save my choices?', a: 'No. The list exists only in the current page and is not sent to a server.' },
  ],
  relatedSlugs: ['random-number-generator'],
};
