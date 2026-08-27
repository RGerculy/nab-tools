import type { ToolContent } from './types';

export const cronGeneratorContent: ToolContent = {
  slug: 'cron-generator',
  intro: ['Build a five-field cron expression and read it back in plain English. Set minutes, hours, days, months, and weekdays, then copy the expression into a Unix cron job or scheduler.', 'Cron syntax is compact but easy to misread. The explanation and examples make the schedule visible before you deploy it.'],
  sections: [
    { heading: 'The five cron fields', paragraphs: ['Traditional Unix cron uses five fields in this order: minute, hour, day of month, month, and day of week. Each field accepts numbers, ranges, lists, and the asterisk wildcard, depending on the scheduler.'], list: ['0-59 — minute', '0-23 — hour', '1-31 — day of month', '1-12 — month', '0-7 — weekday; Sunday is commonly 0 or 7'] },
    { heading: 'Reading common expressions', paragraphs: ['The expression 0 9 * * 1-5 means at 09:00 on weekdays. The expression */15 * * * * means every 15 minutes. A list such as 0 9,17 * * * runs at 09:00 and 17:00 every day.'] },
    { heading: 'Cron is not identical everywhere', paragraphs: ['Linux cron, Quartz, cloud schedulers, and CI systems can add fields or use different weekday conventions. Confirm the target scheduler documentation before deploying an expression that matters.'], tip: 'Write the intended schedule in plain English beside the expression. That small note prevents many maintenance mistakes.' },
  ],
  faqs: [
    { q: 'What does * mean in cron?', a: 'An asterisk means every allowed value for that field. For example, * in the hour field means every hour.' },
    { q: 'What does */5 mean in cron?', a: 'It means every five units in that field, such as every five minutes when used in the minute field.' },
    { q: 'What is the order of cron fields?', a: 'Traditional five-field cron uses minute, hour, day of month, month, then day of week.' },
    { q: 'Does every scheduler use the same cron syntax?', a: 'No. Many use the five traditional fields, but some add seconds or special syntax. Check the scheduler you are targeting.' },
  ],
  relatedSlugs: ['timestamp-converter', 'timezone-converter', 'date-difference'],
};
