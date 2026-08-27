import type { ToolContent } from './types';

export const timezoneConverterContent: ToolContent = {
  slug: 'timezone-converter',
  intro: [
    'Convert a date and time between cities without doing mental arithmetic. Choose the source and destination time zones and the browser applies the current daylight-saving rules automatically.',
    'The conversion runs locally with the time-zone data built into your browser. No calendar event or personal data is uploaded.',
  ],
  sections: [
    { heading: 'Why time zones are more than an offset', paragraphs: ['London is not always five hours ahead of New York, and the difference changes when either country switches daylight saving time. A named IANA zone such as Europe/London carries those historical and seasonal rules; a fixed offset such as UTC-5 does not.'] },
    { heading: 'How to convert a meeting time', paragraphs: ['Enter the date and time as it is known in the source city, select that city, then select the destination city. The result is the same instant displayed in the destination zone. Check the date as well as the clock: a late evening call can become the next morning elsewhere.'] },
    { heading: 'UTC, GMT, and daylight saving time', paragraphs: ['UTC is the stable reference used by computers and services. GMT is a time standard associated with the United Kingdom and is often used interchangeably in casual conversation, but London can be UTC+1 during British Summer Time. Named zones are safer for appointments.'], tip: 'For a global invitation, include the city or UTC offset in the final message so nobody has to guess which rule you used.' },
  ],
  faqs: [
    { q: 'Does the converter handle daylight saving time?', a: 'Yes. It uses named time zones and the browser time-zone database, so seasonal offsets are applied for the selected date.' },
    { q: 'Can a conversion change the date?', a: 'Yes. A time near midnight in one zone can be on the previous or next calendar day in another zone.' },
    { q: 'Is London always the same as UTC?', a: 'No. London uses UTC in winter and UTC+1 during British Summer Time. Selecting Europe/London applies the correct rule for the chosen date.' },
    { q: 'What is the best time zone format for software?', a: 'Use an IANA name such as America/New_York or Asia/Tokyo when you need daylight-saving and historical rules. Use UTC for timestamps that represent an instant.' },
  ],
  relatedSlugs: ['timestamp-converter', 'date-difference', 'countdown-timer'],
};
